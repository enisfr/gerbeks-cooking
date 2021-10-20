exports.getRoot = (req, res) => {
	res.redirect('/recipe/list');
}

exports.get404 = (req, res) => {
	res.status(404).render('404');
}
