
const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
const resources = require("./initialPrompt.js")
const cTable = require('console.table')






function addPrompt(){

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
                  connection.end()
                  // Call updateProduct AFTER the INSERT completes
                  
                }
              )
        
              })
            
            break;
    
        case "Add Roles":
          connection.query("SELECT * FROM department", (err,data)=>{
            const departmentArray = []
            for(let i = 0; i < data.length; i++){
              departmentArray.push(data[i].id + " " + data[i].name)
            }
          
          inquirer.prompt([
            {
            type: "input",
            name: "roleTitle",
            message: "What is the title for the new role?"
          },
            {
              type: "input",
              name: "roleSalary",
              message: "What is the salary for this new role?"
      
            },
            {
              type: "list",
              name: "roleId",
              message: "What is the department id this role is associated with?",
              choices: departmentArray
      
            }
            
        ]).then(ans=>{
          const rightId = ans.roleId.split(" ")
          connection.query(
          
            "INSERT INTO role SET ?",
            {
              title: ans.roleTitle,
              salary: ans.roleSalary,
              department_id: rightId[0]
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " Role created!\n");
              resources.initialPrompt()
              connection.end()
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
    
          })
        })

            
            break;
    
        case "Add Employees":
          connection.query("SELECT role.title, role.id FROM role", (err, data)=>{
            const employeetArray = []
           
            for(let i = 0; i < data.length; i++){
              employeetArray.push(data[i].title + " " + data[i].id)
            }
          
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
                type: "list",
                name: "roleId",
                message: "What is the Employees role id?",
                choices: employeetArray
        
              },
              {
                type: "input",
                name: "managerId",
                message: "What is the Employee's Manager's id?"
              }
        
        
        
        ]).then(ans=>{
          const valueArray = ans.roleId.split(" ")
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: ans.fName,
              last_name: ans.lName,
              role_id: valueArray[1],
              manager_id: ans.managerId
            },
            function(err, res) {
              if (err) throw err;
              console.log(res)
              console.log(res.affectedRows + " Employee added!\n");
              resources.initialPrompt()
              connection.end()
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
          })
        })
            
            break;
    
        default: 
            break;
    }  

  })}

  exports.addPrompt = addPrompt