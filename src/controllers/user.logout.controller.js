//logout user and invalidate tokens


const User = require('../models/user.model.js');

const userLogout = async (req, res) => {   
console.log(req.user);
   const user= await User.findOne({ username: req.user.username });
   if(!user){
    return res.status(400).json({ message: 'User not found' });
   }
    user.refreshToken=null;
   await user.save({ validateBeforeSave: false });
   res.clearCookie('refreshToken');
   res.clearCookie('accessToken');
   return res.status(200).json({ message: 'Logout successful' });
};

module.exports = userLogout;
