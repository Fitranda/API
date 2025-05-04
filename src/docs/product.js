module.exports = {
  "/api/product": {
    get: {
      tags: ["Product"],
      summary: "Get all products",
      description: "Retrieve a list of all product with optional filters.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "productName",
          in: "query",
          description: "Filter by product name",
          required: false,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "List of product retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  productId: 1,
                  productName: "AMINO Magnetic Case Untuk Iphone 11 Pro Max",
                  price: 35000,
                  stock: 20,
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
      tags: ["Product"],
      summary: "Create a new product",
      description: "Add a new product to the system.",
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
              productName: "AMINO Magnetic Case Untuk Iphone 11 ",
              price: 35000,
              stock: 20,
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              example: {
                productId: 1,
                productName: "AMINO Magnetic Case Untuk Iphone 11 Pro Max",
                price: 35000,
                stock: 20,
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
  "/api/product/{id}": {
    put: {
      tags: ["Product"],
      summary: "Update an product",
      description: "Update an existing product by ID.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the product to update",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            example: {
              productName: "AMINO Magnetic Case Untuk Iphone 11 Pro Max",
              price: 35000,
              stock: 20,
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
        },
        400: {
          description: "Validation error",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Error updating product",
        },
      },
    },
    delete: {
      tags: ["Product"],
      summary: "Delete an product",
      description: "Delete an product by ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the product to delete",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Product deleted",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Error deleting product",
        },
      },
    },
  },
};
