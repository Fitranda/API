const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Import routes
const pegawaiRoutes = require("./src/routes/pegawaiRoutes");
const peranRoutes = require("./src/routes/peranRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
const supplierRoutes = require("./src/routes/supplierRoutes");
const productRoutes = require("./src/routes/productRoutes");
const purchaseRoutes = require("./src/routes/purchaseRoutes");
const saleRoutes = require("./src/routes/saleRoutes.js")
const attedanceRoutes = require("./src/routes/uploadRoutes");

// Gunakan routes
app.use("/api/pegawai", pegawaiRoutes);
app.use("/api/peran", peranRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/product", productRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/attedance", attedanceRoutes);

// Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
