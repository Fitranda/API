const Product = require("../models/Product");

// Get all employees
async function getProduct(req, res) {
  try {
    const filter = req.query || {};
    Product.getProduct(filter, (err, results) => {
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
async function CreateProduct(req, res) {
  try {
    const { productName, price, stock } = req.body;

    // Validation
    if (!productName || productName.length > 255) {
      return res.status(400).json({
        message: "Nama supplier harus diisi dan maksimal 255 karakter",
      });
    }
    if (!price) {
      return res.status(400).json({ message: "Harga tidak boleh kosong" });
    }

    if (!stock) {
      return res.status(400).json({ message: "Stok tidak boleh kosong" });
    }

    // Create employee
    Product.CreateProduct(req.body, (err, newProduct) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating product", error: err });
      res.status(201).json(newProduct);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update an employee by ID
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { productName, price, stock } = req.body;

    // Validation
    if (productName && productName.length > 255) {
      return res.status(400).json({
        message: "Nama produk maksimal 255 karakter",
      });
    }

    Product.updateProduct(id, req.body, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating product", error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product updated successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete an employee by ID
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    Product.deleteProduct(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting product", error: err });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProduct,
  CreateProduct,
  updateProduct,
  deleteProduct,
};
