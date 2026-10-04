require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const supplierRoutes = require('./routes/suppliers');
const saleRoutes = require('./routes/sales');
const purchaseRoutes = require('./routes/purchases');
const reportRoutes = require('./routes/reports');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// API routes
app.use('/api/auth',       authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers',  supplierRoutes);
app.use('/api/sales',      saleRoutes);
app.use('/api/purchases',  purchaseRoutes);
app.use('/api/reports',    reportRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api', (req, res) => res.json({ message: 'Sri Ganesh General Store API running' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
