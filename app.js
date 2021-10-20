const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipe-route');
const coreRoutes = require('./routes/core-route')

const rootPath = path.dirname(require.main.filename);
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(rootPath, 'public', 'css')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/recipe', recipeRoutes);
app.use(coreRoutes);


app.listen(3000);
