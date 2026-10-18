var express = require('express');
var router = express.Router();
var {getRows, searchRows, createRow, addRow, editRow, updateRow, deleteRow}  = require('../lib/db');         //  yes, this is our connection variable from the db.js file

var bookFields = [
    { name: 'id',     text: 'id',     empty:0  },
    { name: 'title',  text: 'Title',  empty:''  },
    { name: 'author', text: 'Author', empty:''  },
  ];

var crimeFields = [
    { name: 'id',     text: 'id',     empty:0  },
    { name: 'ComplaintNum', text: 'Complaint Number',    empty:''  },
    { name: 'ReportDate',   text: 'Report Date',         empty:''  },
    { name: 'OffenseDesc',  text: 'Offense Description', empty:''  },
    { name: 'Borough',      text: 'Borough',             empty:''  },
    { name: 'PremiseType',  text: 'Premise Type',        empty:''  }
  ];

  var titanicFields = [
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

function getFields(req) {
    let table = req.baseUrl.replace('/','');
  switch (table) {
    case 'books':       return bookFields;
    case 'crimes':      return crimeFields;
    case 'titanic':     return titanicFields;
    default:            return [];
  }
}
//  display index page when the url is "{object}/"
//  remember back in app.js we defined all /{object} requests would come here
//  so in this code we only reference the rest of the URL
router.get('/', (req, res, next) => {
    getRows(req, res, next, getFields(req));
});

// display add page
//      URL:            /{object}/add
router.get('/add', (req, res, next) => {
    createRow(req, res, next, getFields(req));
})

// add new
//      this is a POST request. We are receiving data back from the client
router.post('/add', (req, res, next) => {
    addRow(req, res, next, getFields(req));
})

// display edit page
router.get('/edit/(:id)', (req, res, next) => {
    editRow(req, res, next, getFields(req));
})

// update data
router.post('/update/:id', (req, res, next) => {
    updateRow(req, res, next, getFields(req));
})

// search
router.post('/search', (req, res, next) => {
    searchRows(req, res, next, getFields(req));
})

// delete
router.get('/delete/(:id)', (req, res, next) => {
    deleteRow(req, res, next);
})

module.exports = router;
