var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "viper",
  database: "employee_db"
});

const startQ = [
  "View all Employees",
  "View all Employees by Department",
  "Add Employee",
  "Update Employee Role",
  "Add Department",
  "Add Role",
  "Add Manager",
  "Exit"

]
connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
  
    start();
  });

  function start(){
    inquirer
      .prompt({
      name: "initial",
      type: "list",
      message: "What would you like to do?",
      choices: startQ
    }).then(function(anwser){
      switch (anwser.initial){

        case startQ[0]:
          viewEmployees();
          break;

        case startQ[1]:
          allEmpDep();
          break;

        case startQ[2]:
          addEmp();
          break;

        case startQ[3]:
          updateEmp();
          break;

        case startQ[4]:
          addDep();
          break;

        case startQ[5]:
          addRole();
          break;
        case startQ[6]:
          addMan();
          break;
        case startQ[7]:
          connection.end();
          break;

      }

    });
  };

  function viewEmployees(){
    var queryStr = "SELECT employees.id, employees.first_name, employees.last_name, roles.title,"+
    "departments.department, roles.salary FROM employees "+
    "LEFT JOIN roles on employees.roles_id = roles.id "+ 
    "LEFT JOIN departments on roles.department_id = departments.id;"
    
    connection.query(queryStr, function(err,data){
      if(err)throw err;
  
      console.table(data);
      
      start();
    });
  };

    function allEmpDep(){
      let array = [];
      var query = "SELECT id as value, department as name FROM departments";
      connection.query(query, function (err, res) {
        if (err) throw err;
        array = JSON.parse(JSON.stringify(res));
    
        inquirer
          .prompt({
            name: "department",
            type: "list",
            message: "Which department's employees do you want to see?",
            choices: array
          })
          .then(function (answer) {
            connection.query("SELECT employees.first_name, employees.last_name, roles.title," +
              "departments.department FROM employees LEFT JOIN roles on employees.roles_id = " +
              "roles.id LEFT JOIN departments on roles.department_id = departments.id " +
              "WHERE departments.id = ?;", [answer.department], function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log("");
                start();
              });
          });
      });
    };

    function addRole(){
      let arr =[];
      var query = "SELECT id as value, department as name FROM departments";
      connection.query(query, function (err, res) {
        if (err) throw err;
        arr = JSON.parse(JSON.stringify(res));
        var questions = [
          {
            type: "input",
            name: "name",
            message: "What is the name of the new role?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of this new role?",
            validate: validateSalary
          },
          {
            type: 'list',
            name: 'department',
            message: 'which department does this new role belong to?',
            choices: arr
          },];
          inquirer.prompt(questions).then(function(answer) {
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
              [answer.name, answer.salary, answer.department], function (err, res) {
                if (err) throw err;
                if (res.affectedRows > 0) {
                  console.log(res.affectedRows + " record added successfully!");
                }
                console.log("");
                start();
              });
          });
        });
    

    };
    function validateSalary(salary) {
      var reg = /^\d+$/;
      return reg.test(salary) || "Salary should be a number!";
    }

    function addDep(){
      inquirer
      .prompt(
        {
          type: "input",
          name: "name",
          message: "What is the name of the new department?"
        }
      ).then(function (answer) {
        connection.query("INSERT INTO departments (department) VALUES (?)", [answer.name], function (err, res) {
          if (err) throw err;
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record added successfully!");
          }
          console.log("");
          start();
        });
      });
    };
    function addEmp(){

      inquirer
      .prompt([{
        type: "input",
        name: "firstname",
        message: "What is the Employees First Name?"
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the Employees Last Name?"
      }]).then(function(answer){
        console.log(answer);
        var query = "SELECT id as value, title as name FROM roles";
        connection.query(query, function (err, res) {
          if (err) throw err;
          let array = JSON.parse(JSON.stringify(res));
          inquirer
            .prompt(
              {
                name: 'role',
                type: 'list',
                message: 'Choose a role for the new employee',
                choices: array
              }).then(function (answer1) {
                var query = "SELECT employees.id as value, CONCAT(employees.first_name, ' ', employees.last_name) as name " +
                  "FROM employees INNER JOIN roles ON employees.id = roles.id";
                connection.query(query, function (err, res) { 
                  if (err) throw err;
                  let array2 = JSON.parse(JSON.stringify(res));
                  inquirer
                    .prompt({
                      name: 'manager',
                      type: 'list',
                      message: 'Choose a manager for the new employee',
                      choices: array2
                    }).then(function (answer2) {
                      connection.query("INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ( ?, ?, ?, ?)",
                        [answer.firstname, answer.lastname, answer1.role, answer2.manager], function (err, res) {
                          if (err) throw err;
                          if (res.affectedRows > 0) {
                            console.log(res.affectedRows + " record added successfully!");
                          }
                          console.log("");
                          start();
                        });
                      });
                    });
                  });
      });
    });
  };
    /*function updateEmp(){};
    function addMan(){};*/