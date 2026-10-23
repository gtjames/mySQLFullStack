var express = require('express');
var router = express.Router();
var {dbConn}  = require('../lib/db');         //  yes, this is our connection variable from the db.js file

var displayFields = [
    { name: 'id',              text: 'id',                empty:0  },
    { name: 'lastName',        text: 'Last Name',         empty:''  },
    { name: 'firstName',       text: 'First Name',        empty:''  },
    { name: 'age',             text: 'Age',               empty:''  },
    { name: 'paxClass',        text: 'Pax Class',         empty:''  },
    { name: 'passengerOrCrew', text: 'Passenger Or Crew', empty:''  },
    { name: 'role',            text: 'Role',              empty:''  },
    { name: 'survivor',        text: 'Survivor',          empty:''  },
    { name: 'gender',          text: 'Gender',            empty:''  },
  ];

//  display members page when the url is "members/"
//  remember back in app.js we defined all /members requests would come here
//  so in this code we only reference the rest of the URL
router.get('/', (req, res, next) => {
    //  We are just using plain old SQL to hit the database.
    //                                                  OH LOOK! a callback function
    dbConn.query('SELECT * FROM examples.titanic ORDER BY lastName, firstName', (err, rows) => {
        if (err) {
            req.flash('error', err);
            // render to views/members/index.ejs
            res.render('ogtitanic', { data: '', fields: displayFields });          //  notice all data back to the client is in a JSON object
        } else {
            // render to views/members/index.ejs
            res.render('ogtitanic', { data: rows, fields: displayFields });        //  JSON data of the list of members
        }
    });
});

router.get('/get/(:id)', (req, res, next) => {
    dbConn.query('SELECT * FROM examples.titanic WHERE id = ' + req.params.id + ' ORDER BY lastName, firstName', (err, rows) => {
        if (err) {
            res.send({ data: err });          //  notice all data back to the client is in a JSON object
        } else {
            res.send({ data: rows });        //  JSON data of the list of members
        }
    });
});

// display add member page
//      URL:            /members/add
router.get('/add', function (req, res, next) {
    // render to add.ejs
    res.render('ogtitanic/add', { fields: displayFields  });
})

// add a new member
//      this is a POST request. We are receiving data back from the client
router.post('/add', function (req, res, next) {
    if (req.body.first.length === 0 || req.body.last.length === 0) {      //  not so fast. If you didn't enter anything we are not going to add that
        // set flash message
        req.flash('error', "Please enter First and Last Name");
        // render to add.ejs with flash message
        res.render('ogtitanic/add', req.body );
    } else {                  // if no error
        // insert query
        //      calling the database                        and waiting for the callback results over here
        req.body.name = `${req.body.last}, ${req.body.first}`;
        dbConn.query('INSERT INTO examples.titanic SET ?', req.body, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('ogtitanic/add', req.body);        // render to add.ejs
            } else {
                req.flash('success', 'Member successfully added');
                res.redirect('/ogtitanic');
            }
        })
    }
})

// display edit member page
router.get('/edit/(:id)', function (req, res, next) {
    dbConn.query(`SELECT * FROM examples.titanic WHERE id = ${req.params.id}`, (err, rows, fields) => {
        if (err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', `Member not found with id = ${req.params.id}`)
            res.redirect('/ogtitanic')
        }
        // if member found
        else {
            // render to edit.ejs
            res.render('ogtitanic/edit', {fields: displayFields, data: rows[0]});
        }
    })
})

// update titanic data
router.post('/update/:id', (req, res, next) => {
    req.body.id = req.params.id;

    if (req.body.first.length === 0 || req.body.last.length === 0) {
        req.flash('error', "Please enter First and Last Name"); // set flash message
        res.render('ogtitanic/edit', {fields: displayFields, data: req.body });  // render to add.ejs with flash message
    } else {            // if no error
        // update query
        dbConn.query('UPDATE examples.titanic SET ? WHERE id = ' + req.params.id, req.body, (err, result) => {
            if (err) {
                req.flash('error', err);            // set flash message
                res.render('ogtitanic/edit', {fields: displayFields, data: req.body });  // render to edit.ejs
            } else {
                req.flash('success', 'Titanic member successfully updated');
                res.redirect('/ogtitanic');
            }
        })
    }
})

// search wardList
router.post('/search', function (req, res, next) {
    dbConn.query(
        `SELECT * FROM examples.titanic WHERE ${req.body.attrib} like '%${req.body.search}%'`, (err, rows) => {
            if (err) {
                req.flash('error', err);
                res.render('ogtitanic', { data: '', fields: displayFields });      //  notice all data back to the client is in a JSON object
            } else {
                res.render('ogtitanic', { data: rows, fields: displayFields });      //  JSON data of the list of members
            }
        });
})

// delete member
router.get('/delete/(:id)', (req, res, next) => {
    dbConn.query(`DELETE FROM examples.titanic WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            req.flash('error', `${err.sqlMessage} -- ${err.sql}`);      // set flash message
        } else {
            req.flash('success', `Member successfully deleted! ID = ${req.params.id}`) // set flash message
        }
        res.redirect('/ogtitanic')        // redirect to members page
    })
})

module.exports = router;
