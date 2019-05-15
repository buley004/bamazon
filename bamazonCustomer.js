var inquirer = require("inquirer");
var mysql = require("mysql");
//untracked git file with mysql password
var key = require("./keys.js");
var vTable = require('console.table');

var storeStock = [];
var itemStock = [];

//create connection to mysql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: key.id,
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayItems();
});

function runStore() {

  //prompt for item id and units
  inquirer.prompt([
    {
      type: "number",
      message: "Please enter the Item ID of what you would like to purchase.",
      name: "itemId"
    },
    {
      type: "number",
      message: "How many would you like to buy?",
      name: "quantity"
    }
  ]).then(function(res){
    console.log(res.itemId);
    console.log(res.quantity);
  });
};

function displayItems(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    //display store stock
    console.table(results);

    //run store
    runStore();
  });
}

