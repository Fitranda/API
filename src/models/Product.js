const db = require("../config/db");

class Product {
  static getProduct(search, callback) {
    let query = `SELECT productId,productName,price,stock FROM product WHERE true`;

    let params = [];

    if (search.productName) {
      query += " AND productName LIKE ?";
      params.push(`%${search.productName}%`);
    }

    db.query(query, params, callback);
  }

  static CreateProduct(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    if (data.productName) {
      fields.push("productName");
      values.push("?");
      params.push(data.productName);
    }
    if (data.price) {
      fields.push("price");
      values.push("?");
      params.push(data.price);
    }
    if (data.stock) {
      fields.push("stock");
      values.push("?");
      params.push(data.stock);
    }

    const query = `INSERT INTO product (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      const newData = { productId: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  static updateProduct(productId, data, callback) {
    const fields = [];
    const params = [];

    if (data.productName) {
      fields.push("productName = ?");
      params.push(data.productName);
    }
    if (data.price) {
      fields.push("price = ?");
      params.push(data.price);
    }
    if (data.stock) {
      fields.push("stock = ?");
      params.push(data.stock);
    }

    if (fields.length === 0) {
      return callback(new Error("No fields to update"), null);
    }

    const query = `UPDATE product SET ${fields.join(
      ", "
    )} WHERE productId = ?`;
    params.push(productId);

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, { message: "Product updated successfully" });
    });
  }

  static deleteProduct(employeeId, callback) {
    const queryCheckUsage = `
      SELECT 
        (SELECT COUNT(*) FROM Purchasedetail WHERE productId = ?) AS purchaseCount
        (SELECT COUNT(*) FROM saledetail WHERE productId = ?) AS saleCount
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

        if (purchaseCount > 0 || saleCount > 0) {
          // Jika digunakan, update status menjadi 2
          return callback(err, {
            message: "Cannot delete product because they have made purchases or sales",
          });
        } else {
          // Jika tidak digunakan, hapus permanen
          const queryDelete = "DELETE FROM product WHERE productId = ?";
          db.query(queryDelete, [employeeId], (err, result) => {
            if (err) {
              return callback(err, null);
            }
            return callback(null, { message: "Product deleted permanently" });
          });
        }
      }
    );
  }
}

module.exports = Product;
