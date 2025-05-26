const db = require("../config/db");

class Attendance {
  static getAttendance(search, callback) {
    let query = `SELECT * FROM Attendance WHERE status = "Present"`;
    let params = [];

    if (search.employeeId) {
      query += " AND employeeId = ?";
      params.push(search.employeeId);
    }

    if (search.date) {
      query += " AND date = ?";
      params.push(search.date);
    }

    if (search.time) {
      query += " AND time = ?";
      params.push(search.time);
    }

    db.query(query, params, callback);
  }

  static createAttendance(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.employeeId) {
      fields.push("employeeId");
      values.push("?");
      params.push(data.employeeId);
    }
    if (data.date) {
      fields.push("date");
      values.push("?");
      params.push(data.date);
    }
    if (data.time) {
      fields.push("time");
      values.push("?");
      params.push(data.time);
    }
    if (data.photo) {
      fields.push("photo");
      values.push("?");
      params.push(data.photo);
    }
    if (data.latitude) {
      fields.push("latitude");
      values.push("?");
      params.push(data.latitude);
    }
    if (data.longitude) {
      fields.push("longitude");
      values.push("?");
      params.push(data.longitude);
    }

    // Default status to 'Present'
    fields.push("status");
    values.push("?");
    params.push(data.status || "Present");

    const query = `INSERT INTO Attendance (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) return callback(err, null);
      const newData = { attendanceId: result.insertId, ...data };
      return callback(null, newData);
    });
  }
}

module.exports = Attendance;
