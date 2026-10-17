var mysql = require('mysql2');

// Let’s connect our project to this database.
var dbConn = mysql.createConnection({
    host:       'localhost',    //  unt-examples.csheaaeddgfs.us-east-2.rds.amazonaws.com',       //  localhost',
    user:       'root',         //  'masterUsername',                   //  root localhost user name
    password:   '', //	'!Anguilla76',  //  commented out localhost password is empty
    database:   'examples'      //  'UNT_Examples'                      //  local host database 'examples'
});

//      When the connection fails this might be necessary
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '!Anguilla76';
// flush privileges;

//      the connection just connects and we are done.
//      The connection variable will be exported and available in the routers
dbConn.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

function getRows (req, res, next) {
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables
console.log(`getRows: ${table}`);
    //  We are just using plain old SQL to hit the database.
    dbConn.query(`SELECT * FROM examples.${table} ORDER BY id limit 50`,
        function(err,rows)     {
            if(err) {
                req.flash('error', err);
                // render to views/{object}/index.ejs
                res.render(`${table}/index`,{data:''});          //  notice all data back to the client is in a JSON object
            } else {
                // render to views/{object}/index.ejs
                res.render(`${table}/index`,{data:rows});        //  JSON data of the list of {object}
            }
        });
}

function deleteRow (req, res, next) {
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables
    let id = req.params.id;

    dbConn.query(`DELETE FROM examples.${table} WHERE id = ${id}`, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err.sqlMessage + ' -- ' + err.sql);
            // redirect to members page
            res.redirect(`/${table}`);
        } else {
            // set flash message
            req.flash('success', 'Successfully deleted');
            // redirect to members page
            res.redirect(`/${table}`);
        }
    })
}

function searchRows (req, res, next) {

    let column = req.body.attrib;
    let value = req.body.search;
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables

    dbConn.query(
        `SELECT *
            FROM examples.${table}
            WHERE ${column} like '%${value}%'
            ORDER BY 1
            limit 100`,
        function(err,rows) {
            if(err) {
                req.flash('error', err);
                // render to views/crimes/index.ejs
                res.render(`${table}`, {data:''});          //  notice all data back to the client is in a JSON object
            } else {
                // render to views/crimes/index.ejs
                res.render(`${table}`, {data:rows});        //  JSON data of the list of crimes
            }
        });
}

function editRow (req, res, next) {
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables

    dbConn.query(`SELECT * FROM examples.${table} WHERE id = ${req.params.id}`, (err, rows, fields) => {
        if (err) throw err

        // if record not found
        if (rows.length <= 0) {
            req.flash('error', `${req.params.id}: Not found`)
            res.redirect(`/${table}`)
        }
        // if found
        else {
            // render to edit.ejs
            res.render(`${table}/edit`, rows[0]);
        }
    })
}

function updateRow (req, res, next) {
    let id = req.params.id;
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables

    const emptyFields = Object.entries(req.body)
        .filter(([, value]) => value == null || value.trim() === '')
        .map(([name]) => name);

    if (emptyFields.length) {
        // set flash message
        req.flash('error', `Please enter all fields: ${emptyFields.join(', ')}`);
        // render to add.ejs with flash message
        res.render(`${table}/edit`, {
            ...req.body,
            id: id,
        })
    } else {            // if no error
        // update query
        dbConn.query(`UPDATE examples.${table} SET ? WHERE id = ${id}`, req.body, (err, result) => {
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render(`${table}/edit`, {
                    ...req.body,
                    id: id
                })
            } else {
                req.flash('success', 'Successfully updated');
                res.redirect(`/${table}`);
            }
        })
    }
}

function addRow (req, res, next) {

    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables

    const emptyFields = Object.entries(req.body)
        .filter(([, value]) => value == null || value.trim() === '')
        .map(([name]) => name);

    if (emptyFields.length) {
        // set flash message
        req.flash('error', `Please enter in the missing fields: ${emptyFields.join(', ')}`);
        // render to add.ejs with flash message
        res.render(`${table}/add`, req.body );
    } else {                  // if no error
        // insert query
        dbConn.query(`INSERT INTO examples.${table} SET ?`, req.body, (err, result) => {
            if (err) {
                req.flash('error', err)
                // render to add.ejs
                res.render(`${table}/add`, req.body);
            } else {
                req.flash('success', 'Successfully added');
                res.redirect(`/${table}`);
            }
        })
    }
}
//  the connection is made available to the rest of the world
module.exports = {getRows, deleteRow, editRow, searchRows, updateRow, addRow, dbConn};
