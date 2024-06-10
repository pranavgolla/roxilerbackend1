// controllers/productController.js
const axios = require("axios");
const Product = require("../models/productModel");

exports.initializeDatabase = async (req, res) => {
  try {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const response = await axios.get(url);
    const data = response.data;

    await Product.deleteMany({}); // Clear the collection before seeding

    const products = data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      sold: item.sold,
      dateOfSale: new Date(item.dateOfSale),
    }));

    await Product.insertMany(products);

    res.send("Database initialized with seed data");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while initializing the database");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = req.query.search;

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } },
        ],
      };
    }

    const transactions = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching transactions");
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);
    const selectedYear = parseInt(req.query.year);

    if (!selectedMonth || !selectedYear) {
      return res.status(400).send("Month and year are required");
    }

    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0);

    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          sold: true,
          dateOfSale: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await Product.countDocuments({
      sold: true,
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    const totalNotSoldItems = await Product.countDocuments({
      sold: false,
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching statistics");
  }
};

// controllers/productController.js


exports.getPriceRangeData = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);

    if (!selectedMonth) {
      return res.status(400).send("Month is required");
    }

    const startDate = new Date(req.query.year, selectedMonth - 1, 1);
    const endDate = new Date(req.query.year, selectedMonth, 0);

    const priceRanges = [
      { range: "0 - 100", min: 0, max: 100 },
      { range: "101 - 200", min: 101, max: 200 },
      { range: "201 - 300", min: 201, max: 300 },
      { range: "301 - 400", min: 301, max: 400 },
      { range: "401 - 500", min: 401, max: 500 },
      { range: "501 - 600", min: 501, max: 600 },
      { range: "601 - 700", min: 601, max: 700 },
      { range: "701 - 800", min: 701, max: 800 },
      { range: "801 - 900", min: 801, max: 900 },
      { range: "901 - Above", min: 901, max: Infinity },
    ];

    const priceRangeData = [];

    for (const range of priceRanges) {
      const count = await Product.countDocuments({
        price: { $gte: range.min, $lte: range.max },
        dateOfSale: { $gte: startDate, $lte: endDate },
      });
      priceRangeData.push({ range: range.range, count });
    }

    res.json(priceRangeData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching price range data");
  }
};

exports.getCategoryData = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);

    if (!selectedMonth) {
      return res.status(400).send("Month is required");
    }

    const startDate = new Date(req.query.year, selectedMonth - 1, 1);
    const endDate = new Date(req.query.year, selectedMonth, 0);

    const categoriesData = await Product.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedCategoriesData = categoriesData.map(({ _id, count }) => ({
      category: _id,
      count,
    }));

    res.json(formattedCategoriesData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching category data");
  }
};



