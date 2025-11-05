//login user and generate access and refresh tokens
//send tokens in httpOnly cookies

const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {   
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || !user.isValidPassword(password)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // Save refresh token in database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Set refresh token in httpOnly cookie
        // send access token and refresh token in cookies
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
        return res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = userLogin;
