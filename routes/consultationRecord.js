const consulationRecord = require('../database/consultationRecordTable');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
        let results = await consulationRecord.all();
        res.status(200).json({data: results});
    }catch (e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:clinic', async function(req, res, next) {
    try{
        let results = await consulationRecord.byClinic(req);
        res.status(200).json({data: results});
    }catch (e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async function (req, res,  next){
    try{
        let results = await consulationRecord.add(req);
        if (results.affectedRows == 1){
            res.status(200).json({message: "Success"});
        }

    }catch (e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/createTable', function(req, res, next) {
    res.send(consulationRecord.createTable());
});



module.exports = router;