const Sale = require("../models/Sale");
const { imageUpload } = require("../utils/imagekit");

// Get all sales (with optional filters)
async function getSale(req, res) {
  try {
    const filter = req.query || {};
    Sale.getSale(filter, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching sales", error: err });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get single sale with details by ID
async function getSaleDetail(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Sale ID is required" });
    }

    Sale.getSaleDetail(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching sale detail", error: err });
      }

      if (!result) {
        return res.status(404).json({ message: "Sale not found" });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new sale with detail items
async function createSale(req, res) {
  try {
    let {
      invoice,
      employeeId,
      date,
      method,
      subtotal,
      discountPercent,
      total,
      payment,
      change,
      details,
    } = req.body;

    // Validate
    if (!invoice || !employeeId || !date || !method) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(details)) {
      try {
        details = JSON.parse(details); // In case details sent as JSON string
      } catch {
        return res.status(400).json({ message: "Invalid details format" });
      }
    }

    if (!Array.isArray(details) || details.length === 0) {
      return res.status(400).json({ message: "Details cannot be empty" });
    }

    if (typeof discountPercent !== "number") {
      discountPercent = parseFloat(discountPercent) || 0;
    }

    if (discountPercent < 0 || discountPercent > 100) {
      discountPercent = 0;
    }

    const discount = (subtotal * discountPercent) / 100;
    total = subtotal - discount;

    let proofQris = null;
    if (req.file) {
      try {
        proofQris = await imageUpload(req.file); // imagekit upload
      } catch (uploadErr) {
        return res
          .status(500)
          .json({ message: "Error uploading QRIS proof", error: uploadErr });
      }
    }

    const saleData = {
      invoice,
      employeeId,
      date,
      method,
      subtotal,
      discount,
      total,
      payment,
      change,
      details,
      proofQris,
    };

    Sale.CreateSale(saleData, (err, newSale) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating sale", error: err });
      }
      res.status(201).json(newSale);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getSale,
  getSaleDetail,
  createSale,
};
