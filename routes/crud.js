var express = require('express');
var router = express.Router();
var {getRows, searchRows, createRow, addRow, editRow, updateRow, deleteRow}  = require('../lib/db');         //  yes, this is our connection variable from the db.js file

//  display index page when the url is "{object}/"
//  remember back in app.js we defined all /{object} requests would come here
//  so in this code we only reference the rest of the URL
router.get('/', (req, res, next) => getRows(req, res, next));

// add page
//      URL:            /{object}/add
router.get('/add', (req, res, next) => createRow(req, res, next));

// add new
//      this is a POST request. We are receiving data back from the client
router.post('/add', (req, res, next) => addRow(req, res, next));

// edit page
router.get('/edit/(:id)', (req, res, next) => editRow(req, res, next));

// update data
router.post('/update/:id', (req, res, next) => updateRow(req, res, next));

// search
router.post('/search', (req, res, next) => searchRows(req, res, next));

// delete
router.get('/delete/(:id)', (req, res, next) => deleteRow(req, res, next));

module.exports = router;
