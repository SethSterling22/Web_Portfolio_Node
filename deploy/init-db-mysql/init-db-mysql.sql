-- 1. DATABASE creation
CREATE DATABASE IF NOT EXISTS `Portfolio`;

-- Use the created database
USE `Portfolio`;

-- 2. TABLES CREATION

-- Table User
CREATE TABLE `User` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Email` VARCHAR(320) NOT NULL UNIQUE,
    `Password` VARCHAR(250) NOT NULL,
    `FirstName` VARCHAR(150) NOT NULL,
    `LastName` VARCHAR(150) NOT NULL,
    `LastLogin` DATETIME, -- Equivalent to TIMESTAMP WITHOUT TIME ZONE
    `Role` VARCHAR(15), -- VARCHAR(15)
    `Description` VARCHAR(500), -- VARCHAR(500)
    `RegisteredOn` DATETIME NOT NULL DEFAULT NOW() -- Equivalent to NOW() in MySQL
);

-- Table Degree
CREATE TABLE `Degree` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(100) NOT NULL
);

-- Table Education
CREATE TABLE `Education` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT NOT NULL,
    `Institution` VARCHAR(150) NOT NULL,
    `DegreeId` INT,
    `FieldOfStudy` VARCHAR(150),
    `StartDate` DATE NOT NULL,
    `EndDate` DATE,
    CONSTRAINT fk_education_user
        FOREIGN KEY (`UserId`)
        REFERENCES `User`(`Id`)
        ON DELETE CASCADE, -- If the user is DELETED, Education is DELETED too
    CONSTRAINT fk_education_degree
        FOREIGN KEY (`DegreeId`)
        REFERENCES `Degree`(`Id`)
        ON DELETE SET NULL -- If the Degree is DELETED, NULL is established
);

-- Table Experience
CREATE TABLE `Experience` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT NOT NULL,
    `JobTitle` VARCHAR(100) NOT NULL,
    `Company` VARCHAR(100) NOT NULL,
    `Description` TEXT, -- TEXT for large values
    `StartDate` DATE NOT NULL,
    `EndDate` DATE,
    `IsProject` BOOLEAN, -- BOOLEAN is alias for TINYINT(1) in MySQL
    CONSTRAINT fk_experience_user
        FOREIGN KEY (`UserId`)
        REFERENCES `User`(`Id`)
        ON DELETE CASCADE
);

-- Table Skill
CREATE TABLE `Skill` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `Proficiency` VARCHAR(50),
    CONSTRAINT fk_skill_user
        FOREIGN KEY (`UserId`)
        REFERENCES `User`(`Id`)
        ON DELETE CASCADE
);

-- Table Contact
CREATE TABLE `Contact` (
    `Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT NOT NULL,
    `Email` VARCHAR(320) NOT NULL,
    `Message` VARCHAR(500) NOT NULL,
    `SentDate` DATETIME NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_contact_user
        FOREIGN KEY (`UserId`)
        REFERENCES `User`(`Id`)
        ON DELETE CASCADE
);

-- 3. CRETION OF ADITIONAL INDEXES for performance
-- MySQL automatically creates indexes for PRIMARY KEY and FOREIGN KEYs.
-- These additional indexes are still useful for non-key columns used in WHERE clauses.
CREATE INDEX idx_user_email ON `User` (`Email`);
CREATE INDEX idx_education_user ON `Education` (`UserId`);
CREATE INDEX idx_experience_user ON `Experience` (`UserId`);
CREATE INDEX idx_skill_user ON `Skill` (`UserId`);
CREATE INDEX idx_contact_user ON `Contact` (`UserId`);
