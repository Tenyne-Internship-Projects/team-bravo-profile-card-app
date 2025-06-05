require("dotenv").config();
const { Pool } = require("pg");

if (!process.env.POSTGRES_URI) {
  console.warn(
    "[DB] Warning: POSTGRES_URI is not defined in environment variables. Database connection may fail."
  );
}

const isProduction = process.env.NODE_ENV === "production";
console.log(`[DB] SSL enabled: ${isProduction}`);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL connected successfully");
    client.release(); // Always release the client
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = {
  connectDB,
  pool,
  query,
};
