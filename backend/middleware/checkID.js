import { isValidObjectId } from "mongoose";

const checkID = (req, res, next) => {
  try{
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  next();
 }
    catch (error) {
        console.error('ID validation error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}