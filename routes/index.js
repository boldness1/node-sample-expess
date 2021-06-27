var express = require('express');
var router = express.Router();
// var db = require('../database/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //    db.query('SELECT * FROM user;', function (error, rows, fields) {
  //        console.log(fields);
  //       res.send(rows);
  //   });
  //       res.send(req);

});

router.post('/addCase', function(req, res, next) {
    //
    // let caseData = req.body.params;
    //
    // console.log(caseData.name);
    // console.log(caseData.advocate);

    // db.query('INSERT INTO defendant VALUES("name","advocate",caseData.name,caseData.advocate); ', function (error, rows, fields) {
    //
    //     // res.send(jsonStrin);
    //     console.log(rows,fields);
    // });

    // res.send('welcome node root path');
});

module.exports = router;
