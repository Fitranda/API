const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Employee {
  static getEmployee(search, callback) {
    let query = `
            SELECT 
    employeeId,
    employeeName,
    address,
    contact,
    username,
    password,
    basicSalary,
    role,
    storename,
    status
FROM Employee WHERE status = 1
        `;

    let params = [];

    if (search.employeeName) {
      query += " AND employeeName LIKE ?";
      params.push(`%${search.employeeName}%`);
    }

    if (search.address) {
      query += " AND address LIKE ?";
      params.push(`%${search.address}%`);
    }

    if (search.kontak) {
      query += " AND kontak LIKE ?";
      params.push(`%${search.kontak}%`);
    }

    if (search.contact) {
      query += " AND contact LIKE ?";
      params.push(`%${search.contact}%`);
    }

    if (search.role) {
      query += " AND role = ?";
      params.push(search.role);
    }

    if (search.storename) {
      query += " AND storename = ?";
      params.push(search.storename);
    }

    db.query(query, params, callback);
  }

  static CreateEmployee(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.employeeName) {
      fields.push("employeeName");
      values.push("?");
      params.push(data.employeeName);
    }
    if (data.address) {
      fields.push("address");
      values.push("?");
      params.push(data.address);
    }
    if (data.contact) {
      fields.push("contact");
      values.push("?");
      params.push(data.contact);
    }
    if (data.username) {
      fields.push("username");
      values.push("?");
      params.push(data.username);
    }
    if (data.password) {
      fields.push("password");
      values.push("?");
      params.push(bcrypt.hashSync(data.password, 10));
    }
    if (data.role) {
      fields.push("role");
      values.push("?");
      params.push(data.role);
    }
    if (data.storename) {
      fields.push("storename");
      values.push("?");
      params.push(data.storename);
    }

    const query = `INSERT INTO Employee (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { employeeId: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  static deleteEmployee(employeeId, callback) {
    const queryCheckUsage = `
      SELECT 
        (SELECT COUNT(*) FROM Attendance WHERE employeeId = ?) AS attendanceCount,
        (SELECT COUNT(*) FROM Sale WHERE employeeId = ?) AS saleCount,
        (SELECT COUNT(*) FROM Purchase WHERE employeeId = ?) AS purchaseCount
    `;
  
    db.query(queryCheckUsage, [employeeId, employeeId, employeeId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
  
      const usage = results[0];
      const { attendanceCount, saleCount, purchaseCount } = usage;
  
      if (attendanceCount > 0 || saleCount > 0 || purchaseCount > 0) {
        // Jika digunakan, update status menjadi 2
        const queryUpdateStatus = "UPDATE Employee SET status = 2 WHERE employeeId = ?";
        db.query(queryUpdateStatus, [employeeId], (err, result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, { message: "Employee status updated to 2 (inactive)" });
        });
      } else {
        // Jika tidak digunakan, hapus permanen
        const queryDelete = "DELETE FROM Employee WHERE employeeId = ?";
        db.query(queryDelete, [employeeId], (err, result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, { message: "Employee deleted permanently" });
        });
      }
    });
  }

  static updateEmployee(employeeId, data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.employeeName) {
      fields.push("employeeName = ?");
      params.push(data.employeeName);
    }
    if (data.address) {
      fields.push("address = ?");
      params.push(data.address);
    }
    if (data.contact) {
      fields.push("contact = ?");
      params.push(data.contact);
    }
    if (data.username) {
      fields.push("username = ?");
      params.push(data.username);
    }
    if (data.password) {
      fields.push("password = ?");
      params.push(bcrypt.hashSync(data.password, 10));
    }
    if (data.role) {
      fields.push("role = ?");
      params.push(data.role);
    }
    if (data.storename) {
      fields.push("storename = ?");
      params.push(data.storename);
    }

    const query = `UPDATE Employee SET ${fields.join(", ")} WHERE employeeId = ?`;
    params.push(employeeId);

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  static login(username, password, callback) {
    const query = "SELECT * FROM Employee WHERE username = ? AND status = 1";
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, { success: false, message: "User not found" });
      }
      const employee = results[0];
      const isPasswordValid = bcrypt.compareSync(password, employee.password);
      if (!isPasswordValid) {
        return callback(null, { success: false, message: "Invalid password" });
      }
      // Generate JWT token
      const token = jwt.sign(
        { employeeId: employee.employeeId, username: employee.username },
        "05052025", // Replace with a secure secret key
        { expiresIn: "5h" } // Token expires in 1 hour
      );
      console.log("Token:", token);
      
      return callback(null, { success: true, employee, token });
    });
  }

  static logout(callback) {
    // Logout logic can vary depending on the implementation.
    // For example, if using sessions or tokens, you can clear them here.
    return callback(null, {
      success: true,
      message: "Logged out successfully",
    });
  }
}

module.exports = Employee;
