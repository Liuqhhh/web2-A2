// event_db.js
const mysql = require('mysql2');

// 数据库配置 - 确保与 init_database.js 一致
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Lqh040413',
    database: 'charityevents_db'
};

// 创建连接池（推荐用于Web应用）
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 创建Promise版本的连接池
const promisePool = pool.promise();

// 测试数据库连接
pool.getConnection((err, connection) => {
    if (err) {
        console.log('❌ Database connection failed:', err.message);
        console.log('📌 Please check database configuration');
        console.log('💡 Make sure MySQL service is running and credentials are correct');
    } else {
        console.log('✅ Database connected successfully');
        connection.release();
    }
});

// 导出Promise版本的连接池用于async/await
module.exports = promisePool;