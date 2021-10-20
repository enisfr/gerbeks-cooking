const Recipe = require('../models/recipe-model');

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
