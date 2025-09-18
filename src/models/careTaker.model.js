//careTaker model full name, email, phone number, address;

const mongoose = require('mongoose');

const careTakerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CareTaker', careTakerSchema);
