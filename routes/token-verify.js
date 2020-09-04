var express = require('express');
var oauth2 = require('../database/oauth2');

var router = express.Router();

router.use(oauth2.tokenVerify, function (req, res, next){
   if (res.customError){
       res.status(res.statusCode).json(res.customError);
       return;
   }
   next();
});

module.exports = router;