module.exports = {
  "/api/sale": {
    get: {
      tags: ["Sale"],
      summary: "Get all sale",
      description: "Retrieve a list of all sale with optional filters.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
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
          description: "List of sale retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  saleDetailId: 1,
                  productId: 1,
                  quantity: 4,
                  price: 35000,
                  subtotaldetail: 140000,
                  saleId: 1,
                  invoice: "INV001",
                  employeeId: 1,
                  date: "2025-05-05 00:00:00",
                  subtotal: 140000,
                  discount: 0,
                  total: 140000,
                  payment:150000,
                  change:10000,
                  employeeName: "John Doe",
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
      tags: ["Sale"],
      summary: "Create a new sale",
      description: "Add a new sale to the system.",
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
                  subtotal: 140000,
                }
              ],
              invoice: "INV001",
              employeeId: 1,
              date: "2025-05-05 00:00:00",
              subtotal: 140000,
              discount: 0,
              total: 140000,
              payment:150000,
              change:10000
            },
          },
        },
      },
      responses: {
        201: {
          description: "Sale created successfully",
          content: {
            "application/json": {
              example: {
                invoice: "INV001",
                employeeId: 1,
                date: "2025-05-05 00:00:00",
                subtotal: 140000,
                discount: 0,
                total: 140000,
                payment:150000,
                change:10000
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
