const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');
const session = require('express-session');

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
  })
  .then((con) => {
    console.log('DB connection success');
  })
  .catch((err) => {
    console.log('Connection is not successful');
  });
app.use(
  session({
    secret: process.env.MONGO_STORE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB,
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
