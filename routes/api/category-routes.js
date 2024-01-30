const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// finds all categories and includes associated Products
router.get('/', async (req, res) => {
 try {
  const categories = await Category.findAll({
    include: Product,
  });
  console.log(categories);
  res.json(categories);
 }catch (error) {
  console.error(error);
  res.status(500).json({error: 'Internal Server Error'});
 }
});

// finds one category by id value and includes associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!category) {
      return res.status(404).json({error: 'Category not found'});
    }
    console.log(category);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// creates a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// updates a category by id value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {id: req.params.id},
    });
    if (updatedCategory[0] === 0){
      return res.status(404).json({error: 'Category not found'});
    }
    res.json({message: 'Category updated successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// deletes a category by id value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {id: req.params.id},
    });
    if (deletedCategory === 0) {
      return res.status(404).json({error: 'Category not found'});
    }
    res.json ({message: 'Category deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
