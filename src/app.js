const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/api/health', (req, res) => res.json({ estado: 'ok' }));
app.use('/api/productos', productRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;