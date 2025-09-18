// animal model
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({  
    tag:{ type: String, required: true, unique: true },
    name: { type: String},
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number , required: true },
    location: { type: String, required: true },
    healthStatus: { type: String, required: true },
    adoptionStatus: { type: String },
    intakeDate: { type: Date},
    notes: { type: String },
    photo: { type: String, required: true },// URL or path to the photo
    caretaker: { type: mongoose.Schema.Types.ObjectId, ref: 'CareTaker'}
},{ timestamps: true });
const Animal = mongoose.model('Animal', animalSchema);


module.exports = Animal;