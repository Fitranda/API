// const pegawaiDocs = require("./pegawai");
// const barangDocs = require("./barang");
// const penjualanDocs = require("./penjualan");
// const peranDocs = require("./peran");
const employeeDocs = require("./employee");

module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Frenz API",
    "version": "1.0.0",
    "description": "Dokumentasi API Frenz"
  },
  "host": "localhost:5000",
  "schemes": ["http"],
  "paths": {
    ...employeeDocs,
  },
  "definitions": {
    "Employee": {
      "type": "object",
      "properties": {
        "employeeId": {
          "type": "integer",
          "example": 1,
          "description": "Unique identifier for the employee"
        },
        "employeeName": {
          "type": "string",
          "example": "John Doe",
          "description": "Name of the employee"
        },
        "address": {
          "type": "string",
          "example": "123 Main St",
          "description": "Address of the employee"
        },
        "contact": {
          "type": "string",
          "example": "1234567890",
          "description": "Contact number of the employee"
        },
        "username": {
          "type": "string",
          "example": "johndoe",
          "description": "Username for the employee's account"
        },
        "password": {
          "type": "string",
          "example": "Password123!",
          "description": "Password for the employee's account"
        },
        "basicSalary": {
          "type": "number",
          "example": 5000.00,
          "description": "Basic salary of the employee"
        },
        "role": {
          "type": "string",
          "example": "Manager",
          "description": "Role of the employee"
        },
        "storename": {
          "type": "string",
          "example": "Store A",
          "description": "Store name where the employee works"
        },
        "status": {
          "type": "integer",
          "example": 1,
          "description": "Status of the employee (1 = active, 2 = inactive)"
        }
      },
      "required": ["employeeName", "username", "password", "role"]
    }
  }
};
