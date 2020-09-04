const mysql = require("mysql");
const conf = require('./config');
const jwt = require('jsonwebtoken');


const mysqlPool = mysql.createPool(conf.db);
const tableName = 'clinic_users';
var sql;

let oauth2 = {};

oauth2.register = (req, callback) => {
    sql = mysql.format('INSERT INTO ' + tableName + ' SET ?', req.body);
    return new Promise((resolve, reject) => {
       mysqlPool.query(sql, (err, results) => {
           if (err) {
               return reject(err);
           }
           return resolve(results);
       });
    });
}

oauth2.login = (req, callback) => {
    sql = mysql.format('SELECT * FROM ' + tableName + ' WHERE email = ? AND password = ?',
        [req.body.email, req.body.password]);
    return new Promise((resolve, reject) => {
        mysqlPool.query(sql, callback);
    });
}

oauth2.createToken = (req, callback) => {
    let payload = {
        iss: req.results[0].email,
    }

    let token = jwt.sign(payload, conf.secret,{
       algorithm: 'HS256',
       expiresIn: conf.increaseTime + 's'
    });

    return callback({
        access_token: token,
        token_type: 'beare',
        expires_in: (Date.parse(new Date()) / 1000) + conf.increaseTime,
        // scope: req.results,
        info: {
            email: req.results[0].email
        }
    });
}

oauth2.tokenVerify = (req, res, next) => {
    if(!req.headers.authorization){
        res.statusCode = 401;
        res.customError = {error: 'invalid_client', error_description: 'no token!'};
    }

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], conf.secret,
            function (err, decoded){
            if (err) {
                res.statusCode = 400;

                switch (err.name) {
                    case 'TokenExpiredError':
                        res.customError = {error: 'invalid_grant', error_description: 'token expired !'};
                        break;
                    case 'JsonWebTokenErro':
                        res.customError = {error: 'invalid_grant', error_description: 'invalid token !'};
                        break;
                }
            } else {
                req.user = decoded;
            }
            });
    }
    next();
}

module.exports = oauth2;

