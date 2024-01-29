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
    const tag = await Tag.findByPk(reg.params.id, {
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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
