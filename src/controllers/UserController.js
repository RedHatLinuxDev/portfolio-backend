const User = require("../models/Users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createUser = async(req,res) =>{
    try{
        const {email,name,password,userType} = req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            email:email,
            name: name,
            password: hashedPassword,
            userType: userType
        });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}


const login = async (req, res) => {
    try {
        
        const { email, password} = req.body;
        
        // Find the admin user by username
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If the password is valid, generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, userType: user.userType,email:user.email }, 'your_secret_key', { expiresIn: '24h' });

        res.status(200).json({ api_token:token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const verifyToken = (req,res) => {
    const data = req.user;
    res.status(200).json({ data: data });
}

module.exports = {
    createUser,
    login,
    verifyToken
};