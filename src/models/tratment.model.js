//schema for tratment model
const mongoose = require('mongoose');   
const tratmentSchema = new mongoose.Schema({
    animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    treatmentType: { type: String },    
    description: { type: String },
    veterinarian: { type: String },
    cost: { type: Number },
    //updates field should contain date and content of each update
    updates: [{ 
        date: { type: Date, default: Date.now },
        content: { type: String }
    }],
    //optional
    files: [{ type: String }] // Array of file URLs or paths
},{ timestamps: true });

const Tratment = mongoose.model('Tratment', tratmentSchema);

module.exports = Tratment;