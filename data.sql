DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL (10) NOT NULL,
  department_id INT (10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INT (10),
  manager_id INT (10) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 50000, 24);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erika", "Jones", "1", NULL);

