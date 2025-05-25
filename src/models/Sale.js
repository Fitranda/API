const db = require("../config/db");

class Sale {
  static getSale(search, callback) {
    let query = `
      SELECT 
        a.saleId AS id,
        a.invoice,
        a.employeeId,
        b.employeeName,
        a.date,
        a.method,
        a.subtotal,
        a.discount,
        a.total,
        a.payment,
        a.change
      FROM sale a
      LEFT JOIN employee b ON a.employeeId = b.employeeId
      WHERE TRUE
    `;

    const params = [];

    if (search.date) {
      // Assuming search.date is a single date, filter between start and end of that date
      query += ` AND a.date BETWEEN ? AND ?`;
      params.push(`${search.date} 00:00:00`, `${search.date} 23:59:59`);
    }

    if (search.employeeName) {
      query += " AND b.employeeName LIKE ?";
      params.push(`%${search.employeeName}%`);
    }

    if (search.invoice) {
      query += " AND a.invoice LIKE ?";
      params.push(`%${search.invoice}%`);
    }

    query += " ORDER BY a.date DESC, a.saleId DESC";

    db.query(query, params, callback);
  }

  static getSaleDetail(saleId, callback) {
    // First, get the sale information
    const saleQuery = `
      SELECT 
        a.saleId AS id,
        a.invoice,
        a.employeeId,
        b.employeeName,
        a.date,
        a.method,
        a.subtotal,
        a.discount,
        a.total,
        a.payment,
        a.change
      FROM sale a
      LEFT JOIN employee b ON a.employeeId = b.employeeId
      WHERE a.saleId = ?
    `;

    db.query(saleQuery, [saleId], (err, saleResults) => {
      if (err) {
        return callback(err, null);
      }

      if (saleResults.length === 0) {
        return callback(null, null);
      }

      const sale = saleResults[0];

      // Then, get the sale details
      const detailQuery = `
        SELECT 
          c.saleDetailId,
          c.productId,
          d.productName,
          c.quantity,
          c.price,
          c.subtotal
        FROM saledetail c
        LEFT JOIN product d ON c.productId = d.productId
        WHERE c.saleId = ?
        ORDER BY c.saleDetailId
      `;

      db.query(detailQuery, [saleId], (detailErr, detailResults) => {
        if (detailErr) {
          return callback(detailErr, null);
        }

        // Combine sale and details
        sale.details = detailResults || [];

        callback(null, sale);
      });
    });
  }

  static CreateSale(data, callback) {
    const {
      invoice,
      employeeId,
      date,
      method,
      subtotal,
      discount,
      total,
      payment,
      change,
      details, // pastikan ini 'details' (jamak)
    } = data;

    // Susun query insert sale
    const fields = [];
    const values = [];
    const params = [];

    if (invoice) {
      fields.push("invoice");
      values.push("?");
      params.push(invoice);
    }
    if (employeeId) {
      fields.push("employeeId");
      values.push("?");
      params.push(employeeId);
    }
    if (date) {
      fields.push("date");
      values.push("?");
      params.push(date);
    }
    if (method) {
      fields.push("method");
      values.push("?");
      params.push(method);
    }
    if (subtotal) {
      fields.push("subtotal");
      values.push("?");
      params.push(subtotal);
    }
    if (discount) {
      fields.push("discount");
      values.push("?");
      params.push(discount);
    }
    if (total) {
      fields.push("total");
      values.push("?");
      params.push(total);
    }
    if (payment) {
      fields.push("payment");
      values.push("?");
      params.push(payment);
    }
    if (change) {
      fields.push("`change`");
      values.push("?");
      params.push(change);
    }

    const insertSaleQuery = `INSERT INTO sale (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    // Mulai transaksi
    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        return callback(transactionErr, null);
      }

      db.query(insertSaleQuery, params, (insertErr, result) => {
        if (insertErr) {
          return db.rollback(() => {
            callback(insertErr, null);
          });
        }

        const saleId = result.insertId;

        if (!Array.isArray(details) || details.length === 0) {
          // Tidak ada details, commit dan return
          return db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => callback(commitErr, null));
            }
            const newData = { id: saleId, ...data };
            callback(null, newData);
          });
        }

        // Insert details satu per satu dengan Promise untuk menunggu semua selesai
        const detailInsertPromises = details.map((item) => {
          return new Promise((resolve, reject) => {
            const detailQuery = `
              INSERT INTO saledetail (saleId, productId, quantity, price, subtotal)
              VALUES (?, ?, ?, ?, ?)
            `;
            const detailParams = [
              saleId,
              item.productId,
              item.quantity,
              item.price,
              item.subtotal,
            ];
            db.query(detailQuery, detailParams, (detailErr) => {
              if (detailErr) {
                return reject(detailErr);
              }
              resolve();
            });
          });
        });

        Promise.all(detailInsertPromises)
          .then(() => {
            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => callback(commitErr, null));
              }
              const newData = { id: saleId, ...data };
              callback(null, newData);
            });
          })
          .catch((detailInsertErr) => {
            db.rollback(() => {
              callback(detailInsertErr, null);
            });
          });
      });
    });
  }
}

module.exports = Sale;
