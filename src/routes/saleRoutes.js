const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const authenticateToken = require("../middlewares/auth");

router.get("/", authenticateToken, saleController.getSale);
router.get("/:id", authenticateToken, saleController.getSaleDetail);
router.post("/", authenticateToken, saleController.createSale);

module.exports = router;
