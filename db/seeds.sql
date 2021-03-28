USE employee_tracker_db;
INSERT INTO departments (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Manager", 90000, 1),
  ("Salesperson", 50000, 1),
  ("Lead Engineer", 120000, 2),
  ("Software Engineer", 80000, 2),
  ("Accountant", 85000, 3),
  ("Legal Team Lead", 170000, 4),
  ("Lawyer", 120000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, 6),
    ('Tom', 'Allen', 7, 6); 