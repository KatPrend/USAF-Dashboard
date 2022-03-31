CREATE TABLE Admin{
    admin_id int NOT NULL,
    admin_user_name varchar(40),
    email varchar(60) NOT NULL,
    password varchar(12) NOT NULL,
    PRIMARY KEY(admin_id)
};

CREATE TABLE Contractor_User{
    con_user_id int NOT NULL,
    con_user_name varchar(40) NOT NULL,
    email varchar(60) NOT NULL,
    password varchar(12),
    PRIMARY KEY(con_user_id)
};

CREATE TABLE Contractor{
    con_id int NOT NULL, 
    con_user_id int NOT NULL, 
    con_name varchar(80) NOT NULL,
    PRIMARY KEY(con_id),
    FOREIGN KEY(con_user_id) REFERENCES Contractor_User(con_user_id)
};

CREATE TABLE Mil_Personel{
    mil_id int PRIMARY KEY,
    mil_user_name varchar(40) NOT NULL,
    job_title varchar(50) NOT NULL,
    email varchar(60) NOT NULL,
    password varchar(12) NOT NULL,
    PRIMARY KEY(mil_id)
};

CREATE TABLE MIPR{
    MIPR_id int NOT NULL,
    mil_id int NOT NULL, 
    MIPR_name varchar(80),
    PRIMARY KEY(MIPR_id),
    FOREIGN KEY(mil_id) REFERENCES Mil_Personel(mil_id)
};

CREATE TABLE Project{
    project_id int NOT NULL UNIQUE,
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
    PRIMARY KEY(project_id),
    FOREIGN KEY(con_id) REFERENCES Contractor(con_id),
    FOREIGN KEY(mil_id) REFERENCES Mil_Personel(mil_id),
    FOREIGN KEY(MIPR_id) REFERENCES MIPR(MIPR_id)
};

CREATE TABLE Messages{
    mess_id int NOT NULL,
    project_id int NOT NULL,
    mil_id int,
    con_user_id int, 
    user_message text NOT NULL,
    date_posted DATE NOT NULL, 
    time_posted TIME(0) NOT NULL,
    PRIMARY KEY(mess_id),
    FOREIGN KEY(project_id) REFERENCES Project(project_id),
    FOREIGN KEY(mil_id) REFERENCES Project(mil_id),
    FOREIGN KEY(con_user_id) REFERENCES Contractor(con_user_id)
};

-- Need looking at since 2 FK's Need to find a way to make it the main key
CREATE TABLE Contract_Award{
    contract_num int NOT NULL,
    contract_status varchar(20) NOT NULL,
    requirement_plan DATE NOT NULL,
    draft_rfp_released DATE NOT NULL,
    approved_by_acb DATE NOT NULL,
    rfp_released DATE NOT NULL, 
    proposal_received DATE NOT NULL,
    tech_eval_comp DATE NOT NULL,
    nego_comp DATE NOT NULL, 
    awarded DATE NOT NULL,
    FOREIGN KEY(contract_num) REFERENCES Project(contract_num),
    FOREIGN KEY(contract_status) REFERENCES Project(contract_status)
};

CREATE TABLE Funding{
    funding_doc_num int NOT NULL, 
    project_id int NOT NULL,
    indepen_cost_est money NOT NULL,
    projected_contract_value money NOT NULL,
    approved_funding money,
    approved_funding_type varchar(20),
    approved_funding_fiscal_year varchar(20),
    projected_oblig_plan_type varchar(20),
    projected_oblig_plan_year varchar(20),
    PRIMARY KEY(funding_doc_num),
    FOREIGN KEY(project_id) REFERENCES Project(project_id)
};

CREATE TABLE CLIN{
    CLIN_num int NOT NULL, 
    CLIN_type varchar(20) NOT NULL, 
    CLIN_scope varchar(50) NOT NULL, 
    projected_CLIN_value money NOT NULL,
    PRIMARY KEY(CLIN_num)
};

-- Fake Data
INSERT INTO Admin(admin_id, admin_user_name, email, password) 
VALUES(01, "admin", "admin@email.com", 'password');

INSERT INTO Contractor_User(con_user_id, con_user_name, email, password)
VALUES(01, "test_con_user", "testcon@email.com", 'password123');

INSERT INTO Contractor(con_id, con_user_id, con_name)
VALUES(01, 01, "test_con");

INSERT INTO Mil_Personel(mil_id, mil_user_name, job_title, email, password)
VALUES(01, "test_mil_user", "Project Manager", "mil_user@milemail.us", "password");
    
INSERT INTO MIPR(MIPR_id, mil_id, MIPR_name)
VALUES(01, 01, "mil_mipr");

INSERT INTO Project{project_id, con_id, mil_id, MIPR_id, project_name, contract_num,
 contract_status, branch, requirement_type, summary, ipt_member, CLIN_num)
 VALUES(01, NULL, 01, 01, "test_project", 01, "Pre-Approved", "test_branch", 0101, "test summary", 
        "THIS IS WRONG IM SURE", 01);

INSERT INTO Messages(mess_id, project_id, mil_id, con_user_id, user_message, date_posted, time_posted)
VALUES(01, 01, 01, NULL, "test message", 01/01/2022, 23:00:00);

INSERT INTO Contract_Award(contract_num, contract_status, requirement_plan, draft_rfp_released,
 approved_by_acb, rfp_released, proposal_received, tech_eval_comp, nego_comp, awarded)
 VALUES(01, "Pre-Awarded", 01/01/2022, 01/02/2022, 01/03/2022, 01/04/2022, 01/05/2022,
        01/06/2022, 01/07/2022, 01/08/2022);

INSERT INTO Funding(funding_doc_num, project_id, indepen_cost_est, 
                    projected_contract_value, approved_funding, approved_funding_type, 
                    approved_funding_fiscal_year, projected_oblig_plan_type, projected_oblig_plan_year)
VALUES(01, 01, $1000, $2000, $10000, "funding_type_test", "fiscal_year_test", NULL, NULL);

INSERT INTO CLIN(CLIN_num, CLIN_type, CLIN_scope, projected_CLIN_value)
VALUES(01, "clin_type_test", "clin_scope_test", $420,000,000);