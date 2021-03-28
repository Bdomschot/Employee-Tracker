const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const logo = require("asciiart-logo");
const cTable = require('console.table');

console.log(
  logo({
    name: 'Employee Tracker',
    font: 'Big',
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: 'grey',
    logoColor: 'white',
    textColor: 'blue',
  })
    .emptyLine()
    .right('version 1.0')
    .emptyLine()
    .center("Manage your team")
    .render()
);

function askForAction() {

  inquirer
    .prompt({
      message: "Choose something to do.",
      name: "action",
      type: "list",
      choices: [
        "QUIT",
        "VIEW_DEPARTMENT",
        "VIEW_ROLE",
        "VIEW_EMPLOYEE",
        "ADD_DEPARTMENT",
        "ADD_ROLE",
        "ADD_EMPLOYEE",
        "UPDATE_EMPLOYEE_ROLES"
         ]
    })
    .then((res) => {

        switch (res.action) {
          case "VIEW_DEPARTMENT":
            viewDepartment();
            return;
  
          case "VIEW_ROLE":
            viewRole()
            return;
  
          case "VIEW_EMPLOYEE":
            viewEmployee()
            return;
  
          case "ADD_DEPARTMENT":
            addDepartment();
            return;
  
          case "ADD_ROLE":
            addRole();
            return;
  
          case "ADD_EMPLOYEE":
            addemployee();
            return;
  
          case "UPDATE_EMPLOYEE_ROLES":
            updateEmployeeRoles();
            return;
  
          case "QUIT":
            connection.end();
            return;
  
          default:
            askForAction();
  
        }
  
  
      })
  }
  
  function viewDepartment() {
  
    db
      .getDepartment()
      .then((results) => {
        let table = cTable.getTable(results);
        console.table(table);
        askForAction();
      });
  }
  
  function viewRole() {
  
    db
      .getRole()
      .then((results) => {
        let table = cTable.getTable(results);
        console.table(table);
        askForAction();
      });
  }
  
  function viewEmployee() {
  
    db
      .viewInfo()
      .then((results) => {
        let table = cTable.getTable(results);
        console.table(table);
        askForAction();
      });
  }
  
  function addDepartment() {
  
    inquirer
      .prompt([
        {
            message: "What is the new department?",
            type: "input",
            name: "department_name",
        }
      ])
      .then(function (department) {
        db
          .createDepartment(department)
        askForAction()
      });
  }
  
  function addRole() {
  
    db
      .getDepartment()
      .then((departments) => {
  
        const departmentChoices = departments.map((department) => ({
          value: department.id,
          name: department.name
        }))
  
        inquirer
          .prompt([
            {
                message: "What department is this role for?",
                type: "list",
                name: "departmentId",
                choices: departmentChoices
            },
            {
                message: "What is the title for this role?",
                type: "input",
                name: "titleName",
            },
            {
                message: "What is the salary for this role?",
                type: "input",
                name: "salaryAmount",
            },
  
          ])
          .then(function (results) {
            db
              .createRole(results)
            askForAction()
          });
      });
  }
  
  function addemployee() {
    let employeeList;
    db.getEmployee()
      .then((employees) => {
  
        employeeList = employees.map((employee) => ({
  
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
  
        }))
  
        employeeList.push({
          name: "none",
          value: null
        })
  
      })
    db
      .getRole()
      .then((roles) => {
  
        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id
  
        }))
  
        inquirer
          .prompt([
  
            {
              message: "What is is this employee's role?",
              type: "list",
              name: "roleId",
              choices: roleChoices
            },
            {
              message: "What is the first name of this employee?",
              type: "input",
              name: "firstName",
            },
            {
              message: "What is the the last name of this employee?",
              type: "input",
              name: "lastName",
            },
            {
              message: "Who is the manager for this employee?",
              type: "list",
              name: "managerId",
              choices: employeeList
            },
  
          ])
          .then(function (results) {
            db
              .createEmployee(results)
            askForAction()
          });
      });
  
  };
  
  function updateEmployeeRoles() {
  
    db
      .getEmployee()
      .then((employees) => {
  
        const employeeList = employees.map((employee) => ({
  
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
  
        }))
  
  
        db
          .getRole()
          .then((roles) => {
  
            const roleChoices = roles.map((role) => ({
              name: role.title,
              value: role.id
  
            }))
  
            inquirer
              .prompt([
  
                {
                  message: "What is role is this employee going in?",
                  type: "list",
                  name: "roleId",
                  choices: roleChoices
                },
  
                {
                  message: "Update which employee?",
                  type: "list",
                  name: "id",
                  choices: employeeList
                },
  
              ])
              .then(function (results) {
                db
                  .updateRole(results)
                askForAction()
              });
          });
      })
  
  
  }
  
  askForAction();
  