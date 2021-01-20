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
    initialPrompt()
    })
    
    
  });
  /////////////////////////////////////////////////////////////////////////
  /////////Initial Prompt//////////
function initialPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "options",
      choices: ["View", "Add", "Edit", "Quit"]
    }]).then(ans=>{
      
  switch (ans.options) {
      case "View":
          viewPrompt()
          break;
  
      case "Add":
  
          addPrompt()
          
          break;
  
      case "Edit":
  
          editPrompt()
          
          break;
  
      case "Quit":
          console.log("Have a nice day!")
          connection.end()
          
          break;
  
      default:
          break;
  }    
  })
  }
  
//   exports.initialPrompt = initialPrompt
  
  ///////View/////////
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
                 initialPrompt()
            })
              
              break;
      
          case "View Roles":
            connection.query("SELECT * FROM role", function(err,data){
                if(err) throw err
                  console.table(data)
                  initialPrompt()
              })
              
              break;
      
          case "View Employees":
            connection.query("SELECT * FROM employee", function(err,data){
                console.table(data)
                initialPrompt()
            })
              break;
      
          default: 
              break;
      } 
  
    })}
  



