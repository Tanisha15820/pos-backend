const pool = require("../db");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const addProduct = async (req, res) => {
  const { name, sku, price, category, stock, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, sku, price, category, stock, image_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [name, sku, price, category, stock, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, sku, price, category, stock, image_url } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET name=$1, sku=$2, price=$3, category=$4, stock=$5, image_url=$6 WHERE id=$7 RETURNING *",
      [name, sku, price, category, stock, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
