const Recipe = require('../models/recipe-model');


exports.renderRecipesPage = (req, res) => {
	Recipe.readFile((recipes) => {
		res.render('list', {page: 'list', recipes});
	});
}

exports.renderCreateRecipePage = (req, res) => {
	res.render('create-recipe', {page: 'create'});
}

exports.createRecipe = (req, res) => {
	const recipe = new Recipe(req.body.title, req.body.details, null);
	recipe.save(false, recipe, null);
	res.redirect('/recipe/list');
}

exports.renderEditRecipePage = (req, res) => {
	const recipeId = req.params.id;

	Recipe.findRecipe(recipeId, recipe => {
		res.render('edit-recipe', {recipe});
	});
}

exports.editRecipe = (req, res) => {
	const recipe = new Recipe(req.body.title, req.body.details, req.body.id);
	recipe.save(true, recipe);
	res.redirect('/recipe/list');
}

exports.deleteRecipe = (req, res) => {
	Recipe.delete(req.body.id);
	res.redirect('/recipe/list');
}
