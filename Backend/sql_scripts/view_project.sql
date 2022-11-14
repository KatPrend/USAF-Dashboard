CREATE VIEW `view_project`
AS SELECT
   `p`.`id` AS `id`,
   `p`.`project_name` AS `project_name`,
   `p`.`project_type` AS `project_type`,
   `c`.`id` AS `contractor_id`,
   `c`.`contractor_name` AS `contractor_name`,
   `ca`.`id` AS `contract_award_id`,
   `ca`.`contract_num` AS `contract_num`,
   `ca`.`contract_status` AS `contract_status`,
   (
        select sum(`task_resource_table`.`total_price`)
        FROM `task_resource_table` 
        where (`task_resource_table`.`project_id` = `p`.`id`)
    ) AS `contract_value`,
    (
        select sum(`clin_data`.`ind_gov_est`) 
        from `clin_data`
        where (`clin_data`.`project_id` = `p`.`id`)
    ) AS `ind_gov_est`,
    
    `b`.`id` AS `branch_id`,
    `b`.`branch_name` AS `branch`,
    `rt`.`id` AS `requirement_type_id`,
    `rt`.`requirement_type` AS `requirement_type`,
    `p`.`summary` AS `summary`,
    `p`.`ccar_num` AS `ccar_num`,
    (
        select 
        (
            case 
                when 
                    (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) < `fsb`.`dependency_days_red`) 
                then 'REALLY-BEHIND' 
                when 
                    (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) between `fsb`.`dependency_days_red` 
                    and `fsb`.`dependency_days_green`) 
                then 'BEHIND' 
                when 
                    (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) > `fsb`.`dependency_days_green`) 
                then 'ONTRACK' 
                else NULL end
        ) AS `depend_summary` 
    from 
    (((((`project_milestone_dependency` `pmd` 
        join `project` `p1` on((`p1`.`id` = `pmd`.`predecessor_project`))) 
        join `project_milestones` `pm1` on((`pm1`.`id` = `pmd`.`predecessor_milestone`))) 
        join `project` `p2` on((`p2`.`id` = `pmd`.`successor_project`))) 
        join `project_milestones` `pm2` on((`pm2`.`id` = `pmd`.`successor_milestone`))) 
        join `financial_summary_breakpoints` `fsb`) 
        where ((`pmd`.`predecessor_project` = `p`.`id`) and (`pmd`.`predecessor_project` <> `pmd`.`successor_project`)) 
        group by `fsb`.`dependency_days_green`,`fsb`.`dependency_days_red`
    ) AS `dependency_status`,
        
        (SELECT 
expen_status,
obli_status,
CASE
 WHEN expen_status = 'red' OR obli_status = 'red' THEN 'red'
 WHEN expen_status = 'yellow' OR obli_status = 'yellow' THEN 'yellow'
 WHEN expen_status = 'green' OR obli_status = 'green' THEN 'green'
 ELSE null
 END AS financial_status

FROM project p1
LEFT JOIN
(
SELECT ve.project_id, ve.status as expen_status
FROM view_expenditure ve
INNER JOIN (
    SELECT project_id, MAX(expen_funding_date) expen_funding_date
    FROM view_expenditure
    WHERE expen_funding_date <= CURDATE()
    GROUP BY project_id
) ve2 ON ve.project_id = ve2.project_id 

AND ve.expen_funding_date = ve2.expen_funding_date
) T1 ON T1.project_id = p1.id

LEFT JOIN
(

SELECT vo.project_id, vo.status AS obli_status
FROM view_obligation vo
INNER JOIN (
    SELECT project_id, MAX(obli_funding_date) obli_funding_date
    FROM view_obligation
    WHERE obli_funding_date <= CURDATE()
    GROUP BY project_id
) vo2 ON vo.project_id = vo2.project_id 
AND vo.obli_funding_date = vo2.obli_funding_date

) AS T2 ON T2.project_id = p1.id


WHERE p1.id = p.id) AS `financial_status`,
        
        
        (
            select (
                case 
                when (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) < `fsb`.`schedule_days_red`) 
                then 'REALLY-BEHIND' 
                when (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) between `fsb`.`schedule_days_red` 
                    and `fsb`.`schedule_days_green`) 
                then 'BEHIND' 
                when (min((to_days(ifnull(`pm2`.`actual_start`,`pm2`.`start_date`)) - to_days(ifnull(`pm1`.`actual_end`,`pm1`.`end_date`)))) > `fsb`.`schedule_days_green`) 
                then 'ONTRACK' else NULL end
                ) AS `depend_summary` 
                from (((((`project_milestone_dependency` `pmd` 
                    join `project` `p1` on((`p1`.`id` = `pmd`.`predecessor_project`))) 
                    join `project_milestones` `pm1` on((`pm1`.`id` = `pmd`.`predecessor_milestone`))) 
                    join `project` `p2` on((`p2`.`id` = `pmd`.`successor_project`))) 
                    join `project_milestones` `pm2` on((`pm2`.`id` = `pmd`.`successor_milestone`))) 
                    join `financial_summary_breakpoints` `fsb`) 
                where ((`pmd`.`predecessor_project` = `p`.`id`) 
                and (`pmd`.`predecessor_project` = `pmd`.`successor_project`)) 
                group by `fsb`.`schedule_days_red`,`fsb`.`schedule_days_green`) AS `schedule_status` 
                from ((((`project` `p` left join `contractor` `c` on((`c`.`id` = `p`.`contractor_id`))) 
                left join `branches` `b` on((`b`.`id` = `p`.`branch_id`))) left join `requirement_types` `rt` on((`rt`.`id` = `p`.`requirement_type_id`))) 
                left join `contract_award` `ca` on((`ca`.`project_id` = `p`.`id`))) 



order by `p`.`id`;