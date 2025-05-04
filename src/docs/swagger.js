const employeeDocs = require("./employee");
// const pegawaiDocs = require("./pegawai");
// const peranDocs = require("./peran");
const supplierDocs = require("./supplier");
const productDocs = require("./product");
const purchaseDocs = require("./purchase");
const saleDocs = require("./sale");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Frenz API",
    version: "1.0.0",
    description: "Documentation API Frenz",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "input token with format: Bearer <token>",
      },
    },
  },
  security: [{ BearerAuth: [] }],
  paths: {
    ...employeeDocs,
    ...supplierDocs,
    ...productDocs,
    ...purchaseDocs,
    ...saleDocs,
    // ...pegawaiDocs,
    // ...peranDocs,
  },
};