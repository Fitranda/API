const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer();

app.use(upload.any())
// Import routes
const pegawaiRoutes = require("./src/routes/pegawaiRoutes");
const peranRoutes = require("./src/routes/peranRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

// Gunakan routes
app.use("/api/pegawai", pegawaiRoutes);
app.use("/api/peran", peranRoutes);
app.use("/api/employee", employeeRoutes);

// Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
