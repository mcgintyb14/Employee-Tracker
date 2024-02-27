const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();


// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
  // Start the application
  startApp();
});

// Function to start the application
function startApp() {
  // Present user with options
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(answer => {
    // Perform actions based on user choice
    switch (answer.option) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        console.log('Exiting...');
        break;
    }
  });
}

// Function to view all departments
function viewDepartments() {
  // Execute SQL query to retrieve departments
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to main menu
  });
}

// Function to view all roles
function viewRoles() {
  // Execute SQL query to retrieve roles
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to main menu
  });
}

// Function to view all employees
function viewEmployees() {
  // Execute SQL query to retrieve employees
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp(); // Go back to main menu
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]).then(answer => {
    // Execute SQL query to add department
    connection.query('INSERT INTO department SET ?', { name: answer.name }, (err, results) => {
      if (err) throw err;
      console.log('Department added successfully.');
      startApp(); // Go back to main menu
    });
  });
}

// implement functions to add roles, employees, and update employee roles

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the role:'
        }
    ]).then(answer => {
        // Execute SQL query to add department
        connection.query('INSERT INTO role SET ?', { name: answer.name }, (err, results) => {
          if (err) throw err;
          console.log('Role added successfully.');
          startApp(); // Go back to main menu
        });
      });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new employee:'
        }
    ]).then(answer => {
        // Execute SQL query to add department
        connection.query('INSERT INTO employee SET ?', { name: answer.name }, (err, results) => {
          if (err) throw err;
          console.log('Employee added successfully.');
          startApp(); // Go back to main menu
        });
      });
}

function updateEmployeeRole() {
    // Logic to prompt the user for the employee and their new role
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you want to update:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the ID of the new role for the employee:'
        }
    ]).then(answer => {
        // Execute SQL query to update employee role
        connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [answer.roleId, answer.employeeId],
            (err, results) => {
                if (err) throw err;
                console.log('Employee role updated successfully.');
                startApp(); // Go back to main menu
            }
        );
    });
}

// Handle adding a role, adding an employee, updating an employee role

startApp();
