var inquirer = require("inquirer");
var mysql = require("mysql");
var vTable = require('console.table');
//untracked git file with mysql password
var key = require("./keys.js");

//store valid ids for prompt
var validIds = [];
//store chosen item and quantity
var id;
var chosenQuantity;
var orderCost;

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
connection.connect(function (err) {
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
      name: "itemId",
      validate: function (value) {
        if (validIds.includes(value) === true) {
          return true;
        }
        console.log("\nPlease enter a valid ID");
        return false;
      }
    },
    {
      type: "number",
      message: "How many would you like to buy?",
      name: "quantity",
      validate: function (value) {
        if (Number.isInteger(value) === true) {
          return true;
        }
        console.log("\nPlease enter a valid quantity");
        return false;
      }
    }
  ]).then(function (res) {
    id = res.itemId;
    chosenQuantity = res.quantity;

    //check stock
    checkStock(id, chosenQuantity);
  });
};

function displayItems() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    //display store stock
    console.table(results);

    //record IDs in stock for input validation
    validIds = [];
    for (let i = 0; i < results.length; i++) {
      validIds.push(results[i].item_id);
    };

    //run store
    runStore();
  });
};

function checkStock(id, quant) {
  connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, results) {
    if (err) throw err;
    console.log(results);

    //display insufficient stock message if order too large
    if (quant > results[0].stock_quantity) {
      console.log("Insufficient quantity");
    }
    else {
      orderCost = quant * results[0].price;
      var remainingUnits = results[0].stock_quantity - quant;
      console.log("\nTotal Cost: " + orderCost);
      console.log("\nRemaining: " + remainingUnits);
      //remove items from stock table
      updateStock(id, remainingUnits);
    };

  });
};

function updateStock(id, quant) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quant
      },
      {
        item_id: id
      }
    ],
    function (error) {
      if (error) throw err;
      console.log("Bid placed successfully!");
    }
  );
};

