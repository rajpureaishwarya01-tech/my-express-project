require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
console.log('DATABASE_URL =', process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
