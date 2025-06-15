const db = require("../config/db");

class Attendance {
  static getAttedance(search, callback) {
    let query = `SELECT 
    a.attendanceId,a.employeeId,a.date,a.photo,a.latitude,a.longitude,a.status,b.employeeName from attendance a
    Left Join employee b on a.employeeId = b.employeeId
    WHERE true`;

    let params = [];

    if (search.date) {
      query += " AND a.date between ?";
      params.push(`${search.date} 00:00:00 AND ${search.date} 23:59:59`);
    }

    if (search.employeeName) {
      query += " AND b.employeeName LIKE ?";
      params.push(`%${search.employeeName}%`);
    }

    db.query(query, params, callback);
  }

  static CreateAttedance(data, callback) {
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
    if (data.status) {
      fields.push("status");
      values.push("?");
      params.push(data.status);
    }

    const query = `INSERT INTO attendance (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
    

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { attendanceId: result.insertId, ...data };
      return callback(null, newData);
    });
  }
}

module.exports = Attendance;
