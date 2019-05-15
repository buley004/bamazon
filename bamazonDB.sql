DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1500.00, 10), ("Bacon", "Groceries", 5.99, 20)
, ("Toe Ring", "Jewelrey", 99.99, 5), ("Shake Weight", "Sporting Goods", 29.99, 10)
, ("Gummy Bears", "Groceries", 2.99, 50), ("VCR", "Electronics", 219.25, 100)
, ("Silly String", "Toys", 3.50, 16), ("Turtleneck", "Apparel", 20.00, 7)
, ("Water Bottle", "Sporting Goods", 9.38, 26), ("Cat Food", "Pets", 29.99, 70);

select * from products;