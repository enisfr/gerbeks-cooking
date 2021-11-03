const Recipe = require('../models/recipe-model');

let ingredients = [{name: 'DOMATES', value: '2', measurementUnit: 'Tablespoon'}, {name: 'BİBER', value: '1', measurementUnit: 'Teaspoon'}, {name: 'PATLICAN', value: '23', measurementUnit: 'Cup'}];

let measurementUnits = ['Teaspoon', 'Tablespoon', 'Cup', 'ml'];

exports.renderRecipesPage = (req, res) => {
	Recipe.getAll()
	.then(result => {
		const recipes = result[0];
		res.render('list', {page: 'list', recipes});
	});
}

exports.renderCreateRecipePage = (req, res) => {
	res.render('create-recipe', {page: 'create'});
}

exports.createRecipe = (req, res) => {
	const recipe = new Recipe(req.body.title, req.body.details, null);
	Recipe.create(recipe)
	.then(() => res.redirect('/recipe/list'))
	.catch(console.log);
}

exports.renderEditRecipePage = (req, res) => {
	Recipe.findById(req.params.id)
	.then((result) => {
		const recipe = result[0][0];
		res.render('edit-recipe', {recipe});
	});
}

exports.editRecipe = (req, res) => {
	const recipe = new Recipe(req.body.title, req.body.details, req.body.id);
	Recipe.update(recipe)
	.then(() => res.redirect('/recipe/list'))
	.catch(console.log);
}

exports.deleteRecipe = (req, res) => {
	Recipe.delete(req.body.id)
	.then(() => res.redirect('/recipe/list'))
	.catch(console.log);
}

exports.addIngredient = (req, res) => {
	ingredients.push(req.body);
	res.status(200).render('ingredient', {ingredients, measurementUnits});
}

exports.renderAddIngredientPage = (req, res) => {
	res.render('ingredient', {ingredients, measurementUnits})
}

exports.saveIngredients = (req, res) => {
	let result = [];

	for(let i = 0; i < req.body.name.length; i++) {
		let ingredient = {
			name: req.body.name[i],
			value: req.body.value[i],
			measurementUnit: req.body.measurementUnit[i]
		}

		result.push(ingredient);
	}

	ingredients = result;

	res.render('ingredient', {ingredients, measurementUnits})
}
