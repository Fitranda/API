const Attedance = require("../models/attedance");

// Get all employees
async function getAttedance(req, res) {
  try {
    const filter = req.query || {};
    Attedance.getAttedance(filter, (err, results) => {
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

// Create a new employee
async function CreateAttedance(req, res) {  

  try {
    const {
      employeeId,
      date,
      photo,
      latitude,
      longitude,
      status,
    } = req.body;


    const attedanceData = {
      employeeId,
      date,
      photo, // Nama file yang diunggah
      latitude,
      longitude,
      status,
    };
    

    

    // Create employee
    Attedance.CreateAttedance(attedanceData, (err, newAttedance) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating attedance", error: err });
      res.status(201).json(newAttedance);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  getAttedance,
  CreateAttedance,
};
