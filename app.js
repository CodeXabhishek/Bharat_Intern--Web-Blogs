const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

const mainRouter = require('./routers/main-router');
const adminRouter = require('./routers/admin-router');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(methodOverride('_method'));

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   console.log('Hello from middleware function');
//   next();
// });
app.use('/', mainRouter);
app.use('/admin', adminRouter);

module.exports = app;
