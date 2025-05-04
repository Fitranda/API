const Sale = require("../models/Sale");

// Get all employees
async function getSale(req, res) {
  try {
    const filter = req.query || {};
    Sale.getSale(filter, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new employee
async function CreateSale(req, res) {
  try {
    const {
      invoice,
      employeeId,
      date,
      subtotal,
      discount,
      total,
      payment,
      change,
      detail
    } = req.body;

    // Validation
    if (!invoice) {
      return res.status(400).json({
        message: "Invoice harus diisi",
      });
    }
    if (!detail) {
      return res
        .status(400)
        .json({ message: "Pilih product terlebih dahulu" });
    }
    

    // Create employee
    Sale.CreateSale(req.body, (err, newSale) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating sale", error: err });
      res.status(201).json(newSale);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  getSale,
  CreateSale,
};
