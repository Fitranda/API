const db = require("../config/db");

class Purchase {  static getPurchase(search, callback) {
    let query = `SELECT 
    e.purchaseDetailId,e.productId,e.quantity,e.price,e.subtotal as subtotaldetail,
    a.purchaseId,a.invoice,a.employeeId,a.supplierId,a.date,a.subtotal,a.discount,a.total,a.status,
    b.employeeName,c.supplierName,d.productName FROM purchasedetail e
    Left Join purchase a on a.purchaseId = e.purchaseId
    Left Join employee b on a.employeeId = b.employeeId
    Left Join supplier c on a.supplierId = c.supplierId
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

    if (search.supplierName) {
      query += " AND c.supplierName LIKE ?";
      params.push(`%${search.supplierName}%`);
    }

    if (search.productName) {
      query += " AND d.productName LIKE ?";
      params.push(`%${search.productName}%`);
    }    if (search.invoice) {
      query += " AND a.invoice LIKE ?";
      params.push(`%${search.invoice}%`);
    }

    if (search.status) {
      query += " AND a.status = ?";
      params.push(search.status);
    }

    db.query(query, params, callback);
  }

  static CreatePurchase(data, callback) {
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
    if (data.supplierId) {
      fields.push("supplierId");
      values.push("?");
      params.push(data.supplierId);
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
    }    if (data.total) {
      fields.push("total");
      values.push("?");
      params.push(data.total);
    }
    if (data.status) {
      fields.push("status");
      values.push("?");
      params.push(data.status);
    }

    const query = `INSERT INTO purchase (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;

    db.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (Array.isArray(detail) && detail && detail.length > 0) {
        const detailQuery = `
          INSERT INTO purchasedetail (purchaseId, productId, quantity, price, subtotal)
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
              console.error("Error inserting purchase detail:", err);
            }
          });
        });
      }      const newData = { purchaseId: result.insertId, ...data };
      return callback(null, newData);
    });
  }

  // Get purchase by ID for approval
  static getPurchaseById(purchaseId, callback) {
    const query = `SELECT 
      a.purchaseId, a.invoice, a.employeeId, a.supplierId, a.date, 
      a.subtotal, a.discount, a.total, a.status,
      b.employeeName, c.supplierName
      FROM purchase a
      LEFT JOIN employee b ON a.employeeId = b.employeeId
      LEFT JOIN supplier c ON a.supplierId = c.supplierId
      WHERE a.purchaseId = ?`;
    
    db.query(query, [purchaseId], callback);
  }

  // Approve purchase with supplier assignment
  static approvePurchase(purchaseId, supplierId, callback) {
    const query = `UPDATE purchase SET status = 'Approve', supplierId = ? WHERE purchaseId = ?`;
    db.query(query, [supplierId, purchaseId], callback);
  }

  // Reject purchase
  static rejectPurchase(purchaseId, callback) {
    const query = `UPDATE purchase SET status = 'Reject' WHERE purchaseId = ?`;
    db.query(query, [purchaseId], callback);
  }

  // Get pending purchases for supervisor
  static getPendingPurchases(callback) {
    const query = `SELECT 
      a.purchaseId, a.invoice, a.employeeId, a.date, 
      a.subtotal, a.discount, a.total, a.status,
      b.employeeName
      FROM purchase a
      LEFT JOIN employee b ON a.employeeId = b.employeeId
      WHERE a.status = 'Pending'
      ORDER BY a.date DESC`;
    
    db.query(query, callback);
  }
}

module.exports = Purchase;
