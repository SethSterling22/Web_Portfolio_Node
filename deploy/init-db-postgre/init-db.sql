-- 1. DATABASE creation
-- This command will be executed by psql.
CREATE DATABASE "Portfolio";

-- Connect to the database before execute the commands.
\c Portfolio;

-- 2. TABLES CREATION

-- Table User (dbo.User)
CREATE TABLE "User" (
    "Id" SERIAL PRIMARY KEY,
    "Email" VARCHAR(320) NOT NULL UNIQUE,
    "Password" VARCHAR(250) NOT NULL,
    "FirstName" VARCHAR(150) NOT NULL,
    "LastName" VARCHAR(150) NOT NULL,
    "LastLogin" TIMESTAMP WITHOUT TIME ZONE,
    "Role" VARCHAR(15), -- VARCHAR(15)
    "Description" VARCHAR(500), -- VARCHAR(500)
    "RegisteredOn" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table Degree (dbo.Degree)
CREATE TABLE "Degree" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL
);

-- Table Education (dbo.Education)
CREATE TABLE "Education" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "Institution" VARCHAR(150) NOT NULL,
    "DegreeId" INTEGER,
    "FieldOfStudy" VARCHAR(150),
    "StartDate" DATE NOT NULL,
    "EndDate" DATE,
    CONSTRAINT fk_education_user
        FOREIGN KEY ("UserId")
        REFERENCES "User"("Id")
        ON DELETE CASCADE, -- If the user is DELETED, Edutation is DELETED too
    CONSTRAINT fk_education_degree
        FOREIGN KEY ("DegreeId")
        REFERENCES "Degree"("Id")
        ON DELETE SET NULL -- If the Degree is DELETED, NULL is stablished
);

-- Table Experience (dbo.Experience)
CREATE TABLE "Experience" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "JobTitle" VARCHAR(100) NOT NULL,
    "Company" VARCHAR(100) NOT NULL,
    "Description" TEXT, -- TEXT for large values
    "StartDate" DATE NOT NULL,
    "EndDate" DATE,
    "IsProject" BOOLEAN, -- Usa BOOLEAN para bit
    CONSTRAINT fk_experience_user
        FOREIGN KEY ("UserId")
        REFERENCES "User"("Id")
        ON DELETE CASCADE
);

-- Table Skill (dbo.Skill)
CREATE TABLE "Skill" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Proficiency" VARCHAR(50),
    CONSTRAINT fk_skill_user
        FOREIGN KEY ("UserId")
        REFERENCES "User"("Id")
        ON DELETE CASCADE
);

-- Table Contact (dbo.Contact)
CREATE TABLE "Contact" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "Email" VARCHAR(320) NOT NULL,
    "Message" VARCHAR(500) NOT NULL,
    "SentDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_contact_user
        FOREIGN KEY ("UserId")
        REFERENCES "User"("Id")
        ON DELETE CASCADE
);

-- 3. CRETION OF ADITIONAL INDEXES for performance
CREATE INDEX idx_user_email ON "User" ("Email");
CREATE INDEX idx_education_user ON "Education" ("UserId");
CREATE INDEX idx_experience_user ON "Experience" ("UserId");
CREATE INDEX idx_skill_user ON "Skill" ("UserId");
CREATE INDEX idx_contact_user ON "Contact" ("UserId");
