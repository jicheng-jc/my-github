const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, // 最大连 接数
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mall.sogou.com'
});

module.exports = pool;