INSERT INTO department (name)
    VALUES  ('Sales'),
            ('Engineering'),
            ('Finance'),
            ('Legal'),
            ('HR');

INSERT INTO role (title, salary, department_id)
    VALUES ('Salesperson', 60000, 1),
           ('Sales Lead', 80000, 1),
           ('Engineer', 80000, 2),
           ('Engineering Lead', 100000, 2),
           ('Financial Analyst', 80000, 3),
           ('Financial Manager', 110000, 3),
           ('Legal Analyst', 110000, 4),
           ('Legal Manager', 130000, 4),
           ('HR Rep', 60000, 5),
           ('HR Lead', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ('Brendan', 'McGinty', 5, 2),
            ('Tom', 'Riddle', 6, NULL),
            ('Barry', 'Jones', 5, 2),
            ('Jessica', 'Thomas', 9, 5),
            ('Elena', 'Hollister', 10, NULL),
            ('Alex', 'Smith', 9, 5),
            ('Timmy', 'Hogan', 3, 8),
            ('Laura', 'Adams', 4, NULL);

