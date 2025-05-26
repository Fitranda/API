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
        500: { description: "Error deleting employee" },
      },
    },
  },
};
