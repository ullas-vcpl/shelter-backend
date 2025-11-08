// search tretment by animal ID
const Tratment = require('../models/treatment.model.js');   
const searchTreatment = async (req, res) => {
    try {
        const { animalId } = req.params;
        const treatments = await Treatment.findOne({ animal: animalId });
        if (!treatments) {
            return res.status(404).json({ message: 'No treatments found for this animal' });
        }
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ message: 'Error searching treatments', error });
    }
};

module.exports = searchTreatment;
