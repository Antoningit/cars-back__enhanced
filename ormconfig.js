const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
module.exports = {
  type: "mysql",
  host: "109.95.212.13",
  port: parseInt(process.env.MYSQL_PORT) ?? 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  logging: false,
  entities: ["build/entity/**/*.js"],
  migrations: ["build/migration/**/*.js"],
  subscribers: ["build/subscriber/**/*.js"],
};
