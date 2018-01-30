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
    initialMenu();
});


function initialMenu(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventories",
            "Add to Inventory",
            "Add a New Product"
        ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          seeAllProducts();
          break;

        case "View Low Inventories":
          seeLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add a New Product":
          addProduct();
          break;
      }
    });
};


// Functions
function seeAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("ID#: "+ res[i].productID + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Stock Level: " + res[i].stock_quantity );
      }
      console.log("-----------------------------------");
      initialMenu();
    });
}


function seeLowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity<5 ", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID#: "+ res[i].productID + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Stock Level: " + res[i].stock_quantity );
        }
        console.log("-----------------------------------");
        initialMenu();
    });   
}


function addInventory(){
    inquirer.prompt([
        {
          name: "productID",
          message: "What is the product ID of the item you want to adjust?"
        }, {
          name: "quantity",
          message: "How many are you adding to inventory?"
        }
    ]).then(function(answer) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { productID: answer.productID}, function(err, res) {
            var updatedLevel = (res[0].stock_quantity + parseInt(answer.quantity));
            updateProduct(answer.productID,updatedLevel);
        });
    });
}


function addProduct(){
    inquirer.prompt([
        {
          name: "product_name",
          message: "What is the name of the product you would like to add?"
        },{
          name: "department_name",
          message: "How would you categorize the product?"
        },{
          name: "price",
          message: "How much should it cost?"
        },{
          name: "stock_quantity",
          message: "How many do you want"
        }
    ]).then(function(answer) {
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answer.product_name,
              department_name: answer.department_name,
              price: parseInt(answer.price),
              stock_quantity: parseInt(answer.stock_quantity)
            },
            function(err, res) {
              console.log(res.affectedRows + " product inserted!\n");
            }
        );
    });
    
}


// Update Function 
function updateProduct(productID,updatedLevel) {
    console.log("productID: " + productID);
    console.log("updated stock Level: " + updatedLevel);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: updatedLevel
        },
        {
          productID: productID
        }
      ],
      function(err, res) {
        console.log("product updated!\n");
      }
    );
}