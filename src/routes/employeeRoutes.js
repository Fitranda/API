const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateToken = require("../middlewares/auth");

router.get("/",authenticateToken ,employeeController.getEmployee);
router.post("/",authenticateToken , employeeController.createEmployee);
router.put("/:id",authenticateToken , employeeController.updateEmployee);
router.delete("/:id",authenticateToken , employeeController.deleteEmployee);
router.post("/login", employeeController.loginEmployee);

module.exports = router;
