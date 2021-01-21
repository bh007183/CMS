
const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
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

  function editPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "editoptions",
      choices: ["Edit Employee's Role"]
  }]).then(ans=>{
    switch (ans.editoptions) {

        case "Edit Employee's Role":
          connection.query(
            "INSERT INTO role SET ?",
            {
              first_name: ans.fName,
              last_name: ans.lName,
              role_id: ans.roleId,
              manager_id: managerId
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " department created!\n");
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
          
          break;

        case "Edit Employee's manager ID":
          connection.query(
            "INSERT INTO role SET ?",
            {
              first_name: ans.fName,
              last_name: ans.lName,
              role_id: ans.roleId,
              manager_id: managerId
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " department created!\n");
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
          
          break;
      
        default:
          break;
      }
              console.log(ans.emprole)
          })
            
          
    }  

  })}

  exports.editPrompt = editPrompt