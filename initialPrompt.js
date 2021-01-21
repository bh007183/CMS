const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
const add = require("./addPrompt")
const edit = require("./editPrompt")

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

  function initialPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "options",
      choices: ["View", "Add", "Edit", "Quit"]
    }]).then(ans=>{
      
  switch (ans.options) {
      case "View":
          view.viewPrompt()
          break;
  
      case "Add":
  
          add.addPrompt()
          
          break;
  
      case "Edit":
  
          edit.editPrompt()
          
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
  exports.initialPrompt = initialPrompt