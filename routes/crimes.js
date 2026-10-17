var express = require('express');
var router = express.Router();
var {getRows, deleteRow, searchRows, editRow, updateRow, addRow, dbConn}  = require('../lib/db');         //  yes, this is our connection variable from the db.js file

var displayFields = [
    { name: 'id',     text: 'id',     empty:0  },
    { name: 'ComplaintNum', text: 'Complaint Number',    empty:''  },
    { name: 'ReportDate',   text: 'Report Date',         empty:''  },
    { name: 'OffenseDesc',  text: 'Offense Description', empty:''  },
    { name: 'Borough',      text: 'Borough',             empty:''  },
    { name: 'PremiseType',  text: 'Premise Type',        empty:''  }
  ];

//  display index page when the url is "{object}/"
//  remember back in app.js we defined all /{object} requests would come here
//  so in this code we only reference the rest of the URL
router.get('/', (req, res, next) => {
    getRows(req, res, next, displayFields);
});

// display add page
//      URL:            /{object}/add
router.get('/add', (req, res, next) => {
    let table = req.baseUrl.replace('/','');

    // render to add.ejs
    res.render(`${table}/add`, { table: table, fields: displayFields });
})

// add new
//      this is a POST request. We are receiving data back from the client
router.post('/add', (req, res, next) => {
    addRow(req, res, next, displayFields);
})

// display edit page
router.get('/edit/(:id)', (req, res, next) => {
    editRow(req, res, next, displayFields);
})

// update data
router.post('/update/:id', (req, res, next) => {
    updateRow(req, res, next, displayFields);
})

// search
router.post('/search', (req, res, next) => {
    searchRows(req, res, next, displayFields);
})

// delete
router.get('/delete/(:id)', (req, res, next) => {
    deleteRow(req, res, next);
})

module.exports = router;
