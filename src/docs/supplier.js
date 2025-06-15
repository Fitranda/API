module.exports = {
  "/api/supplier": {
    get: {
      tags: ["Supplier"],
      summary: "Get all suppliers",
      description: "Retrieve a list of all supplier with optional filters.",
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
          name: "contact",
          in: "query",
          description: "Filter by contact",
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
                  supplierId: 1,
                  supplierName: "John Doe",
                  contact: "1234567890",
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
      tags: ["Supplier"],
      summary: "Create a new supplier",
      description: "Add a new supplier to the system.",
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
              supplierName: "Robot",
              contact: "1234567890",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Supplier created successfully",
          content: {
            "application/json": {
              example: {
                supplierId: 1,
                supplierName: "Robot",
                contact: "1234567890",
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Error creating supplier",
        },      },
    },
  },
  "/api/supplier/{id}": {
    get: {
      tags: ["Supplier"],
      summary: "Get supplier by ID",
      description: "Retrieve a specific supplier by their ID.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the supplier to retrieve",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Supplier retrieved successfully",
          content: {
            "application/json": {
              example: {
                supplierId: 1,
                supplierName: "John Doe",
                contact: "1234567890",
              },
            },
          },
        },
        404: {
          description: "Supplier not found",
        },
        500: {
          description: "Error fetching supplier",
        },
      },
    },
    put: {
      tags: ["Supplier"],
      summary: "Update an supplier",
      description: "Update an existing supplier by ID.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the supplier to update",
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
              supplierName: "Robot",
              contact: "1234567890",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Supplier updated successfully",
        },
        400: {
          description: "Validation error",
        },
        404: {
          description: "Supplier not found",
        },
        500: {
          description: "Error updating supplier",
        },
      },
    },
    delete: {
      tags: ["Supplier"],
      summary: "Delete an supplier",
      description:
        "Delete an supplier by ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of the supplier to delete",
          required: true,
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        200: {
          description: "Supplier deleted",
        },
        404: {
          description: "Supplier not found",
        },
        500: {
          description: "Error deleting supplier",
        },
      },
    },
  },
};