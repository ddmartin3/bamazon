var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    getAllProducts();
});

function getAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("ID#: "+ res[i].productID + " | Product: " + res[i].product_name + " | Price: $" + res[i].price );
      }
      console.log("-----------------------------------");
      userSelction();
    });
}


//function that starts user interaction
function userSelction() {
    inquirer.prompt([
        {
          name: "productID",
          message: "What is the product ID of the item you want to buy?"
        }, {
          name: "quantity",
          message: "How many do you want?"
        }
    ]).then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { productID: answer.productID}, function(err, res) {
        //    console.log("ID#: "+ res[0].productID + " | Product: " + res[0].product_name + " | Price: $" + res[0].price );
        
            if (answer.quantity > res[0].stock_quantity) {
                console.log("Insuffient quantiy!  We only have " + res[0].stock_quantity + " in stock.");
                userSelction();
            }else{
                var updatedLevel = (res[0].stock_quantity - answer.quantity);
                var soldToday = (answer.quantity * res[0].price);
                var product_sales = res[0].product_sales + soldToday;
                updateProduct(answer.productID,updatedLevel,product_sales);
                console.log("Thanks for shopping with us. Your total will be: $" + soldToday);
            }    
        });
    });
}


//Update Funtion:
function updateProduct(productID,updatedLevel,product_sales) {
    console.log("productID: " + productID);
    console.log("updated stock Level: " + updatedLevel);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [ 
        {
          stock_quantity: updatedLevel,
          product_sales: product_sales
        },
        {
          productID: productID
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
        connection.end();
      }
    );
}