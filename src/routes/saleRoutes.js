const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");

const upload = multer();

router.get("/", authenticateToken, saleController.getSale);
router.get("/:id", authenticateToken, saleController.getSaleDetail);
router.post(
  "/",
  authenticateToken,
  upload.single("proofQris"),
  saleController.createSale
);

module.exports = router;
