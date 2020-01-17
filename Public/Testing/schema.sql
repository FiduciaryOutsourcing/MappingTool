-- CREATE TABLE users
-- (
--     email VARCHAR(255) PRIMARY KEY,
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- INSERT INTO users(email) VALUES
-- ('Katie34@yahoo.com'), ('Tunde@gmail.com');

-- SELECT * FROM users;
-- CREATE DATABASE loanIds;

-- CREATE TABLE loan_ids
-- (
--     id INT PRIMARY KEY,
--     CreateDate TIMESTAMP DEFAULT NOW(),
--     UpdateDate TIMESTAMP DEFAULT NOW(),
--     Employer_ID INT,
--     Tax_ID VARCHAR(12),
--     Last_Name TEXT DEFAULT '',
--     Loan_1_ID INT,
--     Loan_1_PMT DECIMAL,
--     Loan_2_ID INT,
--     Loan_2_PMT DECIMAL,


-- );
USE fiduciary_outsourcing;
CREATE TABLE loan_ids
(
    ID INT NOT NULL,
    CreateDate DATE,
    UpdateDate DATE,
    Status TEXT,
    Employer_ID INT,
    Tax_ID TEXT,
    Last_Name TEXT,
    Loan_1_ID INT,
    Loan_1_PMT DECIMAL(12,2),
    Loan_2_ID INT,
    Loan_2_PMT DECIMAL(12,2),
    Loan_3_ID INT,
    Loan_3_PMT DECIMAL(12,2),
    Loan_4_ID INT,
    Loan_4_PMT DECIMAL(12,2),
    Loan_5_ID INT,
    Loan_5_PMT DECIMAL(12,2),
    Loan_6_ID INT,
    Loan_6_PMT DECIMAL(12,2),
    Loan_7_ID INT,
    Loan_7_PMT DECIMAL(12,2),
    Loan_8_ID INT,
    Loan_8_PMT DECIMAL(12,2),
    Loan_9_ID INT,
    Loan_9_PMT DECIMAL(12,2),
    Loan_10_ID INT,
    Loan_10_PMT DECIMAL(12,2),
    PRIMARY KEY (ID)
);


INSERT INTO loan_ids
    (Employer_ID, Tax_ID, Last_Name, Loan_3_ID, Loan_3_PMT)
VALUES
    (
        174,
        "264-43-7143",
        "COLEY",
        3,
        97.72
);