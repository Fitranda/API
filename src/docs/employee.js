module.exports = {
  "/api/employee/login": {
    post: {
      tags: ["Employee"],
      summary: "Login an employee",
      security: [],
      description:
        "Authenticate an employee using their username and password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string", example: "bagas123" },
                password: { type: "string", example: "password123" },
              },
              required: ["username", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              example: {
                message: "Login successful",
                employee: {
                  employeeId: 1,
                  employeeName: "John Doe",
                  address: "123 Main St",
                  contact: "1234567890",
                  username: "johndoe",
                  role: "Manager",
                  storename: "Store A",
                  profilePicture: "https://example.com/images/johndoe.jpg",
                  status: 1,
                },
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
        },
        400: {
          description: "Validation error",
          content: {
            "application/json": {
              example: {
                message: "Username dan password harus diisi",
              },
            },
          },
        },
        401: {
          description: "Invalid username or password",
          content: {
            "application/json": {
              example: {
                message: "Invalid username or password",
              },
            },
          },
        },
        500: {
          description: "Error during login",
          content: {
            "application/json": {
              example: {
                message: "Error during login",
                error: "Database connection failed",
              },
            },
          },
        },
      },
    },
  },

  "/api/employee": {
    get: {
      tags: ["Employee"],
      summary: "Get all employees",
      description: "Retrieve a list of all employees with optional filters.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "employeeName",
          in: "query",
          description: "Filter by employee name",
          required: false,
          schema: { type: "string" },
        },
        {
          name: "role",
          in: "query",
          description: "Filter by role",
          required: false,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "List of employees retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  employeeId: 1,
                  employeeName: "John Doe",
                  address: "123 Main St",
                  contact: "1234567890",
                  username: "johndoe",
                  role: "Manager",
                  storename: "Store A",
                  profilePicture: "https://example.com/images/johndoe.jpg",
                  status: 1,
                },
              ],
            },
          },
        },
        500: { description: "Error fetching data" },
      },
    },

    post: {
      tags: ["Employee"],
      summary: "Create a new employee",
      description: "Add a new employee to the system.",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                employeeName: { type: "string" },
                address: { type: "string" },
                contact: { type: "string" },
                username: { type: "string" },
                password: { type: "string" },
                role: { type: "string" },
                storename: { type: "string" },
                profilePicture: { type: "string", format: "uri" },
              },
              required: ["employeeName", "username", "password"],
              example: {
                employeeName: "John Doe",
                address: "123 Main St",
                contact: "1234567890",
                username: "johndoe",
                password: "Password123!",
                role: "Manager",
                storename: "Store A",
                profilePicture: "https://example.com/images/johndoe.jpg",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Employee created successfully",
          content: {
            "application/json": {
              example: {
                employeeId: 1,
                employeeName: "John Doe",
                address: "123 Main St",
                contact: "1234567890",
                username: "johndoe",
                role: "Manager",
                storename: "Store A",
                profilePicture: "https://example.com/images/johndoe.jpg",
              },
            },
          },
        },
        400: { description: "Validation error" },
        500: { description: "Error creating employee" },
      },
    },
  },

  "/api/employee/{id}": {
    get: {
      tags: ["Employee"],
      summary: "Get employee by ID",
      description: "Retrieve details of a specific employee by their ID.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the employee to retrieve",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Employee data retrieved successfully",
          content: {
            "application/json": {
              example: {
                employeeId: 1,
                employeeName: "John Doe",
                address: "123 Main St",
                contact: "1234567890",
                username: "johndoe",
                role: "Manager",
                storename: "Store A",
                profilePicture: "https://example.com/images/johndoe.jpg",
                status: 1,
              },
            },
          },
        },
        404: {
          description: "Employee not found",
          content: {
            "application/json": {
              example: {
                message: "Employee not found",
              },
            },
          },
        },
        500: {
          description: "Error fetching employee",
          content: {
            "application/json": {
              example: {
                message: "Error fetching employee",
                error: "Database error message here",
              },
            },
          },
        },
      },
    },

    put: {
      tags: ["Employee"],
      summary: "Update an employee",
      description: "Update an existing employee by ID.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the employee to update",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                employeeName: { type: "string" },
                address: { type: "string" },
                contact: { type: "string" },
                username: { type: "string" },
                password: { type: "string" },
                role: { type: "string" },
                storename: { type: "string" },
                profilePicture: { type: "string", format: "uri" },
              },
              example: {
                employeeName: "John Doe",
                address: "123 Main St",
                contact: "1234567890",
                username: "johndoe",
                password: "Password123!",
                role: "Manager",
                storename: "Store A",
                profilePicture: "https://example.com/images/johndoe.jpg",
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Employee updated successfully" },
        400: { description: "Validation error" },
        404: { description: "Employee not found" },
        500: { description: "Error updating employee" },
      },
    },

    delete: {
      tags: ["Employee"],
      summary: "Delete an employee",
      description:
        "Delete an employee by ID. If the employee is used in other tables, their status will be updated to inactive.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the employee to delete",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Employee deleted or status updated successfully",
        },
        404: { description: "Employee not found" },
        500: { description: "Error deleting employee" },      },
    },
  },
  "/api/employee/notifications/summary": {
    get: {
      tags: ["Employee", "Notifications"],
      summary: "Get notifications summary",
      description: "Get summary of today's transactions, low stock products, and pending purchases for dashboard notifications.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Notifications summary retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  type: "transaction",
                  title: "Transaksi hari ini",
                  message: "5 transaksi tercatat hari ini",
                  count: 5,
                  date: "2025-06-14"
                },
                {
                  type: "low_stock",
                  title: "Stok rendah",
                  message: "3 produk dengan stok di bawah 5",
                  count: 3,
                  date: "2025-06-14"
                },
                {
                  type: "purchase_pending",
                  title: "Purchase pending",
                  message: "2 purchase menunggu approval",
                  count: 2,
                  date: "2025-06-14"
                }
              ]
            }
          }
        },
        500: { description: "Error fetching notifications" }
      }
    }
  },
  "/api/employee/notifications/transactions/today": {
    get: {
      tags: ["Employee", "Notifications"],
      summary: "Get today's transactions",
      description: "Get detailed list of today's transactions for notifications.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Today's transactions retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  saleId: 1,
                  invoice: "INV001",
                  date: "2025-06-14T10:30:00.000Z",
                  total: 150000,
                  employeeName: "John Doe",
                  itemCount: 3
                },
                {
                  saleId: 2,
                  invoice: "INV002", 
                  date: "2025-06-14T14:15:00.000Z",
                  total: 75000,
                  employeeName: "Jane Smith",
                  itemCount: 2
                }
              ]
            }
          }
        },
        500: { description: "Error fetching today's transactions" }
      }
    }
  },
  "/api/employee/notifications/products/low-stock": {
    get: {
      tags: ["Employee", "Notifications"],
      summary: "Get low stock products",
      description: "Get list of products with stock below 5 for notifications.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Low stock products retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  productId: 1,
                  productName: "AMINO Magnetic Case for iPhone",
                  stock: 2,
                  price: 35000
                },
                {
                  productId: 5,
                  productName: "PixelShield Tempered Glass",
                  stock: 4,
                  price: 15000
                }
              ]
            }
          }
        },
        500: { description: "Error fetching low stock products" }
      }
    }
  },
  "/api/employee/notifications/purchases/pending": {
    get: {
      tags: ["Employee", "Notifications"],
      summary: "Get pending purchases",
      description: "Get list of purchases waiting for approval for notifications.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Pending purchases retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  purchaseId: 1,
                  invoice: "PUR001",
                  date: "2025-06-14T09:00:00.000Z",
                  total: 500000,
                  employeeName: "John Doe",
                  status: "Pending"
                },
                {
                  purchaseId: 2,
                  invoice: "PUR002",
                  date: "2025-06-14T11:30:00.000Z", 
                  total: 300000,
                  employeeName: "Jane Smith",
                  status: "Pending"
                }
              ]
            }
          }
        },
        500: { description: "Error fetching pending purchases" }
      }
    }
  },
};
