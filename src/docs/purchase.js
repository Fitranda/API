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
      summary: "Create a new purchase",
      description: "Add a new purchase to the system.",
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
              detail:[
                {
                  productId: 1,
                  quantity: 4,
                  price: 35000,
                  subtotaldetail: 140000,
                }
              ],
              invoice: "INV001",
              employeeId: 1,
              supplierId: 1,
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
          description: "Purchase created successfully",
          content: {
            "application/json": {
              example: {
                invoice: "INV001",
                employeeId: 1,
                supplierId: 1,
                date: "2025-05-05 00:00:00",
                subtotal: 140000,
                discount: 0,
                total: 140000,
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Error creating supplier",
        },
      },
    },
  },
};
