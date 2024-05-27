const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const AdminAuth = async (req, res, next) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key');
        
        // Check if the user is an admin
        if (decoded.userType !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Only admins are allowed' });
        }

        // Fetch the admin user from the database (optional)
        const admin = await User.findById(decoded.userId);
        if (!admin) {
            return res.status(401).json({ error: 'Unauthorized: Admin not found' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = AdminAuth;
