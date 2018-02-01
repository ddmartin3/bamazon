CREATE DATABASE bamazon;

use bamazon; 

drop table products;

create table products(
	productID INTEGER(11)AUTO_INCREMENT NOT NULL,
    product_name varchar(120) not null,
    department_id integer(11) not null,
    price decimal(10) not null,
    product_sales decimal(10) default 0,
    stock_quantity integer(10) not null,
    primary key (productID)
);

insert into products(product_name, department_id, price, stock_quantity)
value("dainese gloves", 1, 150, 5),
	 ("basketball", 2, 15.00, 10),
     ("football", 2, 20, 15),
     ("Kershaw Fillet", 3, 25.00, 15),
     ("Hacksaw", 4, 50.00, 5),
	 ("pikachu plush", 5, 20, 10),
     ("mp3 player", 6, 50.00, 10),
     ("beyblade", 5, 15, 10),
     ("Principles", 7, 15, 15),
     ("fire and fury", 7, 14, 120);

select  sum(product_sales) 
from products
where department_id = 1; 


create table departments(
	department_id INTEGER(11)AUTO_INCREMENT NOT NULL,
    department_name varchar(120) not null,
    over_head_costs decimal(50) not null,
    primary key (department_id)
);

drop table departments;

insert into departments(department_name,over_head_costs)
value("motorsports", 200),
     ("sports", 500),
     ("Weapons", 300),
     ("tools", 1000),
     ("toys", 600),
     ("electronics", 1000),
     ("books", 200);

SELECT * FROM products;
select * from departments;


SELECT departments.department_id, departments.department_name, departments.over_head_costs , SUM(products.product_sales) AS product_sales, product_sales - departments.over_head_costs AS total_profit  
FROM products
INNER JOIN departments ON departments.department_id = products.department_id
GROUP BY departments.department_name
ORDER BY departments.department_id


