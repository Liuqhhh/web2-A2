// init_database.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lqh040413'  // 使用你的MySQL密码
});

async function initializeDatabase() {
    try {
        console.log('🚀 Starting database initialization...');
        
        // Create database
        await connection.promise().query('CREATE DATABASE IF NOT EXISTS charityevents_db');
        console.log('✅ Database created successfully');
        
        // Use database
        await connection.promise().query('USE charityevents_db');
        
        // 首先删除已存在的表（如果表结构有问题）
        await connection.promise().query('DROP TABLE IF EXISTS events');
        await connection.promise().query('DROP TABLE IF EXISTS categories');
        console.log('✅ Cleaned existing tables');
        
        // Create categories table
        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Categories table created');
        
        // Create events table - 确保包含所有需要的列
        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                full_description TEXT,
                date DATETIME NOT NULL,
                location VARCHAR(255) NOT NULL,
                purpose TEXT,
                ticket_price DECIMAL(10, 2) DEFAULT 0.00,
                goal_amount DECIMAL(10, 2),
                progress_amount DECIMAL(10, 2) DEFAULT 0.00,
                category_id INT,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )
        `);
        console.log('✅ Events table created');
        
        // Insert categories
        await connection.promise().query(`
            INSERT IGNORE INTO categories (id, name) VALUES 
            (1, 'Fun Run'),
            (2, 'Gala Dinner'),
            (3, 'Silent Auction'),
            (4, 'Concert'),
            (5, 'Workshop'),
            (6, 'Community Fair')
        `);
        console.log('✅ Categories inserted');
        
        // Insert sample events - 简化数据，先确保能插入成功
        await connection.promise().query(`
            INSERT IGNORE INTO events (name, description, full_description, date, location, purpose, ticket_price, goal_amount, progress_amount, category_id, is_active) VALUES
            ('City Marathon 2024', 'Annual city marathon for heart disease research', 'Join us for the annual City Marathon 2024! This event brings together runners of all levels to support heart disease research.', '2024-12-15 08:00:00', 'Central Park', 'Raise funds for Heart Foundation', 50.00, 50000.00, 32500.00, 1, TRUE),
            ('Charity Gala Night', 'An elegant evening to support local shelters', 'Experience an unforgettable evening of fine dining, entertainment, and philanthropy at our annual Charity Gala Night.', '2024-11-20 19:00:00', 'Grand Hotel Ballroom', 'Support homeless shelters', 150.00, 20000.00, 12000.00, 2, TRUE)
        `);
        console.log('✅ Sample events inserted');
        
        console.log('\n🎉 Database initialization completed successfully!');
        console.log('📊 Database: charityevents_db');
        console.log('📋 Tables: categories, events');
        console.log('🎯 Sample data: 6 categories, 2 events');
        console.log('\n🚀 You can now start the server with: npm run dev');
        
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        console.log('\n💡 Possible solutions:');
        console.log('1. Check if MySQL service is running');
        console.log('2. Verify MySQL username and password in init_database.js');
        console.log('3. Ensure you have permission to create databases');
    } finally {
        connection.end();
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    initializeDatabase();
}

module.exports = { initializeDatabase };