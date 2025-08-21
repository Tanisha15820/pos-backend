const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

router.get("/", authenticateToken, getCustomers);
router.post("/", authenticateToken, addCustomer);
router.put("/:id", authenticateToken, updateCustomer);
router.delete("/:id", authenticateToken, deleteCustomer);

module.exports = router;
