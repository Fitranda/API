const Purchase = require("../models/Purchase");

// Get all employees
async function getPurchase(req, res) {
  try {
    const filter = req.query || {};
    Purchase.getPurchase(filter, (err, results) => {
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
async function CreatePurchase(req, res) {
  try {
    const {
      invoice,
      employeeId,
      supplierId,
      date,
      subtotal,
      discount,
      total,
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
    Purchase.CreatePurchase(req.body, (err, newPurchase) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating purchase", error: err });
      res.status(201).json(newPurchase);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  getPurchase,
  CreatePurchase,
};
