const express = require('express'); 
const routes = require('./routes');
const cors = require('cors'); 
const {errors} = require('celebrate');
const app = express(); 


app.use(cors());
app.use(express.json()); // informa o express que vai ser utilizado json nas requisições e transformar em objetos js
app.use(routes);
app.use(errors()); 


module.exports = app;