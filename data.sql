DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL (10) NOT NULL,
  department_id INT (10) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) references department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT (10) NOT NULL,
  manager_id INT (10) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) references role(id),
  FOREIGN KEY (Managment) references employee(id)
);

INSERT INTO department (name) VALUES ( "Accounting"), ( "Operations"), ( "Costumer Service"), ( "Managment");


INSERT INTO role (title, salary, separtment_id) VALUES ("Clerk", 40000, 1), ("Grounds Keeper", 50000, 2), ("Returns", 60000, 3),("Engineer", 50000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Erika", "Jones", 1, 1 ), ("Jack", "Fran", 2, 1 ), ("Kellie", "McDanials", 3, 1 ), ("Xu", "Lee", 4, 1 );

///////////////////////////////////////

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 50000, 24);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erika", "Jones", "1", NULL);



SELECT id, name
From department
INNER JOIN role 
ON department.id = role.department_id
INNER JOIN employee
ON role.department_id = employee.role_id


SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name
FROM employee JOIN role ON employee.role_id = role.department_id JOIN department ON department.id = role.department_id