const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
const resources = require("./initialPrompt.js")

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


function viewPrompt(){
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
               resources.initialPrompt()
          })
            
            break;
    
        case "View Roles":
          connection.query("SELECT * FROM role", function(err,data){
              if(err) throw err
                console.table(data)
                resources.initialPrompt()
            })
            
            break;
    
        case "View Employees":
          connection.query("SELECT * FROM employee", function(err,data){
              console.table(data)
              resources.initialPrompt()
          })
            break;
    
        default: 
            break;
    } 

  })}

  exports.viewPrompt = viewPrompt