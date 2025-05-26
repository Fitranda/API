const Sale = require("../models/Sale");

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
      discountPercent, // baru: diskon dalam persen dari frontend
      total,
      payment,
      change,
      details,
    } = req.body;

    // Validasi input
    if (!invoice) {
      return res.status(400).json({ message: "Invoice harus diisi" });
    }
    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID harus diisi" });
    }
    if (!date) {
      return res.status(400).json({ message: "Tanggal harus diisi" });
    }
    if (!method) {
      return res.status(400).json({ message: "Metode pembayaran harus diisi" });
    }
    if (!Array.isArray(details) || details.length === 0) {
      return res.status(400).json({ message: "Pilih produk terlebih dahulu" });
    }
    if (
      typeof discountPercent !== "number" ||
      discountPercent < 0 ||
      discountPercent > 100
    ) {
      discountPercent = 0;
    }

    const discount = (subtotal * discountPercent) / 100;

    total = subtotal - discount;

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
