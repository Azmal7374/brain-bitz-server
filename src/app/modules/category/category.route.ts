import express from 'express';
import categoryService from './category.service';

const router = express.Router();

// Add new category
router.post('/add', async (req, res) => {
  try {
    const { name, questions } = req.body;
    const category = await categoryService.createCategory(name, questions);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export const CategoryRoutes = router;
