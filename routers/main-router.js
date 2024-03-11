const express = require('express');
const routes = express.Router();
const viewController = require('./../controllers/viewsController');
const authenController = require('./../controllers/authenController');

routes.get('/', viewController.getHomePage);
routes.get('/about', viewController.getAboutPage);
routes.get('/contact', viewController.getContactPage);

module.exports = routes;
