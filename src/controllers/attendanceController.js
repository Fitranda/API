const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { imageUpload } = require("../utils/imagekit");

// Helper function to format date as "YYYY-MM-DD"
const formatDate = (isoString) => {
  const d = new Date(isoString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to format time as "HH:mm:ss"
const formatTime = (isoString) => {
  const d = new Date(isoString);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Get all attendance (optionally filtered by employeeId or date)
async function getAttendance(req, res) {
  try {
    const filter = req.query || {};
    Attendance.getAttendance(filter, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching attendance", error: err });
      }

      const formattedResults = results.map((record) => ({
        ...record,
        date: formatDate(record.date),
        // Assuming time field is stored as a string like "HH:mm:ss" or as a Date object
        time: record.time ? record.time : null,
      }));

      res.json(formattedResults);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new attendance
async function createAttendance(req, res) {
  try {
    const { employeeId, date, latitude, longitude } = req.body;

    if (!employeeId || !date || !latitude || !longitude) {
      return res.status(400).json({
        message: "employeeId, date, latitude, and longitude are required",
      });
    }

    // Get current time as "HH:mm:ss"
    const now = new Date();
    const time = now.toTimeString().split(" ")[0]; // "HH:mm:ss"

    // Check if employee exists
    Employee.getEmployeeById(employeeId, async (err, employee) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking employee", error: err });
      }

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      let photo = null;
      if (req.file) {
        try {
          photo = await imageUpload(req.file);
        } catch (uploadErr) {
          return res
            .status(500)
            .json({ message: "Error uploading photo", error: uploadErr });
        }
      }

      const data = {
        employeeId,
        date,
        time, // set here automatically
        photo,
        latitude,
        longitude,
        status: "Present", // default
      };

      Attendance.createAttendance(data, (err, newAttendance) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error creating attendance", error: err });
        }
        newAttendance.date = formatDate(newAttendance.date);
        res.status(201).json(newAttendance);
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAttendance,
  createAttendance,
};
