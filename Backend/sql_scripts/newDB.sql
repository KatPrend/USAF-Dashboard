CREATE TABLE if not exists project(
    project_id int AUTO_INCREMENT,
	project_name varchar(80),
	project_type ENUM('Contract', 'MIPR') NOT NULL,
	contract_status ENUM('Pre-Award', 'Awarded', 'Closed') NOT NULL,
	branch varchar(80) NOT NULL,
	contract_num varchar(80),
	requirement_type ENUM('CDD', 'CPD', '1067', 'UON/JUONs') NOT NULL,
	summary text NOT NULL,
	ccar_num varchar(60) NOT NULL, 
    PRIMARY KEY(project_id)
);

CREATE TABLE if not exists users(
    user_id int NOT NULL AUTO_INCREMENT,
    contractor_company varchar(80),
    userName varchar(80),
    userRole ENUM('Contractor','IPT Memeber','Admin') NOT NULL,
    userEmail varchar(80),
    mil_job_title ENUM('Project Manager','Primary Engineer','Primary Logistics','GFE/GFP POC','Contracting','Financial Analyst','Cost Analyst','Reviewing Supervisor/PM','Secondary Engineer','Det 3','Configuration/Data Management','IPMR/IMS','Test','Cybersecurity'),
    PRIMARY KEY(user_id)
);

