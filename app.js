const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./src/routes/userRoutes'));

app.use('/api/auth', require('./src/routes/authRoutes'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
