//udate treatment details of animal
const Treatment = require('../models/treatment.model.js');
const Animal = require('../models/animal.model.js');
const uploadToCloudinary = require('../utils/uploadToCloudinary.js');

const updateTreatment = async (req, res) => {
  const { treatmentDetails } = req.body;
  console.log(req.body);

  try {
    const treatment = await Treatment.findOne({ animal: req.body.animalId });
    if (!treatment) {
      //create new entry
      const newTreatment = new Treatment({
        animal: req.body.animalId,
        treatmentType: req.body.treatmentType,
        description: req.body.description,
        veterinarian: req.body.veterinarian,
        cost: req.body.cost,
      });
      newTreatment.updates.push({
        date: req.body.updateDate,
        content: req.body.updateContent
      });
      if(req.file){
        //upload to cloudinary and get url
        const result = await uploadToCloudinary(req.file.path);
        newTreatment.files.push(result.secure_url);
      }
      await newTreatment.save(validateBeforeSave = false);
    }

    // Update treatment details
    else {
      treatment.updates.push({
        date: req.body.updateDate,
        content: req.body.updateContent
      });
      if(req.file){
        //upload to cloudinary and get url
        const result = await uploadToCloudinary(req.file.path);
        treatment.files.push(result.secure_url);
      }
      await treatment.save(validateBeforeSave = false); 
    }

    res.status(200).json({ message: 'Treatment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateTreatment;
