//search animal by tag controller
const Animal = require('../models/animal.model.js');

const searchbytag = async (req, res) => {
  const { tag } = req.query;
  console.log("Searching for tag:", tag);

  try {
    const animal = await Animal.findOne({ tag });
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = searchbytag;
