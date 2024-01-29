const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// finds all tags with Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// finds tags by id with Product data
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product,
    });
    if (!tag) {
      return res.status(404).json({error: 'Tag not found'});
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// creates a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// updates tag name by id value
router.put('/:id', async (req, res) => {
  try {
    const [numRowsUpdated] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
      if (numRowsUpdated === 0) {
        return res.status(404).json({error: 'Tag not found'});
      }
      res.json({ message: 'Tag updated successfully'});
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// deletes tag by id 
router.delete('/:id', async (req, res) => {
  try {
    const numRowsDeleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (numRowsDeleted === 0) {
      return res.status(404).json({error: 'Tag not found'});
    }
    res.json({message: 'Tag deleted successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
