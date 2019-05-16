# bamazon

This command line application utilizes Node and SQL to create a virtual storefront shopping experience.  Users can select an item and quantity from a virtual store, and are given a receipt for their total purchase cost.  The inventory that they purchased is then removed from the store.

The store's inventory is stored in a SQL database, accesed via the mysql node package, and displayed using the console.table node package.  The user is prompted using the inquirer node package.  The included `bamazonDB.sql` script can be used to seed a new replica database.  The mysql password for this version is stored in an untracked `keys.js` file, and will need to be updated if replicating this application.