require("dotenv").config();
const DATABASE_CONNECT_STRING = process.env.MONGODB_CONNECTION_URL;
const PORT = 4000 || process.env.PORT;
const SECRET = process.env.SECRET;

module.exports = {
  DATABASE_CONNECT_STRING,
  PORT,
  SECRET,
};
