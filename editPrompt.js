
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

  function editPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "editoptions",
      choices: ["Edit Employee"]
  }]).then(ans=>{
    switch (ans.editoptions) {
        // case "Edit Departments":
            
        //     break;
    
        // case "Edit Roles":
            
        //     break;
    
        case "Edit Employee":
          
          inquirer.prompt([
            {
            type: "list",
            name: "editEmployee",
            choices: ["Edit Employee's First Name", "Edit Employee's Last Name", "Edit Employee's role ID", "Edit Employee's manager ID"]
            }
            
    ]).then(ans=>{
      switch (ans.editEmployee) {
        case "Edit Employee's First Name":
          inquirer.prompt([
            {
              type: "input",
              name: "currentName",
              message: "Enter employee's name who you would like to updata."

            },
            {
              type: "input",
              name: "updatedName",
              message: "Enter employee's updated name."

            }
          ]).then(ans=>{
            connection.query(
              "UPDATE employee SET ? where ?",[
              {
                first_name: ans.updatedName,
              },
              {
                first_name: ans.currentName,
              }
            ],function(err, res) {
                if (err) throw err;
                console.log(res)
                console.log(res.affectedRows + ` employee updated!\n`);
                resources.initialPrompt()
                // Call updateProduct AFTER the INSERT completes
                
              }
            )

          })
          
          
          break;

        case "Edit Employee's Last Name":
          inquirer.prompt([
            {
              type: "input",
              name: "currentName",
              message: "Enter employee's last name who you would like to updata."

            },
            {
              type: "input",
              name: "updatedName",
              message: "Enter employee's updated last name."

            }
          ]).then(ans=>{
            connection.query(
              "UPDATE employee SET ? where ?",[
              {
                last_name: ans.updatedName,
              },
              {
                last_name: ans.currentName,
              }
            ],function(err, res) {
                if (err) throw err;
                console.log(res)
                console.log(res.affectedRows + ` employee updated!\n`);
                // Call updateProduct AFTER the INSERT completes
                resources.initialPrompt()
                
              }
            )

          })
          
          break;

        case "Edit Employee's role ID":
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