import Item from "../models/item.model.js"


export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    // Handles invalid ObjectId format too
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const filter = category ? { category } : {};
    const query = Item.find(filter).sort({ createdAt: -1 });

    if (limit) query.limit(Number(limit));

    const items = await query;
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = bad input, e.g. failed validation
  }
};

export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // return the updated doc, not the original
      runValidators: true, // re-run schema validation on update
    });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};