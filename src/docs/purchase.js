module.exports = {
  "/api/purchase": {
    get: {
      tags: ["Purchase"],
      summary: "Get all purchase",
      description: "Retrieve a list of all purchase with optional filters.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "supplierName",
          in: "query",
          description: "Filter by supplier name",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "employeeName",
          in: "query",
          description: "Filter by employee name",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "date",
          in: "query",
          description: "Filter by date purchase",
          required: false,
          schema: {
            type: "date",
          },
        },
        {
          name: "productName",
          in: "query",
          description: "Filter by product name",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "invoice",
          in: "query",
          description: "Filter by invoice number",
          required: false,
          schema: {
            type: "string",
          },
        },
        {
          name: "status",
          in: "query",
          description: "Filter by status (Pending, Approve, Reject)",
          required: false,
          schema: {
            type: "string",
            enum: ["Pending", "Approve", "Reject"],
          },
        },
      ],
      responses: {
        200: {
          description: "List of supplier retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  purchaseDetailId: 1,
                  productId: 1,
                  quantity: 4,
                  price: 35000,
                  subtotaldetail: 140000,
                  purchaseId: 1,
                  invoice: "INV001",
                  employeeId: 1,
                  supplierId: 1,
                  date: "2025-05-05 00:00:00",
                  subtotal: 140000,
                  discount: 0,
                  total: 140000,
                  status: "Pending",
                  employeeName: "John Doe",
                  supplierName: "Robot",
                  productName: "AMINO Magnetic Case Untuk Iphone 11 Pro Max",
                },
              ],
            },
          },
        },
        500: {
          description: "Error fetching data",
        },
      },
    },
    post: {
      tags: ["Purchase"],
      summary: "Create a new purchase request",
      description:
        "Employee submits a purchase request with pending status for supervisor approval.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              detail: [
                {
                  productId: 1,
                  quantity: 4,
                  price: 35000,
                  subtotal: 140000,
                },
              ],
              invoice: "INV001",
              employeeId: 1,
              date: "2025-05-05 00:00:00",
              subtotal: 140000,
              discount: 0,
              total: 140000,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Purchase request submitted successfully",
          content: {
            "application/json": {
              example: {
                message:
                  "Purchase request submitted successfully. Waiting for supervisor approval.",
                data: {
                  purchaseId: 1,
                  invoice: "INV001",
                  employeeId: 1,
                  status: "Pending",
                  date: "2025-05-05 00:00:00",
                  subtotal: 140000,
                  discount: 0,
                  total: 140000,
                },
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Error creating purchase request",
        },
      },
    },
  },
  "/api/purchase/pending": {
    get: {
      tags: ["Purchase"],
      summary: "Get pending purchases (Supervisor only)",
      description:
        "Retrieve a list of all purchase requests with pending status for supervisor approval.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "List of pending purchases retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  purchaseId: 1,
                  invoice: "INV001",
                  employeeId: 1,
                  date: "2025-05-05 00:00:00",
                  subtotal: 140000,
                  discount: 0,
                  total: 140000,
                  status: "Pending",
                  employeeName: "John Doe",
                },
              ],
            },
          },
        },
        500: {
          description: "Error fetching pending purchases",
        },
      },
    },
  },
  "/api/purchase/{id}": {
    get: {
      tags: ["Purchase"],
      summary: "Get purchase by ID",
      description:
        "Retrieve a specific purchase by its ID for approval process.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Purchase ID",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Purchase details retrieved successfully",
          content: {
            "application/json": {
              example: {
                purchaseId: 1,
                invoice: "INV001",
                employeeId: 1,
                supplierId: null,
                date: "2025-05-05 00:00:00",
                subtotal: 140000,
                discount: 0,
                total: 140000,
                status: "Pending",
                employeeName: "John Doe",
                supplierName: null,
              },
            },
          },
        },
        404: {
          description: "Purchase not found",
        },
        500: {
          description: "Error fetching purchase",
        },
      },
    },
  },
  "/api/purchase/{id}/approve": {
    put: {
      tags: ["Purchase"],
      summary: "Approve purchase (Supervisor only)",
      description:
        "Supervisor approves a purchase request and assigns a supplier.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Purchase ID",
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                supplierId: {
                  type: "integer",
                  description: "Supplier ID to assign to this purchase",
                },
              },
              required: ["supplierId"],
            },
            example: {
              supplierId: 1,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Purchase approved successfully",
          content: {
            "application/json": {
              example: {
                message: "Purchase approved successfully",
                purchaseId: 1,
                supplierId: 1,
              },
            },
          },
        },
        400: {
          description: "Supplier ID is required",
        },
        404: {
          description: "Purchase not found",
        },
        500: {
          description: "Error approving purchase",
        },
      },
    },
  },
  "/api/purchase/{id}/reject": {
    put: {
      tags: ["Purchase"],
      summary: "Reject purchase (Supervisor only)",
      description: "Supervisor rejects a purchase request.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Purchase ID",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Purchase rejected successfully",
          content: {
            "application/json": {
              example: {
                message: "Purchase rejected successfully",
                purchaseId: 1,
              },
            },
          },
        },
        404: {
          description: "Purchase not found",
        },
        500: {
          description: "Error rejecting purchase",
        },
      },
    },
  },
};
