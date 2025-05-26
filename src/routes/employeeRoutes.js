const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateToken = require("../middlewares/auth");
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

module.exports = router;
