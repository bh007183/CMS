
// remember to reengage safemode in mysql
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
  

////////////////////////////////////////

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
                    },
                    {
                      type: "input",
                      name: "departmentId",
                      message: "What is the ID of the department?"
                    }
                ]).then(ans=>{
                  connection.query(
                    "INSERT INTO department SET ?",
                    {
                      name: ans.departmentName,
                      id: ans.departmentId,
                    },
                    function(err, res) {
                      if (err) throw err;
                      console.log(res.affectedRows + " department created!\n");
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
                  console.log(res.affectedRows + " department created!\n");
                  // Call updateProduct AFTER the INSERT completes
                  
                }
              )
        
              })

                
                break;
        
            case "Add Employees":
                addEmployees()
                
                break;
        
            default: 
                break;
        }  
    
      })}