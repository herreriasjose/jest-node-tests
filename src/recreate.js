// tdd-jest-node/src/recreate.js

// Here we are going to recreate a toy table in our database so that we can run tests over and over again.

function recreateTable(){

  const sqlite3 = require('sqlite3').verbose();
  const productsDBPath = './databases/products.db';

  const testProducts = [

    {productId:'w1', name: 'larvets', description: 'Crunchy Worms.', price: 4.12},
    {productId:'b1', name: 'beetles', description: 'Huge Water Beetles.', price: 7.12},
    {productId:'a1', name: 'anteggs', description: 'Try them on your salad or tortilla chips.', price: 3.12},
    {productId:'a2', name: 'termites', description: 'A delicious source of proteins.', price: 5.12}

]


let db = new sqlite3.Database(productsDBPath, (err) => {
    if (err) {
      console.log("Error: ",err.message);
      return;
    }
      console.log('Database recreated and ready to run tests.');
  });


db.run("DROP TABLE if exists testProducts");


db.run("CREATE TABLE if not exists testProducts (id INTEGER PRIMARY KEY, productId TEXT NOT NULL, name TEXT NOT NULL, description TEXT, price INT NOT NULL)");
  
  for(let i = 0; i < testProducts.length; i++){

 db.serialize(() => {
                
          let stmt = db.prepare("INSERT INTO testProducts VALUES (NULL,(?),(?),(?),(?))");

          stmt.run( [testProducts[i].productId,testProducts[i].name,testProducts[i].description,testProducts[i].price] );
          
          stmt.finalize();
        }); 
     
};

}



recreateTable();

