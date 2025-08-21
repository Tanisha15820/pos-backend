const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const {
  getInvoices,
  addInvoice,
} = require("../controllers/invoiceController");

router.get("/", authenticateToken, getInvoices);
router.post("/", authenticateToken, addInvoice);

module.exports = router;
