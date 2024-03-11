const express = require('express');
const routes = express.Router();
const adminController = require('./../controllers/adminController');
const authenController = require('./../controllers/authenController');
const postController = require('./../controllers/postController');
routes.get('/', adminController.getAdminPage);
routes.post('/', authenController.loggedIn);
routes.post('/register', authenController.signUpUser);

routes.use(authenController.userLogIn);
routes.get('/post/:id', postController.getPostPage);
routes.get('/dashboard', adminController.getDashedBoard);
routes.get('/add-post', adminController.addNewPost);
routes.post('/add-post', adminController.createNewPost);
routes.get('/edit-post/:id', adminController.getEditPost);
routes.put('/edit-post/:id', adminController.updatePost);
routes.delete('/delete-post/:id', adminController.deletePost);
routes.get('/logout', adminController.logOut);
routes.post('/search', postController.getSearchResult);

module.exports = routes;
