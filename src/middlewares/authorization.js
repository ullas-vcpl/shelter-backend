//authorization middleware for protected routes
//check cookies and headers for access token and verify user role
//to allow or deny access to the route
//if accesstoken is valid

const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const refreshTokens = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    else {
        //verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret_key', async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'could not verify refresh token' });
            }
            else {
                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(403).json({ message: 'user could not be verified' });
                }
                console.log(user);
                if(user.refreshToken!==refreshToken) {
                    return res.status(403).json({ message: 'refresh token does not match' });
                }
                console.log('Refresh token is valid, issuing new access token');
                const newAccessToken = user.generateAccessToken();
                const newRefreshToken = user.generateRefreshToken();
                user.refreshToken = newRefreshToken;
                await user.save({ validateBeforeSave: false });
                res.clearCookie('refreshToken');
                res.clearCookie('accessToken');
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
                res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
                req.user = jwt.decode(newAccessToken);
                console.log('Access token refreshed');
                console.log(req.user);
                next();
            }
        }); 
    }
}
const authorize = (req, res, next) => {
    // console.log(req.cookies);
    // next();
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
    console.log("Access token from cookies or headers:", req.cookies);
    if (!token) {
        // check and validate refresh token and issue new access token

        return res.status(401).json({ message: 'Unauthorized' });

    } else {

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'your_secret_key', (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err.name);
                if (err.name === 'TokenExpiredError') {
                    console.log('Access token expired, checking refresh token');
                    return refreshTokens(req, res, next);
                }
                return res.status(403).json({ message: 'Forbidden before calling refreshTokens' });
            }

            

            req.user = decoded;
            next();
        });
   };
};

module.exports = authorize; 
