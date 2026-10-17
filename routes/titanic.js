var express = require('express');
var router = express.Router();
var {getRows, deleteRow, searchRows, editRow, updateRow, addRow, dbConn}  = require('../lib/db');         //  yes, this is our connection variable from the db.js file

//  display index page when the url is "{object}/"
//  remember back in app.js we defined all /{object} requests would come here
//  so in this code we only reference the rest of the URL
router.get('/', (req, res, next) => {
    getRows(req, res, next);
});

// display add page
//      URL:            /{object}/add
router.get('/add', (req, res, next) => {
    let table = req.baseUrl.replace('/','');        //  this is a little trick to get the table name from the URL.  We are using the same code for all tables

    // render to add.ejs
    res.render(`${table}/add`, {    //  no data because we are adding a new record
        id: 0, lastName: '', firstName: '', age: '', class: '',
        passengerOrCrew: '', role: '', survivor: '', gender: ''
    });
})

// add new
//      this is a POST request. We are receiving data back from the client
router.post('/add', (req, res, next) => {
    addRow(req, res, next);
})

// display edit page
router.get('/edit/(:id)', (req, res, next) => {
    editRow(req, res, next);
})

// update data
router.post('/update/:id', (req, res, next) => {
    updateRow(req, res, next);
})

// search
router.post('/search', function(req, res, next) {
    searchRows(req, res, next);
})

// delete
router.get('/delete/(:id)', function(req, res, next) {
    deleteRow(req, res, next);
})

module.exports = router;