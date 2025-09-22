//user schema.
//user will be able to update animal, caretaker and treatment records
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }
},{ timestamps: true });

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const bcrypt = require('bcrypt'); 
        const saltRounds = 10;
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }   
    next();
}); 

userSchema.methods.isValidPassword = function(password) {
    const bcrypt = require('bcrypt');
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateRefreshToken = function() {
  //generate refresh token using jwt
  const refreshToken = jwt.sign({ id: this._id
   }, process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret_key', { expiresIn: '7d' });
  return refreshToken;  
}

userSchema.methods.generateAccessToken = function() {   
  const accessToken = jwt.sign({ id: this._id, username: this.username }, process.env.ACCESS_TOKEN_SECRET || 'your_access_secret_key', { expiresIn: '1m' });
  return accessToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;