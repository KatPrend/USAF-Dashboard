// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME
};