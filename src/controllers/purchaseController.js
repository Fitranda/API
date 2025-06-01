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

// Create a new purchase request (employee submits with pending status)
async function CreatePurchase(req, res) {
  try {
    const {
      invoice,
      employeeId,
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
    
    // Set status to pending and no supplier initially
    const purchaseData = {
      ...req.body,
      status: 'Pending',
      supplierId: null
    };

    // Create purchase
    Purchase.CreatePurchase(purchaseData, (err, newPurchase) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating purchase", error: err });
      res.status(201).json({
        message: "Purchase request submitted successfully. Waiting for supervisor approval.",
        data: newPurchase
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get pending purchases for supervisor
async function getPendingPurchases(req, res) {
  try {
    Purchase.getPendingPurchases((err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching pending purchases", error: err });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get purchase by ID for approval
async function getPurchaseById(req, res) {
  try {
    const { id } = req.params;
    Purchase.getPurchaseById(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching purchase", error: err });
        return;
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Approve purchase (supervisor only)
async function approvePurchase(req, res) {
  try {
    const { id } = req.params;
    const { supplierId } = req.body;

    // Validation
    if (!supplierId) {
      return res.status(400).json({
        message: "Supplier ID harus dipilih untuk approve purchase"
      });
    }

    Purchase.approvePurchase(id, supplierId, (err, result) => {
      if (err) {
        return res.status(500).json({ 
          message: "Error approving purchase", 
          error: err 
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json({ 
        message: "Purchase approved successfully",
        purchaseId: id,
        supplierId: supplierId
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Reject purchase (supervisor only)
async function rejectPurchase(req, res) {
  try {
    const { id } = req.params;

    Purchase.rejectPurchase(id, (err, result) => {
      if (err) {
        return res.status(500).json({ 
          message: "Error rejecting purchase", 
          error: err 
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json({ 
        message: "Purchase rejected successfully",
        purchaseId: id
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getPurchase,
  CreatePurchase,
  getPendingPurchases,
  getPurchaseById,
  approvePurchase,
  rejectPurchase,
};
