// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Import database connection
const db = require('./event_db');

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Charity Events API is running!',
        endpoints: {
            home: '/api/events/home',
            search: '/api/events/search',
            categories: '/api/categories',
            eventDetails: '/api/events/:id'
        }
    });
});

// 1. Home page data - Get all events (past and future)
app.get('/api/events/home', async (req, res) => {
    try {
        console.log('📝 Fetching home page event data...');
        const [rows] = await db.execute(
            `SELECT e.*, c.name as category_name 
             FROM events e 
             JOIN categories c ON e.category_id = c.id 
             ORDER BY e.date DESC`  
        );
        console.log(`✅ Found ${rows.length} events`);
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('❌ Error fetching home page data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch event data'
        });
    }
});

// 2. Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM categories ORDER BY name');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories'
        });
    }
});

// 3. Search events
app.get('/api/events/search', async (req, res) => {
    try {
        let { category, location, date } = req.query;
        console.log('🔍 Search parameters:', { category, location, date });
        
        let query = `
            SELECT e.*, c.name as category_name 
            FROM events e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.date >= NOW()  
        `;
        let params = [];

        if (category && category !== '') {
            query += ` AND c.name = ?`;
            params.push(category);
        }
        if (location && location !== '') {
            query += ` AND e.location LIKE ?`;
            params.push(`%${location}%`);
        }
        if (date && date !== '') {
            query += ` AND DATE(e.date) = ?`;
            params.push(date);
        }

        query += ` ORDER BY e.date ASC`;

        const [rows] = await db.execute(query, params);
        console.log(`✅ Search found ${rows.length} results`);
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('❌ Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search events'
        });
    }
});

// 4. Get event details
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log(`📄 Fetching event details ID: ${eventId}`);
        
        const [rows] = await db.execute(
            `SELECT e.*, c.name as category_name 
             FROM events e 
             JOIN categories c ON e.category_id = c.id 
             WHERE e.id = ?`,
            [eventId]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('❌ Error fetching event details:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch event details'
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📚 API documentation: http://localhost:${port}`);
});