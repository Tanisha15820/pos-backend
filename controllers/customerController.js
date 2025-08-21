const pool = require("../db");

const getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const addCustomer = async (req, res) => {
  const { name, email, phone, loyalty_points } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO customers (name, email, phone, loyalty_points) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, phone, loyalty_points]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, loyalty_points } = req.body;
  try {
    const result = await pool.query(
      "UPDATE customers SET name=$1, email=$2, phone=$3, loyalty_points=$4 WHERE id=$5 RETURNING *",
      [name, email, phone, loyalty_points, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM customers WHERE id=$1", [id]);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer };
