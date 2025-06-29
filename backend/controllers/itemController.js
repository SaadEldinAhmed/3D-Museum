import Item from '../models/ItemModel.js';

export const addItems = async (req, res) => {
  try {
    const { reviews } = req.body;

    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({ message: 'No reviews provided' });
    }

    // Directly insert all reviews, even if they might be duplicates
    const created = await Item.insertMany(reviews);
    res.status(201).json(created);

  } catch (error) {
    console.error('Error in addItems:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Get Items Error:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
};
