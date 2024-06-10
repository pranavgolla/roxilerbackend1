# Product Management Backend API

This is a backend API for managing products, transactions, and generating statistics for a product management system.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>



2. Install dependencies:


3. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

PORT=5000
MONGODB_URI=<your-mongodb-uri>

Replace `<your-mongodb-uri>` with the connection URI for your MongoDB database.

4. Start the server:

npm start

The server should now be running on http://localhost:5000.

## Endpoints

### Initialize Database

GET /api/initialize-db


This endpoint initializes the database with seed data from a JSON file.

### Get All Products

GET /api/products

This endpoint returns all products from the database.

### Get Transactions

GET /api/transactions?page=<page>&perPage=<perPage>&search=<search>

This endpoint returns transactions with optional pagination and search functionality.

### Get Statistics

GET /api/statistics?month=<month>&year=<year>


This endpoint returns statistics for a given month and year.

### Get Price Range Data

GET /api/price-range-data?month=<month>&year=<year>


This endpoint returns data for generating a bar chart showing price ranges and the number of items in each range for the selected month.

### Get Category Data

GET /api/category-data?month=<month>&year=<year>


This endpoint returns data for generating a pie chart showing unique categories and the number of items from each category for the selected month.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


MONGO_URI=mongodb+srv://roxiler:1234567890@cluster0.y8yy7so.mongodb.net/roxiler
PORT=5000


The server should now be running on http://localhost:5000.

Endpoints

Initialize Database
URL: /api/initialize-db
Method: GET
Description: Initializes the database with seed data from a JSON file.

Get All Products
URL: /api/products
Method: GET
Description: Returns all products from the database.

Get Transactions
URL: /api/transactions
Method: GET
Description: Returns transactions with optional pagination and search functionality.

Get Statistics
URL: /api/statistics
Method: GET
Description: Returns statistics for a given month and year.

Get Price Range Data
URL: /api/price-range-data
Method: GET
Description: Returns data for generating a bar chart showing price ranges and the number of items in each range for the selected month.

Get Category Data
URL: /api/category-data
Method: GET
Description: Returns data for generating a pie chart showing unique categories and the number of items from each category for the selected month.

Technologies Used
Node.js
Express.js
MongoDB
Mongoose





