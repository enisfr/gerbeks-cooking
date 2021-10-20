const fs = require('fs');
const path = require('path');
const recipesStoragePath = path.join(path.dirname(require.main.filename), 'data', 'recipes.json');


const readDataFromFile = (callback) => {
	fs.readFile(recipesStoragePath, (err, recipes) => {
		if(err) {
			console.log(err);
			callback([]);
		} else {
			callback(JSON.parse(recipes.toString()))
		}
	});
}

class Recipe {
	constructor(title, details, id) {
		this.title = title;
		this.details = details;
		this.id = id;
	}

	save(edit, recipe) {
		let result;
		readDataFromFile(recipes => {
			if(edit) {
				result = recipes.filter(rcp => rcp.id !== recipe.id);
				result.push(recipe);

			} else {
				recipe.id = Math.floor(Math.random()*10000000).toString();
				recipes.push(recipe);
				result = recipes;
			}
			fs.writeFile(recipesStoragePath, JSON.stringify(result), (err) => {
				if(err) {
					console.log(err);
				}
			});
		});
	}

	static delete(id) {
		readDataFromFile(recipes => {
			recipes = recipes.filter(rcp => rcp.id !== id);
			fs.writeFile(recipesStoragePath, JSON.stringify(recipes), (err) => {
				if(err) {
					console.log(err);
				}
			});
		});
	}

	static readFile(callback) {
		readDataFromFile(callback);
	}

	static findRecipe(id, callback) {
		readDataFromFile(recipes => {
			callback(recipes.find(recipe => recipe.id === id));
		});

	}

}

module.exports = Recipe;
