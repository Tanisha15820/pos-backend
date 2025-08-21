const pool = require("../db");

const getInvoices = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         invoices.id,
         invoices.customer_id,
         invoices.total_amount,
         invoices.discount,
         invoices.payment_method,
         invoices.created_at,
         customers.name AS customer_name
       FROM invoices
       LEFT JOIN customers ON invoices.customer_id = customers.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "Database error" });
  }
};

const addInvoice = async (req, res) => {
  const { customer_id, total_amount, discount, payment_method, items } = req.body;

  try {
    // Insert invoice
    const invoiceResult = await pool.query(
      "INSERT INTO invoices (customer_id, total_amount, discount, payment_method) VALUES ($1,$2,$3,$4) RETURNING *",
      [customer_id || null, total_amount, discount, payment_method] // handle null customer
    );

    const invoice_id = invoiceResult.rows[0].id;

    // Insert invoice items
    for (const item of items) {
      await pool.query(
        "INSERT INTO invoice_items (invoice_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
        [invoice_id, item.product_id, item.quantity, item.price]
      );
      // Update product stock
      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    res.json({ message: "Invoice created", invoice_id });
  } catch (err) {
    console.error("Error adding invoice:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getInvoices, addInvoice };
