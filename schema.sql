drop database employee_db;
create database employee_db;
use employee_db;
create table if not exists departments(
    id int not null auto_increment,
    department varchar(30),
    primary key(id)

);

create table if not exists roles(
    id int not null auto_increment,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    department_id int,
    foreign key(department_id) REFERENCES departments(id),
    primary key(id)

);

create table if not exists employees(
    id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    roles_id int,
    foreign key(roles_id) REFERENCES roles(id),
    manager_id int,
    foreign key(manager_id) REFERENCES employees(id),
    PRIMARY KEY(id)

);

