//controller to create a new animal record
const Animal = require('../models/animal.model.js');
const careTaker = require('../models/careTaker.model.js');
const uploadToCloudinary = require('../utils/uploadToCloudinary.js');

const createAnimal = async (req, res) => {
    try {
        
        const newAnimal = new Animal(req.body);
        const newCareTaker = new careTaker(req.body);
        console.log(newCareTaker);
        //const caretakerData = new careTaker(req.body);
        //upload image to cloudinary if file is present
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path);
            newAnimal.photo = result.secure_url;
            await newAnimal.save();
        }
        res.status(201).json(newAnimal);
    } catch (error) {
        //delete the uploaded file if there was an error saving the record
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting the file:', err);
            });
        }
        res.status(400).json({ message: error.message });
    }
};

module.exports = createAnimal;
