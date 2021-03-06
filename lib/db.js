var mysql = require('mysql');

// Let’s connect our project to this database.
var connection = mysql.createConnection({
    host:       'unt-examples.csheaaeddgfs.us-east-2.rds.amazonaws.com',       //  localhost',
    user:       'masterUsername',                   //  root localhost user name
    password:   'masterPassword',                   //  commented out localhost password is empty
    database:   'UNT_Examples'                      //  local host database 'examples'
});

//      the connection just connects and we are done.
//      The connection variable will be exported and available in the routers
connection.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});
//  the connection is made available to the rest of the world
module.exports = connection;