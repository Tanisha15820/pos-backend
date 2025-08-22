const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch"); // npm install node-fetch

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const customerRoutes = require("./routes/customers");
const invoiceRoutes = require("./routes/invoices");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// setInterval(async () => {
//   try {
//     await fetch(`https://pos-backend-6lmf.onrender.com/`);
//     console.log("Pinged self to stay awake at", new Date());
//   } catch (err) {
//     console.error("Ping failed", err);
//   }
// }, 5 * 60 * 1000); // every 5 minutes
module.exports = app;
module.exports.handler = serverless(app);