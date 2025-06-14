const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateToken = require("../middlewares/auth");
const { notificationCache } = require("../middlewares/notificationCache");
const multer = require("multer");

const upload = multer();

// Routes
router.get("/", authenticateToken, employeeController.getEmployee);
router.get("/:id", authenticateToken, employeeController.getEmployeeById);

// Use multer middleware to handle file upload on create and update
router.post(
  "/",
  authenticateToken,
  upload.single("profilePicture"),
  employeeController.createEmployee
);
router.put(
  "/:id",
  authenticateToken,
  upload.single("profilePicture"),
  employeeController.updateEmployee
);

router.delete("/:id", authenticateToken, employeeController.deleteEmployee);
router.post("/login", employeeController.loginEmployee);

// Notification routes with caching
router.get("/notifications/summary", authenticateToken, notificationCache, employeeController.getNotifications);
router.get("/notifications/transactions/today", authenticateToken, notificationCache, employeeController.getTodayTransactions);
router.get("/notifications/products/low-stock", authenticateToken, notificationCache, employeeController.getLowStockProducts);
router.get("/notifications/purchases/pending", authenticateToken, notificationCache, employeeController.getPendingPurchasesNotification);

module.exports = router;
