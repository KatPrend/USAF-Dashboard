CREATE TABLE if not exists project(
    project_id int AUTO_INCREMENT,
	project_name varchar(80),
	project_type ENUM('Contract', 'MIPR') NOT NULL,
	contract_status ENUM('Pre-Award', 'Awarded', 'Closed') NOT NULL,
	branch varchar(80) NOT NULL,
	contract_num varchar(80),
	requirement_type varchar(80) NOT NULL,
	summary text NOT NULL,
	ccar_num varchar(60) NOT NULL, 
    PRIMARY KEY(project_id)

    -- Want this to be in this table or contract_award table
    -- FOREIGN KEY(contract_num) REFERENCES contract_award(contract_num),
    -- FOREIGN KEY(contract_status) REFERENCES contract_award(contract_status)
);

CREATE TABLE if not exists users(
    user_id int NOT NULL AUTO_INCREMENT,
    project_id int NOT NULL,
    contractor_company varchar(80),
    mil_id int UNIQUE,
    mil_job_title varchar(80),
    PRIMARY KEY(user_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists user_project_list(
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

-- CREATE TABLE if not exists clin_pro_pricer();

CREATE TABLE if not exists task_resource_table(
    task_resource_id int AUTO_INCREMENT,
	project_id int,
    clin_id int,
	task_description varchar(80) NOT NULL,
	month varchar(20) NOT NULL, -- can use DATA type [YYYY-MM-DD]
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
    task_resource_link_id int,
    successor varchar(20),
    task_resource_id int,
    FOREIGN KEY(task_resource_id) REFERENCES task_resource_table(task_resource_id)
);

CREATE TABLE if not exists project_information(
    project_information_id int AUTO_INCREMENT,
    project_id int, 
    wbs varchar(20),
    task_name varchar(80) NOT NULL,
    duration varchar(20),
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    successors varchar(20),
    resource_names varchar(80),
    PRIMARY KEY(project_information_id),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists messages(
    mess_id int NOT NULL,
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

    -- Want this here or in project table
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists mipr_contracts(
    mipr_contract_num int,
    project_id int,
    mipr_contract_status ENUM('Pre-Award', 'Awarded', 'Closed') NOT NULL,
    PRIMARY KEY(mipr_contract_num),
    FOREIGN KEY(project_id) REFERENCES project(project_id)
);

CREATE TABLE if not exists project_schedule(
    event_id int AUTO_INCREMENT,
    event_name varchar(80),
    event_startDate DATE,
    event_endDate DATE,
    successor varchar(80),
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
