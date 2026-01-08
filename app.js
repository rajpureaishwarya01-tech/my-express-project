require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/auth',require('./src/routes/authRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.get('/', (req, res) => {
  res.send('API running!');
});

const db = require('./database/models');

db.sequelize.authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ DB connection failed:', err));

db.sequelize.sync()
  .then(() => console.log('✅ Tables synced'))
  .catch(err => console.error('❌ Sync error', err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
