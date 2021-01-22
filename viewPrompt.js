const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
const resources = require("./initialPrompt.js")
const cTable = require('console.table')

// var connection = mysql.createConnection({
//     host: "localhost",
  
//     // Your port; if not 3306
//     port: 3306,
  
//     // Your username
//     user: "root",
  
//     // Your password
//     password: "password",
//     database: "employee_db"
//   });



function viewPrompt(){
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
 
    inquirer.prompt([{
      type: "list",
      name: "viewoptions",
      choices: ["View Departments", "View Roles", "View Employees"]
  }]).then(ans=>{
    switch (ans.viewoptions) {
        case "View Departments":
          connection.query("SELECT * FROM department", function(err,data){
              if(err) throw err
              console.table(data)
              connection.end()
               resources.initialPrompt()
               
               
          })
            
            break;
    
        case "View Roles":
          connection.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id", function(err,data){
              if(err) throw err
                console.table(data)
                connection.end()
                resources.initialPrompt()
                
                
            })
            
            break;
    
        case "View Employees":
          connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id", function(err,data){
              console.table(data)
              connection.end()
              resources.initialPrompt()
              
              
          })
            break;
    
        default: 
            break;
    } 

  })}

  exports.viewPrompt = viewPrompt