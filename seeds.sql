INSERT into departments (name)
VALUES ("Sales");
INSERT into departments (name)
VALUES ("Engineering");
INSERT into departments (name)
VALUES ("Finance");
INSERT into departments (name)
VALUES ("Legal");
INSERT into departments (name)
VALUES ("Manager");

select * from departments;

INSERT into roles (title, salary, department_id)
VALUES ("Sales Lead", 45000, 1);
INSERT into roles (title, salary, department_id)
VALUES ("Salesperson", 35000, 1);
INSERT into roles (title, salary, department_id)
VALUES ("Lead Engineer", 43000, 2);
INSERT into roles (title, salary, department_id)
VALUES ("Accountant", 50000, 3);
INSERT into roles (title, salary, department_id)
VALUES ("Legal", 50000, 4);
INSERT into roles (title, salary, department_id)
VALUES ("Manager", 65000, 5);

select * from roles;

INSERT into employees (first_name, last_name, roles_id)
values ("John", "Stamos", 3); 
INSERT into employees (first_name, last_name, roles_id)
values ("Jim", "Baker", 4);
INSERT into employees (first_name, last_name, roles_id)
values ("George", "Washington", 5);
INSERT into employees (first_name, last_name, roles_id)
values ("Meghan", "Kelly", 6);
INSERT into employees (first_name, last_name, roles_id, manager_id)
values ("Tom", "Hanks", 4,4);
INSERT into employees (first_name, last_name, roles_id)
values ("Dolly", "Parton", 6);