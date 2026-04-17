require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

// Basic status check route (To verify Judges that backend works)
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'Success', 
        message: 'Backend is running correctly!', 
        supabaseConfigured: !!supabaseUrl 
    });
});

// We will add CRUD operations properly in the next steps...

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
