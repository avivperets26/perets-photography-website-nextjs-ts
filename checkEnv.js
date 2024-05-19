require("dotenv").config({ path: ".env.local" });
console.log("Database URL:", process.env.DATABASE_URL);
