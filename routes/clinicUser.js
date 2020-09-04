const clinicUser = require('../database/clinicUserTable');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
        let results = await clinicUser.all();
        res.status(200).json(results);
    }catch (e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/createTable', function(req, res, next) {
    res.send(clinicUser.createTable());
});


module.exports = router;