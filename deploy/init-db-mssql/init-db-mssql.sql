-- 1. DATABASE creation
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Portfolio')
BEGIN
    CREATE DATABASE [Portfolio];
END
GO


-- Use the created database
USE [Portfolio];
GO


-- 2. TABLES CREATION

-- DROP previous tables
IF OBJECT_ID('Education', 'U') IS NOT NULL DROP TABLE Education;
IF OBJECT_ID('Experience', 'U') IS NOT NULL DROP TABLE Experience;
IF OBJECT_ID('Skill', 'U') IS NOT NULL DROP TABLE Skill;
IF OBJECT_ID('Contact', 'U') IS NOT NULL DROP TABLE Contact;
IF OBJECT_ID('User', 'U') IS NOT NULL DROP TABLE [User]; -- Drop childs
IF OBJECT_ID('Degree', 'U') IS NOT NULL DROP TABLE Degree; -- Drop Fathers


-- Table User
CREATE TABLE [User] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY, -- MSSQL Auto-Increment
    [Email] VARCHAR(320) NOT NULL UNIQUE,
    [Password] VARCHAR(250) NOT NULL,
    [FirstName] VARCHAR(150) NOT NULL,
    [LastName] VARCHAR(150) NOT NULL,
    [LastLogin] DATETIME2, -- Preferred date/time type in MSSQL
    [Role] VARCHAR(15), 
    [Description] NVARCHAR(MAX), 
    [RegisteredOn] DATETIME2 NOT NULL DEFAULT GETDATE() -- Use GETDATE()
);

-- Table Degree
CREATE TABLE [Degree] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] VARCHAR(100) NOT NULL
);

-- Table Education
CREATE TABLE [Education] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [UserId] INT NOT NULL,
    [Institution] VARCHAR(150) NOT NULL,
    [DegreeId] INT,
    [FieldOfStudy] VARCHAR(150),
    [StartDate] DATE NOT NULL,
    [EndDate] DATE,
    CONSTRAINT fk_education_user
        FOREIGN KEY ([UserId])
        REFERENCES [User]([Id])
        ON DELETE CASCADE, -- If the user is DELETED, Education is DELETED too
    CONSTRAINT fk_education_degree
        FOREIGN KEY ([DegreeId])
        REFERENCES [Degree]([Id])
        ON DELETE SET NULL -- If the Degree is DELETED, NULL is established
);

-- Table Experience
CREATE TABLE [Experience] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [UserId] INT NOT NULL,
    [JobTitle] VARCHAR(100) NOT NULL,
    [Company] VARCHAR(100) NOT NULL,
    [Description] NVARCHAR(MAX), -- NVARCHAR(MAX) usage like TEXT in MSSQL
    [StartDate] DATE NOT NULL,
    [EndDate] DATE,
    [IsProject] BIT, -- BIT "boolean" in MSSQL
    CONSTRAINT fk_experience_user
        FOREIGN KEY ([UserId])
        REFERENCES [User]([Id])
        ON DELETE CASCADE
);

-- Table Skill
CREATE TABLE [Skill] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [UserId] INT NOT NULL,
    [Name] VARCHAR(100) NOT NULL,
    [Proficiency] VARCHAR(50),
    CONSTRAINT fk_skill_user
        FOREIGN KEY ([UserId])
        REFERENCES [User]([Id])
        ON DELETE CASCADE
);

-- Table Contact
CREATE TABLE [Contact] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [UserId] INT NOT NULL,
    [Email] VARCHAR(320) NOT NULL,
    [Message] VARCHAR(500) NOT NULL,
    [SentDate] DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_contact_user
        FOREIGN KEY ([UserId])
        REFERENCES [User]([Id])
        ON DELETE CASCADE
);
GO


-- 3. CRETION OF ADITIONAL INDEXES for performance
CREATE INDEX idx_user_email ON [User] ([Email]);
CREATE INDEX idx_education_user ON [Education] ([UserId]);
CREATE INDEX idx_experience_user ON [Experience] ([UserId]);
CREATE INDEX idx_skill_user ON [Skill] ([UserId]);
CREATE INDEX idx_contact_user ON [Contact] ([UserId]);
GO



-- 4. DEGREE FIELDS CREATION
USE [Portfolio];
GO

INSERT INTO [Degree] ([Name]) VALUES ('Bachelor');
GO
INSERT INTO [Degree] ([Name]) VALUES ('Master');
GO
INSERT INTO [Degree] ([Name]) VALUES ('PhD');
GO

