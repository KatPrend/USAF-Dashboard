CREATE TABLE IF NOT EXISTS Admin(
    admin_id int NOT NULL,
    admin_user_name varchar(40),
    email varchar(60) NOT NULL,
    password varchar(12) NOT NULL,
    PRIMARY KEY(admin_id)
);

CREATE TABLE IF NOT EXISTS Contractor_User(
    con_user_id int NOT NULL,
    con_user_name varchar(40) NOT NULL,
    email varchar(60) NOT NULL,
    password varchar(12),
    PRIMARY KEY(con_user_id)
);

CREATE TABLE IF NOT EXISTS Contractor(
    con_id int  PRIMARY KEY, 
    con_user_id int NOT NULL, 
    con_name varchar(80) NOT NULL,
    FOREIGN KEY(con_user_id) REFERENCES Contractor_User(con_user_id)
);

CREATE TABLE IF NOT EXISTS Mil_Personel(
    mil_id int PRIMARY KEY,
    mil_user_name varchar(40) NOT NULL,
    job_title varchar(50) NOT NULL,
    email varchar(60) NOT NULL,
    password varchar(12) NOT NULL
);

CREATE TABLE IF NOT EXISTS MIPR(
    MIPR_id int PRIMARY KEY,
    mil_id int NOT NULL, 
    MIPR_name varchar(80),
    FOREIGN KEY(mil_id) REFERENCES Mil_Personel(mil_id)
);

CREATE TABLE IF NOT EXISTS Project(
    project_id int PRIMARY KEY,
    con_id int,
    mil_id int NOT NULL,
    MIPR_id int, 
    project_name varchar(80) NOT NULL,
    contract_num int NOT NULL,
    contract_status varchar(20) NOT NULL,
    branch varchar(60) NOT NULL,
    requirement_type int NOT NULL,
    summary TEXT,
    ipt_member varchar(60) NOT NULL,
    CLIN_num int,
    FOREIGN KEY(con_id) REFERENCES Contractor(con_id),
    FOREIGN KEY(mil_id) REFERENCES Mil_Personel(mil_id),
    FOREIGN KEY(MIPR_id) REFERENCES MIPR(MIPR_id)
);

CREATE TABLE IF NOT EXISTS Messages(
    mess_id int PRIMARY KEY,
    project_id int NOT NULL,
    mil_id int,
    con_user_id int, 
    user_message text NOT NULL,
    date_posted DATE NOT NULL, 
    time_posted TIME(0) NOT NULL,
    FOREIGN KEY(project_id) REFERENCES Project(project_id),
    FOREIGN KEY(mil_id) REFERENCES Project(mil_id),
    FOREIGN KEY(con_user_id) REFERENCES Contractor(con_user_id)
);

-- Need looking at since 2 FK's Need to find a way to make it the main key
-- FOREIGN KEY(contract_num) REFERENCES Project(contract_num),
-- FOREIGN KEY(contract_status) REFERENCES Project(contract_status)
CREATE TABLE IF NOT EXISTS Contract_Award(
    contract_num int NOT NULL,
    contract_status varchar(20) NOT NULL,
    requirement_plan DATE NOT NULL,
    draft_rfp_released DATE NOT NULL,
    approved_by_acb DATE NOT NULL,
    rfp_released DATE NOT NULL, 
    proposal_received DATE NOT NULL,
    tech_eval_comp DATE NOT NULL,
    nego_comp DATE NOT NULL, 
    awarded DATE NOT NULL   
);

CREATE TABLE IF NOT EXISTS Funding(
    funding_doc_num int PRIMARY KEY, 
    project_id int NOT NULL,
    indepen_cost_est DECIMAL(14,2) NOT NULL,
    projected_contract_value DECIMAL(14,2) NOT NULL,
    approved_funding DECIMAL(14,2),
    approved_funding_type varchar(20),
    approved_funding_fiscal_year varchar(20),
    projected_oblig_plan_type varchar(20),
    projected_oblig_plan_year varchar(20),
    FOREIGN KEY(project_id) REFERENCES Project(project_id)
);

CREATE TABLE IF NOT EXISTS CLIN(
    CLIN_num int PRIMARY KEY, 
    CLIN_type varchar(20) NOT NULL, 
    CLIN_scope varchar(50) NOT NULL, 
    projected_CLIN_value DECIMAL(14,2) NOT NULL
);