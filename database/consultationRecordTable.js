const mysql = require("mysql");
const conf = require('./config');

const mysqlPool = mysql.createPool(conf.db);
const tableName = 'consulation_record';
var sql;


let consultationRecordTable = {};

consultationRecordTable.createTable = () => {
    sql = mysql.format('CREATE TABLE `mediconcen`.' + tableName + ' (' +
        '`id` INT NOT NULL AUTO_INCREMENT,' +
        '`clinic` VARCHAR(40) NOT NULL,' +
        '`doctor` VARCHAR(40) NOT NULL,' +
        '`patient` VARCHAR(40) NOT NULL,' +
        '`diagnosis` VARCHAR(255) NOT NULL,' +
        '`medication` NVARCHAR(255) NOT NULL,' +
        '`fee` INT NOT NULL,' +
        '`date` DATETIME NOT NULL,' +
        '`followup` TINYINT NULL DEFAULT 0,' +
        'PRIMARY KEY (`id`),' +
        'FOREIGN KEY (`clinic`) REFERENCES `clinic_users` (`clinic`));');
    return new Promise((resolve, reject) => {
        mysqlPool.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
}

consultationRecordTable.all = () => {
    sql = 'SELECT * FROM ' + tableName;
    return new Promise((resolve, reject) => {
       mysqlPool.query(sql, (err, results) => {
           if (err){
               return reject(err);
           }

           return resolve(results);
       })
    });
}

consultationRecordTable.byClinic = (req) => {
    sql = mysql.format('SELECT * FROM ' + tableName + ' WHERE clinic = ?', [req.params.clinic]);
    console.log(sql);
    return new Promise((resolve, reject) => {
        mysqlPool.query(sql, (err, results) => {
            if (err){
                return reject(err);
            }

            return resolve(results);
        })
    });
}

consultationRecordTable.add = (req, callback) => {
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

module.exports = consultationRecordTable;


