
const inquirer = require("inquirer")
const mysql = require("mysql");
const view = require("./viewPrompt")
const resources = require("./initialPrompt.js")
const cTable = require('console.table')


  function editPrompt(){

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

    connection.query("SELECT first_name, last_name, id  FROM employee", function(err,data){
      if (err) throw err
      const nameArray = []
      for (let i = 0; i < data.length; i++){
        data[i].first_name + " " + data[i].last_name
        nameArray.push(data[i].first_name + " " + data[i].last_name + " " + data[i].id) 
      }
      
      // connection.query("SELECT id, title FROM role", function(err,data){
      //   const roleArray = []
      // for (let i = 0; i < data.length; i++){
      //   roleArray.push(data[i].id + " " + data[i].title) 
      // }
      // }),
    inquirer.prompt([
      {
      type: "list",
      name: "editoptions",
      choices:nameArray
      },
      {
      type: "input",
      name: "newRole",
      Message: "input employees new Role Id."
      }
     ])
    
    .then(ans=>{
      const splitArray = ans.editoptions.split(" ") 
        
  connection.query("UPDATE employee SET ? where ?",[
            {
              role_id: ans.newRole,
            },
            {
              id: splitArray[2]
            }
          ],
            function(err, res) {
              if (err) throw err;
              console.log(res)
              
              console.log(res.affectedRows + " employee role changed!\n");
              resources.initialPrompt()
              connection.end()
              // Call updateProduct AFTER the INSERT completes
              
            }
          )
          
          })
        })
          
    }  



  exports.editPrompt = editPrompt