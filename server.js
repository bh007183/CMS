const inquirer = require("inquirer")
const mysql = require("mysql")
const resources = require("./index.js")

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
    connection.query("SELECT * FROM employee", function(err, data){
    if (err) throw err;
    console.table(data)
    resources.initialPrompt()
    })
    
    
  });