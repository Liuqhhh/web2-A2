
const mysql = require('mysql2');


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Lqh040413',
    database: 'charityevents_db'
};


const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const promisePool = pool.promise();


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


module.exports = promisePool;