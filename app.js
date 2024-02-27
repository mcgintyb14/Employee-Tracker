const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
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

// Similarly, implement functions to add roles, employees, and update employee roles

// Handle adding a role, adding an employee, updating an employee role

// Finally, call the startApp function to begin the application
