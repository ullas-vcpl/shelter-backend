// create user controller
const User = require('../models/user.model.js');    
const createUser = async (req, res) => {    
    try {
        const { username, password } = req.body;    
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser };