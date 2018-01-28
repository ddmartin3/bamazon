CREATE DATABASE bamazon;

use bamazon; 

create table products(
	productID INTEGER(11)AUTO_INCREMENT NOT NULL,
    product_name varchar(120) not null,
    department_name varchar(100) not null,
    price decimal(10) not null,
    product_sales integer(10),
    stock_quantity integer(10) not null,
    primary key (productID)
);

insert into products(product_name, department_name, price, product_sales, stock_quantity)
value("dainese gloves", "motorsports", 150, 1, 5),
	 ("basketball", "sports", 15.00, 3, 10),
     ("football", "sports", 20, 5, 15),
     ("Kershaw Fillet", "Weapons", 25.00, 5, 15),
     ("Hacksaw", "tools", 50.00, 1, 5),
     ("pikachu plush", "toys", 20, 3, 10),
     ("mp3 player", "electronics", 50.00, 3, 10),
     ("beyblade", "toys", 15, 2, 10),
     ("Principles", "books", 15, 10, 15),
     ("fire and fury", "books", 14, 100, 120);

create table departments(
	department_id INTEGER(11)AUTO_INCREMENT NOT NULL,
    department_name varchar(120) not null,
    over_head_costs decimal(50) not null,
    primary key (department_id)
);

select * from products;