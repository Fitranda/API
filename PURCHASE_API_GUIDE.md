# Purchase Approval System - API Documentation

## Overview
Sistem ini memungkinkan karyawan untuk mengajukan purchase request yang kemudian harus disetujui oleh supervisor.

## Flow Process
1. **Employee** membuat purchase request dengan status "Pending" (tanpa supplier)
2. **Supervisor** melihat daftar pending purchases
3. **Supervisor** melakukan approve (dengan menentukan supplier) atau reject

## API Endpoints

### 1. Create Purchase Request (Employee)
```
POST /api/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "invoice": "INV001",
  "employeeId": 1,
  "date": "2025-06-01",
  "subtotal": 140000,
  "discount": 0,
  "total": 140000,
  "detail": [
    {
      "productId": 1,
      "quantity": 4,
      "price": 35000,
      "subtotal": 140000
    }
  ]
}
```

**Response:**
```json
{
  "message": "Purchase request submitted successfully. Waiting for supervisor approval.",
  "data": {
    "purchaseId": 1,
    "invoice": "INV001",
    "employeeId": 1,
    "status": "Pending",
    "date": "2025-06-01",
    "subtotal": 140000,
    "discount": 0,
    "total": 140000
  }
}
```

### 2. Get All Purchases (dengan filter status)
```
GET /api/purchase?status=Pending
Authorization: Bearer {token}
```

### 3. Get Pending Purchases (Supervisor Only)
```
GET /api/purchase/pending
Authorization: Bearer {supervisor_token}
```

**Response:**
```json
[
  {
    "purchaseId": 1,
    "invoice": "INV001",
    "employeeId": 1,
    "date": "2025-06-01",
    "subtotal": 140000,
    "discount": 0,
    "total": 140000,
    "status": "Pending",
    "employeeName": "John Doe"
  }
]
```

### 4. Get Purchase by ID
```
GET /api/purchase/1
Authorization: Bearer {token}
```

### 5. Approve Purchase (Supervisor Only)
```
PUT /api/purchase/1/approve
Authorization: Bearer {supervisor_token}
Content-Type: application/json

{
  "supplierId": 1
}
```

**Response:**
```json
{
  "message": "Purchase approved successfully",
  "purchaseId": 1,
  "supplierId": 1
}
```

### 6. Reject Purchase (Supervisor Only)
```
PUT /api/purchase/1/reject
Authorization: Bearer {supervisor_token}
```

**Response:**
```json
{
  "message": "Purchase rejected successfully",
  "purchaseId": 1
}
```

## Status Values
- **Pending**: Purchase request sedang menunggu approval
- **Approve**: Purchase request telah disetujui oleh supervisor
- **Reject**: Purchase request ditolak oleh supervisor

## Authorization
- **Employee**: Dapat membuat purchase request dan melihat purchase
- **Supervisor**: Dapat melakukan semua operasi employee + approve/reject purchase
- **Admin**: Dapat melakukan semua operasi

## Error Codes
- **400**: Validation error (missing required fields)
- **401**: Unauthorized (invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Resource not found
- **500**: Internal server error
