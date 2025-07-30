const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth/auth-routes');
require('dotenv').config();

if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI in environment variables.');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Use env for origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'cache-control',
        'Expires',
        'Pragma',
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected. Server shutting down.');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});