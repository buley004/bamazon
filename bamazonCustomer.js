var inquirer = require("inquirer");
var mysql = require("mysql");
//untracked git file with mysql password
var key = require("./keys.js");

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

function runStore() {
  
  //function to display items


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

runStore();