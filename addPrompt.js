
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





function addPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "addoptions",
      choices: ["Add Departments", "Add Roles", "Add Employees"]
  }]).then(ans=>{
    switch (ans.addoptions) {
        case "Add Departments":
            inquirer.prompt([
                {
                  type: "input",
                  name: "departmentName",
                  message: "What is the name of the department?"
                }
                // {
                //   type: "input",
                //   name: "departmentId",
                //   message: "What is the ID of the department?"
                // }
            ]).then(ans=>{
              connection.query(
                "INSERT INTO department SET ?",
                {
                  name: ans.departmentName,
                  // id: ans.departmentId,
                },
                function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " department created!\n");
                  resources.initialPrompt()
                  // Call updateProduct AFTER the INSERT completes
                  
                }
              )
        
              })
            
            break;
    
        case "Add Roles":
          inquirer.prompt([
            {
            type: "input",
            name: "roleTitle",
            message: "What is the role title new role?"
          },
            {
              type: "input",
              name: "roleSalary",
              message: "What is the salary for this new role?"
      
            },
            {
              type: "input",
              name: "roleId",
              message: "What is the department id this role is associated with?"
      
            }
            
        ]).then(ans=>{
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: ans.roleTitle,
              salary: ans.roleSalary,
              department_id: ans.roleId
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " Role created!\n");
              resources.initialPrompt()
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
    
          })

            
            break;
    
        case "Add Employees":
          
            inquirer.prompt([
                {
              type: "input",
              name: "fName",
              message: "What is the Employees first name?"
              },
              {
                type: "input",
                name: "lName",
                message: "What is the Employees last name?"
        
              },
              {
                type: "input",
                name: "roleId",
                message: "What is the Employees role id?"
        
              },
              {
                type: "input",
                name: "managerId",
                message: "What is the Employee's Manager's id?"
              }
        
        
        
        ]).then(ans=>{
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: ans.fName,
              last_name: ans.lName,
              role_id: ans.roleId,
              manager_id: ans.managerId
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " Employee added!\n");
              resources.initialPrompt()
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
          })
            
            break;
    
        default: 
            break;
    }  

  })}

  exports.addPrompt = addPrompt