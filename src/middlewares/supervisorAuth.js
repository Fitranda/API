// Middleware to check if user is supervisor for purchase approval
const supervisorAuth = (req, res, next) => {
  try {
    // Get user role from token (assuming it's set in auth middleware)
    const userRole = req.user.role;
    
    if (userRole !== 'supervisor' && userRole !== 'Admin') {
      return res.status(403).json({ 
        message: "Access denied. Only supervisors can approve/reject purchases." 
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ 
      message: "Error checking supervisor authorization",
      error: error.message 
    });
  }
};

module.exports = supervisorAuth;
