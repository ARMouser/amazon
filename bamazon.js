var connection = require('./bzsql.js')
var inquirer = require('inquirer');

connection.connect(function(err){
    if (err) throw err;
})

connection.query('SELECT * FROM products', function(err, res){
    for (var i = 0; i < res.length; i++) {
        console.log('Item ' + res[i].item_id + ': ' + res[i].product_name + ', now going for $'+res[i].price)     
    }
    purchase()
})
function purchase(z) {
    inquirer.prompt([
        {
            name: 'product',
            message: 'What is the item number of what would you like to purchase?'
        },
        {
            name: 'quantity',
            message: 'How many would you like to buy?'
        }
     ]).then(function(res){
         var item = res.product;
         var quantity = res.quantity;
         connection.query('SELECT stock_quantitiy, price FROM products where item_id=?', [item], function(err, res){
             if (err) throw err
            var stock = res[0].stock_quantitiy;
            var retailPrice = res[0].price;
            var orderAmount = quantity*retailPrice;
             if (stock<quantity) {
                 console.log('Not enough quantity!')
                 purchase()
             } else {
                 console.log('Total: $'+orderAmount+'... Order filled!')
                 stock -= quantity;
                 connection.query('UPDATE products SET ? WHERE ?', [{stock_quantitiy: stock}, {item_id: item}], function(err, res){
                     if (err) throw err
                     inquirer.prompt([
                         {
                             name: 'confirm',
                             message: 'Would you like to purchase anything else?'
                         }
                     ]).then(function(res){
                         if (res.confirm.toLowerCase() === 'yes')
                         {
                             purchase()
                         } else {
                             console.log('Thank you for shopping with us!')
                         }
                     })
                 })
             }
         })
    })
}   