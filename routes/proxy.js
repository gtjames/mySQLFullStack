var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.options('/', function(req, res, next) {
//   console.log(req.query);
//   console.log(req.body);
//   console.log(req.params);
//   res.send('respond with a resource');
// });

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = "";

  let url = `https://${req.query.edu}.instructure.com/api/v1/courses/${req.query.course}/students`;
  console.log(url);

  let header = {
    "Content-Type"  : "application/json",
    "Authorization" : `Bearer ${token}`,
    "Accept": "*/*",
};
let getOptions = { method: "get", headers: header };

  console.log(url);
  fetch(url, getOptions)
  .then(resp => resp.json())
  .then(students => res.send(students))
  .catch(error => console.error('There was an error!', error));
});

module.exports = router;
