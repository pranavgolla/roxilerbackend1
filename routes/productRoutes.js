// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/initialize-db', productController.initializeDatabase);
router.get('/products', productController.getAllProducts);
router.get('/transactions', productController.getTransactions); // Add this line
router.get('/statistics', productController.getStatistics); // Add this line
router.get('/price-range-data', productController.getPriceRangeData); // Add this line
router.get('/category-data', productController.getCategoryData); // Add this line


module.exports = router;
