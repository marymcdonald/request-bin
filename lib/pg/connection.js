require("dotenv").config();
const { Client } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

// const isProduction = (process.env.NODE_ENV === "production");

const CONNECTION = {
  connectionString: process.env.DATABASE_URL,
  // ssl: isProduction ? { rejectUnauthorized: false } : false,
};

module.exports = {
  async pgConnect(statement, ...parameters) {
    let client = new Client(CONNECTION);

    await client.connect();
    logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  }
};