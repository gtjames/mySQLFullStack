var mysql = require('mysql2');

// Let’s connect our project to this database.
var dbConn = mysql.createConnection({
    host:       'localhost',    //  unt-examples.csheaaeddgfs.us-east-2.rds.amazonaws.com',       //  localhost',
    user:       'root',         //  'masterUsername',                   //  root localhost user name
    password:   '',             //	'!Anguilla76',  //  commented out localhost password is empty
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

const tableList = require('./tableList.json');

Object.entries(tableList).forEach(([table]) => {
    console.log(`table: ${table}`);
});

function getFields(req) {
    return tableList[req.baseUrl.replace('/', '')] ?? [];
}

function createRow (req, res, next) {
    let displayData= getFields(req);
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);
    res.render(`crud/add`, { upper: upper, table: table, fields: displayData });
}

function addRow (req, res, next) {
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);

    const emptyFields = Object.entries(req.body)
        .filter(([, value]) => value == null || value.trim() === '')
        .map(([name]) => name);

    if (emptyFields.length) {
        // set flash message
        req.flash('error', `Please enter in the missing fields: ${emptyFields.join(', ')}`);
        // render to add.ejs with flash message
        res.render(`crud/add`, {upper: upper, table : table, ...req.body} );
    } else {                  // if no error
        // insert query
        dbConn.query(`INSERT INTO examples.${table} SET ?`, req.body, (err, result) => {
            if (err) {
                req.flash('error', err)
                // render to add.ejs
                res.render(`crud/add`, {upper: upper, table : table, ...req.body});
            } else {
                req.flash('success', 'Successfully added');
                res.redirect(`/crud`);
            }
        })
    }
}

function getRows (req, res, next) {
    let displayData= getFields(req);
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);

    //  We are just using plain old SQL to hit the database.
    dbConn.query(`SELECT * FROM examples.${table} limit 50`,
        (err,rows) => {
            if(err) {
                req.flash('error', err);
                // render to views/{object}/index.ejs
                res.render(`crud/index`,{upper: upper, table : table, fields:displayData, data:''});          //  notice all data back to the client is in a JSON object
            } else {
                // render to views/{object}/index.ejs
                res.render(`crud/index`,{upper: upper, table : table, fields:displayData, data:rows});        //  JSON data of the list of {object}
            }
        });
}

function searchRows (req, res, next) {
    let displayData= getFields(req);
    let search = req.body.attrib;
    let value = req.body.search;
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);

    dbConn.query( `SELECT *
                    FROM  examples.${table}
                    WHERE ${search} like '%${value}%'
                    limit 100`,
        (err,rows) => {
            if(err) {
                req.flash('error', err);
                // render to views/object/index.ejs
                res.render(`crud`, {upper: upper, table : table, fields: displayData, data:''});          //  notice all data back to the client is in a JSON object
            } else {
                // render to views/object/index.ejs
                res.render(`crud`, {upper: upper, table : table, fields: displayData, data:rows});        //  JSON data of the list of crimes
            }
        });
}

function editRow (req, res, next) {
    let displayData= getFields(req);
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);

    dbConn.query(`SELECT * FROM examples.${table} WHERE id = ${req.params.id}`,
        (err, rows, fields) => {
            if (err) throw err

            // if record not found
            if (rows.length <= 0) {
                req.flash('error', `${req.params.id}: Not found`)
                res.redirect(`/crud`)
            }
            // if found
            else {
            // render to edit.ejs
                res.render(`crud/edit`, {upper: upper, table : table, data: rows[0], fields: displayData});
            }
    })
}

function updateRow (req, res, next) {
    let displayData= getFields(req);
    let id = req.params.id;
    let table = req.baseUrl.replace('/','');
    let upper = table.charAt(0).toUpperCase() + table.slice(1);

    const emptyFields = Object.entries(req.body)
        .filter(([, value]) => value == null || value.trim() === '')
        .map(([name]) => name);

    if (emptyFields.length) {
        // set flash message
        req.flash('error', `Please enter all fields: ${emptyFields.join(', ')}`);
        // render to add.ejs with flash message
        res.render(`crud/edit`, {
            ...req.body,
            id: id,
            upper: upper,
        })
    } else {            // if no error
        // update query
        dbConn.query(`UPDATE examples.${table} SET ? WHERE id = ${id}`, req.body,
            (err, result) => {
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render(`crud/edit`, {upper: upper, table : table, ...req.body, fields: displayData, id: id })
            } else {
                req.flash('success', 'Successfully updated');
                res.redirect(`/crud`);
            }
        })
    }
}

function deleteRow (req, res, next) {
    let table = req.baseUrl.replace('/','');
    let id = req.params.id;

    dbConn.query(`DELETE FROM examples.${table} WHERE id = ${id}`,
        (err, result) => {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err.sqlMessage + ' -- ' + err.sql);
            // redirect to members page
            res.redirect(`/crud`);
        } else {
            // set flash message
            req.flash('success', 'Successfully deleted');
            // redirect to members page
            res.redirect(`/crud`);
        }
    })
}

//  the connection is made available to the rest of the world
module.exports = {getRows, searchRows, createRow, addRow, editRow, updateRow, deleteRow, dbConn };
