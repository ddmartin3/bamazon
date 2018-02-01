var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');
const {table, getBorderCharacters} = require('table');

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
            "View Product Sales by Department",
            "Create New Department",
            "Exit"
        ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
             viewSales();
            break;

        case "Create New Department":
            createDepartment();
            break;

        case "Exit":
            console.log("Thanks for using Bamazon Supervisor")
            connection.end();
        break;
      }
    });
};

//Superviosor functions
function viewSales(){
    var departmentStats = "SELECT departments.department_id, departments.department_name, departments.over_head_costs , SUM(products.product_sales) AS product_sales, product_sales - departments.over_head_costs AS total_profit FROM products INNER JOIN departments ON departments.department_id = products.department_id GROUP BY departments.department_name ORDER BY departments.department_id"
    connection.query(departmentStats, function(err, res) {
        let data, output;
        data = [];
        data.push(["Department ID", "Dept. Name","Product Sales","Dept. Overhead","Total Profit"]);
        for (var i = 0; i < res.length; i++) {
            data.push([res[i].department_id , res[i].department_name , res[i].product_sales , res[i].over_head_costs , res[i].total_profit]);
        }
        output = table(data);
        console.log(output);
        initialMenu();
      });
}



function createDepartment(){
    inquirer.prompt([
        {
          name: "department_name",
          message: "What would you like to name your department?"
        },{
          name: "over_head_costs",
          message: "What is the department's overhead cost?"
        }
    ]).then(function(answer) {
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department_name,
                over_head_costs: answer.over_head_costs
            },
            function(err, res) {
              console.log(res.affectedRows + " department inserted!\n");
              initialMenu();
            },
            
        );
        
    });
    
}


