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
        '`followup` TEXT(255) NULL,' +
        'PRIMARY KEY (`id`));');
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
    sql = 'SELECT * FROM ' + tableName + ' ORDER BY `date` DESC';
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
    sql = mysql.format('SELECT * FROM ' + tableName + ' WHERE clinic = ? ORDER BY `date` DESC', [req.params.clinic]);
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


