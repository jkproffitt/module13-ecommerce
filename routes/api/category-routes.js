const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categorydata = await Category.findAll({
			include: [{ model: Product, required: true }],
		});
		res.status(200).json(categorydata);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	const categoryData = await Category.findByPk(req.params.id).catch((err) =>
		res.json(err)
	);
	res.json(categoryData);
});

router.post('/', (req, res) => {
	// create a new category
	Category.create(req.body)
		.then((newCategory) => {
			res.json(newCategory);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const categoryData = await Category.update(
			{ category_name: req.body.category_name },
			{ where: { id: req.params.id } }
		);
		if (!categoryData) {
			res.status(404).json({ message: 'That id does not have a tag' });
			return;
		}
		res.status(200).json(categoryData);
	} catch (err) {
		res.json(err);
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!categoryData) {
			res.status(404).json({
				message: 'No category found with this id!',
			});
			return;
		}

		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
