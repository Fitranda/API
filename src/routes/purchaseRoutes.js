const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const authenticateToken = require("../middlewares/auth");

router.get("/",authenticateToken ,purchaseController.getPurchase);
router.post("/",authenticateToken , purchaseController.CreatePurchase);

module.exports = router;
