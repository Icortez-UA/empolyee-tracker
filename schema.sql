create database employee_db

create table if not exists departments(
    id int not null auto_increment,
    name varchar(30),
    primary key(id)

);

create table if not exists roles(
    id int not null auto_increment,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    deparment_id int,
    foreign key(deparment_id) REFERENCES departments(id),
    primary key(id)

);

create table if not exists employees(
    id in not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    roles_id int,
    foreign key(fk_roles_id) REFERENCES roles(id),
    manager_id int,
    foreing key(manager_id) REFERENCES employees(id),
    PRIMARY KEY(id)

);

INSERT into department (name)
VALUES ("Sales");
INSERT into department (name)
VALUES ("Engineering");
INSERT into department (name)
VALUES ("Finance");
INSERT into department (name)
VALUES ("Legal");
INSERT into department (name)
VALUES ("Manager");

select * from department;

INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 45000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Salesperson", 35000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Lead Engineer", 43000, 2);
INSERT into role (title, salary, department_id)
VALUES ("Accountant", 50000, 3);
INSERT into role (title, salary, department_id)
VALUES ("Legal", 50000, 4);
INSERT into role (title, salary, department_id)
VALUES ("Manager", 65000, 5);

select * from role;

INSERT into employee (first_name, last_name, role_id)
values ("John", "Stamos", 3); 
INSERT into employee (first_name, last_name, role_id)
values ("Jim", "Baker", 4);
INSERT into employee (first_name, last_name, role_id)
values ("George", "Washington", 5);
INSERT into employee (first_name, last_name, role_id)
values ("Meghan", "Kelly", 6);
INSERT into employee (first_name, last_name, role_id)
values ("Tom", "Hanks", 7);
INSERT into employee (first_name, last_name, role_id)
values ("Dolly", "Parton", 8);
