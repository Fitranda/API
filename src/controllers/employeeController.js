const Employee = require("../models/Employee");
const { imageUpload } = require("../utils/imagekit");
// Get all employees
async function getEmployee(req, res) {
  try {
    const filter = req.query || {};
    Employee.getEmployee(filter, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get employee by ID
async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;

    Employee.getEmployeeById(id, (err, employee) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching employee", error: err });
      }
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new employee
async function createEmployee(req, res) {
  try {
    const {
      employeeName,
      address,
      contact,
      username,
      password,
      role,
      storename,
    } = req.body;

    let profilePicture = null;
    if (req.file) {
      profilePicture = await imageUpload(req.file);
    }

    // Validation
    if (!employeeName || employeeName.length > 255) {
      return res.status(400).json({
        message: "Nama pegawai harus diisi dan maksimal 255 karakter",
      });
    }
    if (contact && contact.length > 20) {
      return res
        .status(400)
        .json({ message: "Kontak pegawai tidak boleh lebih dari 20 karakter" });
    }
    if (!username || username.length > 100) {
      return res
        .status(400)
        .json({ message: "Username harus diisi dan maksimal 100 karakter" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password harus diisi dan minimal 8 karakter" });
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password harus mengandung setidaknya satu huruf besar, satu angka, dan satu simbol",
      });
    }
    if (!role) {
      return res.status(400).json({ message: "Peran harus diisi" });
    }

    const employeeData = {
      employeeName,
      address,
      contact,
      username,
      password,
      role,
      storename,
      profilePicture,
    };

    Employee.CreateEmployee(employeeData, (err, newEmployee) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating employee", error: err });
      res.status(201).json(newEmployee);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update an employee by ID
async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const {
      employeeName,
      address,
      contact,
      username,
      password,
      role,
      storename,
    } = req.body;

    let photoUrl = null;
    if (req.file) {
      photoUrl = await imageUpload(req.file);
    }

    // Prepare updated data
    const updatedData = {
      employeeName,
      address,
      contact,
      username,
      role,
      storename,
    };

    if (password) {
      updatedData.password = password;
    }
    if (photoUrl) {
      updatedData.profilePicture = photoUrl;
    }

    Employee.updateEmployee(id, updatedData, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating employee", error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json({ message: "Employee updated successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete an employee by ID
async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;

    Employee.deleteEmployee(id, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting employee", error: err });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginEmployee(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password harus diisi" + req.body });
    }

    // Login
    Employee.login(username, password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error during login", error: err });
      }
      if (!result.success) {
        return res.status(401).json({ message: result.message });
      }
      res.status(200).json({
        message: "Login successful",
        employee: result.employee,
        token: result.token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
};
