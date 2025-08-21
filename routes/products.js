const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", authenticateToken, getProducts);
router.post("/", authenticateToken, addProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;
