const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const authenticateToken = require("../middlewares/auth");

router.get("/",authenticateToken ,supplierController.getSupplier);
router.post("/",authenticateToken , supplierController.createSupplier);
router.put("/:id",authenticateToken , supplierController.updateSupplier);
router.delete("/:id",authenticateToken , supplierController.deleteSupplier);

module.exports = router;
