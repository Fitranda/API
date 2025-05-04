const Supplier = require("../models/Supplier");

// Get all employees
async function getSupplier(req, res) {
  try {
    const filter = req.query || {};
    Supplier.getSupplier(filter, (err, results) => {
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
async function createSupplier(req, res) {
  try {
    const {
      supplierName,
      contact,
    } = req.body;

    // Validation
    if (!supplierName || supplierName.length > 255) {
      return res.status(400).json({
        message: "Nama supplier harus diisi dan maksimal 255 karakter",
      });
    }
    if (contact && contact.length > 20) {
      return res
        .status(400)
        .json({ message: "Kontak pegawai tidak boleh lebih dari 20 karakter" });
    }
    

    // Create employee
    Supplier.CreateSupplier(req.body, (err, newSupplier) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating supplier", error: err });
      res.status(201).json(newSupplier);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update an employee by ID
async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const {
      supplierName,
      contact
    } = req.body;

    // Validation
    if (!supplierName || supplierName.length > 255) {
      return res
        .status(400)
        .json({
          message: "Nama supplier harus diisi dan maksimal 255 karakter",
        });
    }
    if (contact && contact.length > 20) {
      return res
        .status(400)
        .json({ message: "Kontak pegawai tidak boleh lebih dari 20 karakter" });
    }
    Supplier.updateSupplier(id, req.body, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating supplier", error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      res.status(200).json({ message: "Supplier updated successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete an employee by ID
async function deleteSupplier(req, res) {
  try {
    const { id } = req.params;

    Supplier.deleteSupplier(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting supplier", error: err });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
