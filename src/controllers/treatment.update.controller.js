//udate treatment details of animal
const Treatment = require('../models/treatment.model.js');
const Animal = require('../models/animal.model.js');

const updateTreatment = async (req, res) => {
  const { animalId } = req.params;
  const { treatmentDetails } = req.body;

  try {
    const treatment = await Treatment.findById(animalId);
    if (!treatment) {
      //create new entry
      const newTreatment = new Treatment({
        animal: animalId,
        ...treatmentDetails
      });
      await newTreatment.save();
    }

    // Update treatment details
    Object.assign(treatment, treatmentDetails);
    await treatment.save(); 

    res.status(200).json({ message: 'Treatment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateTreatment;
