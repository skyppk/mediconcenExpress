var crypto = require('crypto');
var conf = require('../database/config');

module.exports = {
    cryptoPW: function (req, res, next){
        if (req.body.password) {
            req.body.password = crypto.createHash('sha256')
                .update(req.body.password + conf.salt)
                .digest('hex');
        }
        next();
    }
}