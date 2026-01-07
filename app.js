const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);


// Default test route
app.get('/', (req, res) => res.send('API running!'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
