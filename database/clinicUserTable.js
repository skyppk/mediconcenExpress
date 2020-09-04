const mysql = require("mysql");
const conf = require('./config');

const mysqlPool = mysql.createPool(conf.db);
const tableName = 'clinic_users';


let clinicUserTable = {};


clinicUserTable.createTable = () => {
    return new Promise((resolve, reject) => {
       mysqlPool.query(
           'CREATE TABLE `mediconcen`.' + tableName + ' (' +
           '`id` INT NOT NULL AUTO_INCREMENT,' +
           '`email` NVARCHAR(255) NOT NULL,' +
           '`password` CHAR(64) NOT NULL,' +
           '`clinic` VARCHAR(40) NOT NULL,' +
           '`phone` CHAR(8) NOT NULL,' +
           '`address` VARCHAR(255) NOT NULL,' +
           'PRIMARY KEY (`id`),' +
           'UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,' +
           'UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);',(err, results) => {
               if (err) {
                   return reject(err);
               }
               return resolve(results);
           })
    });
}

clinicUserTable.all = () => {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM ' + tableName , (err, results) => {
            if (err){
                return reject(err);
            }

            return resolve(results);
        })
    });
}


module.exports = clinicUserTable;


