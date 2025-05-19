const path = require("path");


// Filter file (hanya menerima gambar)
const fileFilter = (req, file, cb) => {    
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

