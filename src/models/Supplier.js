const db = require("../config/db");

class Supplier {
  static getSupplier(search, callback) {
    let query = `SELECT supplierId,supplierName,contact FROM supplier WHERE true`;

    let params = [];

    if (search.supplierName) {
      query += " AND supplierName LIKE ?";
      params.push(`%${search.supplierName}%`);
    }

    if (search.contact) {
      query += " AND contact LIKE ?";
      params.push(`%${search.contact}%`);
    }

    db.query(query, params, callback);
  }

  static CreateSupplier(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.supplierName) {
      fields.push("supplierName");
      values.push("?");
      params.push(data.supplierName);
    }
    if (data.contact) {
      fields.push("contact");
      values.push("?");
      params.push(data.contact);
    }

    const query = `INSERT INTO supplier (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { supplierId: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  static updateSupplier(supplierId, data, callback) {
    const fields = [];
    const params = [];

    if (data.supplierName) {
      fields.push("supplierName = ?");
      params.push(data.supplierName);
    }
    if (data.contact) {
      fields.push("contact = ?");
      params.push(data.contact);
    }

    if (fields.length === 0) {
      return callback(new Error("No fields to update"), null);
    }

    const query = `UPDATE supplier SET ${fields.join(
      ", "
    )} WHERE supplierId = ?`;
    params.push(supplierId);

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, { message: "Supplier updated successfully" });
    });
  }

  static deleteSupplier(employeeId, callback) {
    const queryCheckUsage = `
      SELECT 
        (SELECT COUNT(*) FROM Purchase WHERE supplierId = ?) AS purchaseCount
    `;

    db.query(
      queryCheckUsage,
      [employeeId, employeeId, employeeId],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }

        const usage = results[0];
        const { purchaseCount } = usage;

        if (purchaseCount > 0) {
          // Jika digunakan, update status menjadi 2
          return callback(err, {
            message: "Cannot delete supplier because they have made purchases",
          });
        } else {
          // Jika tidak digunakan, hapus permanen
          const queryDelete = "DELETE FROM supplier WHERE supplierId = ?";
          db.query(queryDelete, [employeeId], (err, result) => {
            if (err) {
              return callback(err, null);
            }
            return callback(null, { message: "Supplier deleted permanently" });
          });
        }
      }
    );
  }
}

module.exports = Supplier;
