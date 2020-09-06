var express = require('express');
var oauth2 = require('../database/oauth2');

var router = express.Router();


router.post('/register', async function (req,res,next){
    try{
        let results = await oauth2.register(req);
        if (results.affectedRows == 1){
            res.status(200).json({message: "Success Register"});
        }
    }catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

router.post('/token', function (req, res, next) {
    if (!req.body.grant_type || req.body.grant_type != 'password') {
        res.status(400).json({
            error: 'unsupported_grant_type',
            error_description: 'This server only support password verify！'
        });
        return;
    }

    oauth2.login(req, function (err, results, fields) {
        if (err) {
            res.sendStatus(500);
            return console.error(err);
        }

        if (!results.length) {
            res.status(401).json({error: 'invalid_client', error_description: 'failed verify to login！'});
            return;
        }

        req.results = results;
        next();
    });
}, function (req, res) {
    oauth2.createToken(req, function (results) {
        res.header('Cache-Control', 'no-store');
        res.header('Pragma', 'no-cache');

        res.json(results);
    });
});



module.exports = router;