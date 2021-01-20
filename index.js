const inquirer = require("inquirer")
const mysql = require("mysql");
const resources = require("./index.js")




  /////////Initial Prompt//////////
// function initialPrompt(){
//     inquirer.prompt([{
//       type: "list",
//       name: "options",
//       choices: ["View", "Add", "Edit", "Quit"]
//     }]).then(ans=>{
      
//   switch (ans.options) {
//       case "View":
//           viewPrompt()
//           break;
  
//       case "Add":
  
//           addPrompt()
          
//           break;
  
//       case "Edit":
  
//           editPrompt()
          
//           break;
  
//       case "Quit":
//           console.log("Have a nice day!")
//           connection.end()
          
//           break;
  
//       default:
//           break;
//   }    
//   })
//   }
  
//   exports.initialPrompt = initialPrompt
  
  ///////View/////////
//   function viewPrompt(){
//       inquirer.prompt([{
//         type: "list",
//         name: "viewoptions",
//         choices: ["View Departments", "View Roles", "View Employees"]
//     }]).then(ans=>{
//       switch (ans.viewoptions) {
//           case "View Departments":
//             connection.query("SELECT * FROM department", function(err,data){
//                 if(err) throw err
//                 console.table(data)
//                  initialPrompt()
//             })
              
//               break;
      
//           case "View Roles":
//             connection.query("SELECT * FROM role", function(err,data){
//                 if(err) throw err
//                   console.table(data)
//                   initialPrompt()
//               })
              
//               break;
      
//           case "View Employees":
//             connection.query("SELECT * FROM employee", function(err,data){
//                 console.table(data)
//                 initialPrompt()
//             })
//               break;
      
//           default: 
//               break;
//       } 
  
//     })}



///////Add/////////
function addPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "addoptions",
      choices: ["Add Departments", "Add Roles", "Add Employees"]
  }]).then(ans=>{
    switch (ans.addoptions) {
        case "Add Departments":
            addDepartments()
            
            break;
    
        case "Add Roles":
            addRoles()
            
            break;
    
        case "Add Employees":
            addEmployees()
            
            break;
    
        default: 
            break;
    }  

  })}

///////Edit/////////
function editPrompt(){
    inquirer.prompt([{
      type: "list",
      name: "editoptions",
      choices: ["Edit Employees Role"]
  }]).then(ans=>{
    switch (ans.editoptions) {
        // case "Edit Departments":
            
        //     break;
    
        // case "Edit Roles":
            
        //     break;
    
        case "Edit Employees Role":
            editEmployeePrompt()
            
            break;
    
        default: 
            break;
    }  

  })}


function editEmployeePrompt(){
  inquirer.prompt([{
    type: "list",
    name: "emprole",
    message: "What is the Employees new role?"
}]).then(ans=>{
    console.log(ans.emprole)
})}


////////////////ADDING DEPARTMENTS//////////////
function addDepartments(){
    inquirer.prompt([{
      type: "input",
      name: "departmentName",
      message: "What is the name of the department?"
  }]).then(ans=>{
      console.log(departmentName)
  })}
////////////////ADDING ROLES///////////////////
function addRoles(){
    inquirer.prompt([{
      type: "input",
      name: "roleTitle",
      message: "What is the role title new role?"
    },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the role title new role?"

      },
      {
        type: "input",
        name: "roleId",
        message: "What is the departmentid?"

      }
  ]).then(ans=>{
      console.log(ans.roleTitle)
      console.log(ans.roleSalary)
      console.log(ans.roleId)
  })}



  //////////ADD EMPLOYEES////////////////////////

function addEmployees(){
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
      console.log(ans.fName)
      console.log(ans.lName)
      console.log(ans.roleId)
      console.log(ans.managerId)
  })}