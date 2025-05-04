const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middlewares/auth");

router.get("/",authenticateToken ,productController.getProduct);
router.post("/",authenticateToken , productController.CreateProduct);
router.put("/:id",authenticateToken , productController.updateProduct);
router.delete("/:id",authenticateToken , productController.deleteProduct);

module.exports = router;
