var connection = require('./bzsql.js')

connection.connect(function(err){
    if (err) throw err;
})

