const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const authenticateToken = require("../middlewares/auth");
const supervisorAuth = require("../middlewares/supervisorAuth");

// Basic purchase routes
router.get("/", authenticateToken, purchaseController.getPurchase);
router.post("/", authenticateToken, purchaseController.CreatePurchase);

// Approval routes for supervisor
router.get("/pending", authenticateToken, purchaseController.getPendingPurchases);
router.get("/:id", authenticateToken, purchaseController.getPurchaseById);
router.put("/:id/approve", authenticateToken, purchaseController.approvePurchase);
router.put("/:id/reject", authenticateToken, purchaseController.rejectPurchase);

module.exports = router;
