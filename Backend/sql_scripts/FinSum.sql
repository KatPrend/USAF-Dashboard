SELECT 
    CASE 
        WHEN expen_actual >= expen_proj_red_plus 
            OR expen_actual <= expen_proj_red_minus 
            OR obli_actual >= obli_proj_red_plus 
            OR obli_actual <= obli_proj_red_minus 
        THEN 'red'
        WHEN expen_actual >= expen_proj_yellow_plus 
            OR expen_actual <= expen_proj_yellow_minus 
            OR obli_actual >= obli_proj_yellow_plus 
            OR obli_actual <= obli_proj_yellow_minus 
        THEN 'yellow'
	    WHEN expen_actual < expen_proj_yellow_plus 
            OR expen_actual > expen_proj_yellow_minus 
            AND obli_actual < obli_proj_yellow_plus 
            OR obli_actual > obli_proj_yellow_minus 
        THEN 'green'
	    ELSE NULL
    END
FROM 
(
    SELECT
		(	
			SELECT 
			    SUM(expen_actual) 
			FROM view_expenditure ve 
			JOIN contract_award ca on ve.project_id = ca.project_id 
			WHERE ve.project_id = 2
			AND ca.contract_status = 2 
			AND (SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0
		) 
			as expen_actual,
			
	    (
            (
                SELECT SUM(expen_projected) 
                FROM view_expenditure ve 
                JOIN contract_award ca on ve.project_id = ca.project_id
                WHERE ve.project_id = p2.id 
                AND ca.contract_status = 2 
                AND (SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0
            ) * 
            (
                1 + (
                        (SELECT expen_yellow_breakpoint FROM financial_summary_breakpoints)/100
                    )
            )
        ) as expen_proj_yellow_plus,
		
	((SELECT SUM(expen_projected) FROM view_expenditure ve JOIN contract_award ca on ve.project_id = ca.project_id
		WHERE ve.project_id = p2.id AND ca.contract_status = 2 AND 
		(SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0) * (
		1 - ((SELECT expen_yellow_breakpoint FROM financial_summary_breakpoints)/100))) as expen_proj_yellow_minus,
		
	((SELECT SUM(expen_projected) FROM view_expenditure ve JOIN contract_award ca on ve.project_id = ca.project_id
		WHERE ve.project_id = p2.id AND ca.contract_status = 2 AND 
		(SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0) * (
		1 + ((SELECT expen_red_breakpoint FROM financial_summary_breakpoints)/100))) as expen_proj_red_plus,
		
	((SELECT SUM(expen_projected) FROM view_expenditure ve JOIN contract_award ca on ve.project_id = ca.project_id 
		WHERE ve.project_id = p2.id AND ca.contract_status = 2 AND 
		(SELECT DATEDIFF((SELECT CURDATE()), ve.expen_funding_date)) >= 0) * (
	   1 - ((SELECT expen_red_breakpoint FROM financial_summary_breakpoints)/100))) as expen_proj_red_minus,
	   
	   
	   (SELECT SUM(obli_actual) FROM view_obligation vo JOIN contract_award ca on vo.project_id = ca.project_id
	   		WHERE vo.project_id = p2.id AND ca.contract_status = 2 AND 
	   		(SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0) as obli_actual,
	   		
	   
	((SELECT SUM(obli_projected) FROM view_obligation vo JOIN contract_award ca on vo.project_id = ca.project_id
		 WHERE vo.project_id = p2.id AND ca.contract_status = 2 AND 
		 (SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0) * (
		1 + ((SELECT obli_yellow_breakpoint FROM financial_summary_breakpoints)/100))) as obli_proj_yellow_plus,
		
	((SELECT SUM(obli_projected) FROM view_obligation vo JOIN contract_award ca on vo.project_id = ca.project_id
		 WHERE vo.project_id = p2.id AND ca.contract_status = 2 AND 
		 (SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0) * (
		1 - ((SELECT obli_yellow_breakpoint FROM financial_summary_breakpoints)/100))) as obli_proj_yellow_minus,
		
	((SELECT SUM(obli_projected) FROM view_obligation vo JOIN contract_award ca on vo.project_id = ca.project_id
		 WHERE vo.project_id = p2.id AND ca.contract_status = 2 AND 
		 (SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0) * (
		1 + ((SELECT obli_red_breakpoint FROM financial_summary_breakpoints)/100))) as obli_proj_red_plus,
		
	((SELECT SUM(obli_projected) FROM view_obligation vo JOIN contract_award ca on vo.project_id = ca.project_id
		WHERE vo.project_id = p2.id AND ca.contract_status = 2 AND 
		(SELECT DATEDIFF((SELECT CURDATE()), vo.obli_funding_date)) >= 0) * (
	   1 - ((SELECT obli_red_breakpoint FROM financial_summary_breakpoints)/100))) as obli_proj_red_minus
	   
	   
) AS T1



CREATE VIEW `view_expenditure` AS 
(
    select 
    `e`.`id` AS `id`,
    `e`.`project_id` AS `project_id`,
    `e`.`expen_funding_date` AS `expen_funding_date`,
    `e`.`expen_projected` AS `expen_projected`,
    (
        select 
            sum(`e2`.`expen_projected`) 
        from (
            `expenditure_funding_data` `e1` 
            join `expenditure_funding_data` `e2`
            ) where 
            (
                (`e1`.`expen_funding_date` >= `e2`.`expen_funding_date`) 
                and (`e1`.`project_id` = `e`.`project_id`) 
                and (`e2`.`project_id` = `e`.`project_id`) 
                and (`e1`.`id` = `e`.`id`)
            )
    ) AS `expen_projected_total`,
    `e`.`expen_actual` AS `expen_actual`,
    (
        select sum(`e2`.`expen_actual`) 
    
        from (
            `expenditure_funding_data` `e1` 
        join `expenditure_funding_data` `e2`) 
        where (
            (`e1`.`expen_funding_date` >= `e2`.`expen_funding_date`) and 
            (`e1`.`project_id` = `e`.`project_id`) and 
            (`e2`.`project_id` = `e`.`project_id`) and 
            (`e1`.`id` = `e`.`id`))
    ) AS `expen_actual_total` 
            
    from `expenditure_funding_data` `e`
);




