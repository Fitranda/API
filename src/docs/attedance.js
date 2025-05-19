module.exports = {
  "/api/attedance": {
    get: {
      tags: ["Attedance"],
      summary: "Get all Attedance",
      description: "Retrieve a list of attedance sale with optional filters.",
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
      ],
      responses: {
        200: {
          description: "List of attedance retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  attendanceId: 1,
                  employeeId: 1,
                  date: "2025-05-05 00:00:00",
                  photo: "20212 - ios.jpg",
                  latitude: -6.193125,
                  longitude: 106.82181,
                  status: "Present",
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
      tags: ["Attedance"],
      summary: "Create a new attedance",
      description: "Add a new attedance to the system.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                employeeId: {
                  type: "integer",
                  description: "ID of the employee",
                },
                date: {
                  type: "string",
                  format: "date-time",
                  description: "Date of the attedance",
                },
                photo: {
                  type: "string",
                  description:
                    "Base64-encoded photo string or image URL (instead of file upload)",
                },
                latitude: {
                  type: "number",
                  format: "float",
                  description: "Latitude of the location",
                },
                longitude: {
                  type: "number",
                  format: "float",
                  description: "Longitude of the location",
                },
                status: {
                  type: "string",
                  description:
                    "Status of the attedance (e.g., Present, Absent)",
                },
              },
              required: [
                "employeeId",
                "date",
                "photo",
                "latitude",
                "longitude",
                "status",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Attedance created successfully",
          content: {
            "application/json": {
              example: {
                attendanceId: 1,
                employeeId: 1,
                date: "2025-05-05T00:00:00Z",
                photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…",
                latitude: -6.193125,
                longitude: 106.82181,
                status: "Present",
              },
            },
          },
        },
        400: {
          description: "Validation error",
        },
        500: {
          description: "Error creating attedance",
        },
      },
    },
  },
};
