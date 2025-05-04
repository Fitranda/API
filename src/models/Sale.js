const db = require("../config/db");

class Sale {
  static getSale(search, callback) {
    let query = `SELECT 
    e.saleDetailId,e.productId,e.quantity,e.price,e.subtotal as subtotaldetail,
    a.saleId,a.invoice,a.employeeId,a.date,a.subtotal,a.discount,a.total,a.payment,a.change,
    b.employeeName,d.productName FROM saledetail e
    Left Join sale a on a.saleId = e.saleId
    Left Join employee b on a.employeeId = b.employeeId
    Left Join product d on e.productId = d.productId
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

    if (search.productName) {
      query += " AND d.productName LIKE ?";
      params.push(`%${search.productName}%`);
    }

    if (search.invoice) {
      query += " AND a.invoice LIKE ?";
      params.push(`%${search.invoice}%`);
    }

    db.query(query, params, callback);
  }

  static CreateSale(data, callback) {
    const fields = [];
    const values = [];
    const params = [];

    const detail = data.detail;
    

    if (data.invoice) {
      fields.push("invoice");
      values.push("?");
      params.push(data.invoice);
    }

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
    if (data.subtotal) {
      fields.push("subtotal");
      values.push("?");
      params.push(data.subtotal);
    }
    if (data.discount) {
      fields.push("discount");
      values.push("?");
      params.push(data.discount);
    }
    if (data.total) {
      fields.push("total");
      values.push("?");
      params.push(data.total);
    }
    if (data.payment) {
      fields.push("payment");
      values.push("?");
      params.push(data.payment);
    }
    if (data.change) {
      fields.push("`change`");
      values.push("?");
      params.push(data.change);
    }

    const query = `INSERT INTO sale (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (Array.isArray(detail) && detail && detail.length > 0) {
        const detailQuery = `
          INSERT INTO saledetail (saleId, productId, quantity, price, subtotal)
          VALUES (?, ?, ?, ?, ?)
        `;
        

        detail.forEach((item) => {
          const detailParams = [
            result.insertId,
            item.productId,
            item.quantity,
            item.price,
            item.subtotal,
          ];
          db.query(detailQuery, detailParams, (err) => {
            if (err) {
              console.error("Error inserting sale detail:", err);
            }
          });
        });
      }
      const newData = { saleId: result.insertId, ...data };
      return callback(null, newData);
    });
  }
}

module.exports = Sale;
