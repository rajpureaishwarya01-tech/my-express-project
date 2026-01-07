require("dotenv").config();

module.exports = {
  development: {
    username: String(process.env.DB_USER ),
    password: String(process.env.DB_PASSWORD ),
    database: String(process.env.DB_NAME ),
    host: String(process.env.DB_HOST ),
    port: parseInt(process.env.DB_PORT),
    dialect: "postgres",
    logging: console.log,
  },
  test: {
    username: String(process.env.DB_USER || "postgres"),
    password: String(process.env.DB_PASSWORD || ""),
    database: String(process.env.DB_NAME_TEST || "atmavidya_test"),
    host: String(process.env.DB_HOST || "localhost"),
    port: parseInt(process.env.DB_PORT || "5432", 10),
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD || ""),
    database: String(process.env.DB_NAME),
    host: String(process.env.DB_HOST),
    port: parseInt(process.env.DB_PORT || "5432", 10),
    dialect: "postgres",
    logging: false,
  },
};
