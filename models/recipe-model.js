const db = require('../util/db');

class Recipe {
	constructor(title, details, id) {
		this.title = title;
		this.details = details;
		this.id = id;
	}

	static create(recipe) {
		return db.execute('INSERT INTO `recipes` (`title`, `details`) VALUES (?, ?)', [recipe.title, recipe.details]);
	}

	static update(recipe) {
		return db.execute('UPDATE `recipes` SET `title` = (?), `details` = (?) WHERE `id` = (?)', [recipe.title, recipe.details, recipe.id]);
	}

	static delete(id) {
		return db.execute('DELETE FROM `recipes` WHERE `id` = (?)', [id]);
	}

	static getAll() {
		return db.execute('SELECT * FROM `recipes`');
	}

	static findById(id) {
		return db.execute('SELECT * FROM `recipes` WHERE `id` = (?)', [id]);
	}
}

module.exports = Recipe;
