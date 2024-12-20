require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();

// CORS
app.use(cors({
    origin: process.env.BASE_URI,
    credentials: true
}));

console.log(process.env.BASE_URI)

// Connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Api running'))

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
