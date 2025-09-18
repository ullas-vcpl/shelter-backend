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
    phone2: {
        type: String
    },
    address: {
        type: String,
        required: true
    }
});

const CareTaker = mongoose.model('CareTaker', careTakerSchema);

module.exports = CareTaker;
