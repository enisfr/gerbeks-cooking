const express = require('express');
const router = express.Router();

const recipeControllers = require('../controllers/recipe-controller');

router.get('/list', recipeControllers.renderRecipesPage);

router.get('/create', recipeControllers.renderCreateRecipePage);

router.post('/create', recipeControllers.createRecipe);

router.post('/edit', recipeControllers.editRecipe);

router.get('/edit/:id', recipeControllers.renderEditRecipePage);

router.post('/delete', recipeControllers.deleteRecipe);

module.exports = router;