CREATE TABLE if not exists user_project_link(
    user_id int,
    project_id int,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists clin_data(
    clin_id int AUTO_INCREMENT,
    clin_num int,
    project_id int,
    clin_type ENUM('FFP', 'FFIF', 'FF-EPA', 'CPFF', 'CPIF', 'CPAF', 'T&M') NOT NULL,
    clin_scope varchar(80),
    PRIMARY KEY(clin_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists task_resource_table(
    task_resource_id int AUTO_INCREMENT,
	project_id int,
    clin_id int,
	task_description varchar(80) NOT NULL,
	month varchar(20) NOT NULL, -- can use DATA type DATE [YYYY-MM-DD]
	wbs varchar(20) NOT NULL,
	clin_num int NOT NULL,
	source_type varchar(40) NOT NULL,
	resource_code varchar(20) NOT NULL,
	resource_description varchar(40) NOT NULL,
	resource_type varchar(10) NOT NULL,
	rate DECIMAL(13,2) ,
	hours_worked int,
	units DECIMAL(13,2),
	cost DECIMAL(13,2),
	base_cost DECIMAL(13,2),
	direct_cost DECIMAL(13,2),
	total_price DECIMAL(13,2),
    PRIMARY KEY(task_resource_id),
    FOREIGN KEY(clin_id) REFERENCES clin_data(clin_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id) 
);

-- Confused on this table
CREATE TABLE if not exists task_depend_link(
    task_resource_id_parent int, 
    successor varchar(20),
    task_resource_id_child int
);

CREATE TABLE if not exists project_information(
    project_information_id int AUTO_INCREMENT,
    project_id int, 
    wbs varchar(20),
    task_name varchar(80) NOT NULL,
    duration varchar(20),
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    resource_names varchar(80),
    PRIMARY KEY(project_information_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists messages(
    mess_id int AUTO_INCREMENT,
    project_id int NOT NULL,
    user_id int,
    user_message text NOT NULL,
    date_posted DATE NOT NULL, 
    time_posted TIME(0) NOT NULL,
    PRIMARY KEY(mess_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE if not exists contract_award(
    contract_award_id int AUTO_INCREMENT,
    project_id int, 
    contract_num varchar(80) NOT NULL,
    contract_status ENUM('Pre-Award', 'Awarded', 'Closed') NOT NULL,
    requirement_plan DATE NOT NULL,
    draft_rfp_released DATE NOT NULL,
    approved_by_acb DATE NOT NULL,
    rfp_released DATE NOT NULL, 
    proposal_received DATE NOT NULL,
    tech_eval_comp DATE NOT NULL,
    nego_comp DATE NOT NULL, 
    awarded DATE NOT NULL,
    PRIMARY KEY(contract_award_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists mipr_contracts(
    mipr_contract_id int AUTO_INCREMENT,
    mipr_contract_num int,
    project_id int,
    mipr_contract_status ENUM('Pre-Award', 'Awarded', 'Closed') NOT NULL,
    PRIMARY KEY(mipr_contract_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists project_schedule(
    event_id int AUTO_INCREMENT,
    event_name varchar(80),
    event_startDate DATE,
    event_endDate DATE,
    PRIMARY KEY(event_id)
);

CREATE TABLE if not exists project_funding_data(
    proj_funding_id int AUTO_INCREMENT,
	project_id int,
	proj_funding_type varchar(60) NOT NULL,
	proj_current_date DATE NOT NULL,
	curr_obli_planned DECIMAL(13,2),
	curr_obli_actual DECIMAL(13,2),
	curr_exp_planned DECIMAL(13,2),
	curr_exp_actual DECIMAL(13,2),
	project_funding_startDate DATE NOT NULL,
	project_funding_endDate DATE NOT NULL,
    PRIMARY KEY(proj_funding_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists obligation_funding_data(
    obli_funding_data_id int AUTO_INCREMENT,
    project_id int, 
    obli_funding_date DATE NOT NULL,
    obli_fiscal_year varchar(20) NOT NULL,
    obli_projected DECIMAL(13,2) NOT NULL,
    obli_proj_total DECIMAL(13,2) NOT NULL,
    obli_actual DECIMAL(13,2) NOT NULL,
    obli_actual_total DECIMAL(13,2) NOT NULL,
    PRIMARY KEY(obli_funding_data_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists expenditure_funding_data(
    expen_funding_data_id int AUTO_INCREMENT,
    project_id int, 
    expen_funding_date DATE NOT NULL,
    expen_fiscal_year varchar(20) NOT NULL,
    expen_projected DECIMAL(13,2) NOT NULL,
    expen_proj_total DECIMAL(13,2) NOT NULL,
    expen_actual DECIMAL(13,2) NOT NULL,
    expen_actual_total DECIMAL(13,2) NOT NULL,
    PRIMARY KEY(expen_funding_data_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

-- Insert Functions 

INSERT INTO project(project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num)
VALUES("test project", 1, 1, "Modernization", "FA8620-18-C-2001", "CDD", "This is a test project that should have the project_type of Contract and contract_status of Pre-Awarded", "C12312-2");

INSERT INTO project(project_name, project_type, contract_status, branch, contract_num, requirement_type, summary, ccar_num)
VALUES("test project", 2, 2, "Modernization", "FA8620-18-C-2001", "1067", "This is a test project that should have the project_type of MIPR and contract_status of Awarded", "C23476-9");

INSERT INTO users(contractor_company, userName, userRole, userEmail, mil_job_title)
VALUES(NULL, "Jamieson", 3, "ja12321@us.af.mil", NULL);

INSERT INTO users(contractor_company, userName, userRole, userEmail, mil_job_title)
VALUES(NULL, "Daniel Couch", 2, "dcouch1997@gmail.com", "Project Manager");

-- Linking User 1 to 2 projects
INSERT INTO user_project_link(user_id, project_id)
VALUES(1, 1);

INSERT INTO user_project_link(user_id, project_id)
VALUES(1, 2);

--  Clin Data
INSERT INTO clin_data(clin_num, project_id, clin_type, clin_scope)
VALUES(1001, 1, 2, "this is a test Clin");

INSERT INTO task_resource_table(project_id, clin_id, task_description, month, wbs, clin_num, source_type, resource_code, resource_description, resource_type, rate, hours_worked, units, cost, base_cost, direct_cost, total_price)
VALUES(1, 1, "PDR Support", "Oct-21", "1.6.1.1.1", 1001, "Direct", "PE-03", "Senior Project Engineer", "Labor", 77.19, 165, NULL, 12736.35, 12736.35, 12736.35, 12736.35);

INSERT INTO project_information(project_id, wbs, task_name, duration, startDate, finishDate, resource_names)
VALUES(1, NULL, "Sustain-a-Box", "186 days", '2023-06-01', '2023-06-11', NULL);

INSERT INTO messages(project_id, user_id, user_message, date_posted, time_posted)
VALUES(1, 1, "this is a test message", '2022-06-02', '15:00:00');

INSERT INTO contract_award(project_id, contract_num, contract_status, requirement_plan, draft_rfp_released, approved_by_acb, rfp_released, proposal_received, tech_eval_comp, nego_comp, awarded)
VALUES(1, "FA8620-18-C-2001", 1, '2022-06-01', '2022-07-01', '2022-08-01', '2022-09-01', '2022-10-01', '2022-11-01', '2022-12-01', '2023-01-01');

INSERT INTO mipr_contracts(mipr_contract_num, project_id, mipr_contract_status)
VALUES(234234, 2, 1);

INSERT INTO project_schedule(event_name, event_startDate, event_endDate)
VALUES("test event", '2022-06-01', '2023-01-01');

INSERT INTO project_funding_data(project_id, proj_funding_type, proj_current_date, curr_obli_planned, curr_obli_actual, curr_exp_planned, curr_exp_actual, project_funding_startDate, project_funding_endDate)
VALUES(1, "3600", '2022-06-01', 1500000.00, 1500000.00, 144672.10, 135421.22, '2022-07-01', '2023-01-01');