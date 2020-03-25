const express = require('express'); 
const OngController = require('./controllers/OngController'); 
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router(); 

//sessions 
routes.post('/sessions', SessionController.create); 

// ongs
routes.get('/ongs', OngController.index);//route listagem //list
routes.post('/ongs', OngController.create); //route cadastro //create 

//profile 
routes.get('/profile', ProfileController.index); 

//incidents 
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create); 
routes.delete('/incidents/:id', IncidentController.delete); // route delete

module.exports = routes; 