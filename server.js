require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors()); // Allow Frontend to communicate with Backend
app.use(express.json()); // Parse JSON requests

// Serve Static Frontend Files from root directory
app.use(express.static(path.join(__dirname)));

// Basic status check route (To verify Judges that backend works)
app.get('/api/status', (req, res) => {
    res.json({
        status: 'Success',
        message: 'Backend is running correctly!',
        supabaseConfigured: !!supabaseUrl
    });
});

// --- CRUD Operations ---

// 1. READ: Fetch all problems
app.get('/api/problems', async (req, res) => {
    try {
        // Fetch data from Supabase PostgreSQL
        const { data, error } = await supabase
            .from('problems')
            .select('*')
            .order('id', { ascending: true }); // Keep them in logical order

        if (error) throw error;

        res.json({ status: 'success', data: data });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
