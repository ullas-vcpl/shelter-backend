//authorization middleware for protected routes
//check cookies and headers for access token and verify user role
//to allow or deny access to the route
//if accesstoken is valid

const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    // console.log(req.cookies);
    // next();
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'your_secret_key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = decoded;
            next();
        });
   };
};

module.exports = authorize; 
