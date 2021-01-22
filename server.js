
// remember to reengage safemode in mysql
const inquirer = require("inquirer")
const mysql = require("mysql")
const resources = require("./initialPrompt.js")
const cTable = require('console.table')


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id", function(err, data){
    if (err) throw err;
    console.table(data)
    resources.initialPrompt()
    connection.end()
    })
    
    
  });


