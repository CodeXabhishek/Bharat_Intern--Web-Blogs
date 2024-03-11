const User = require('./../models/user-model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**@description: For creating a new users */
exports.signUpUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'New User Created', user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'User already in use' });
    } else {
      res.status(500).json({ message: `${error.message} .` });
    }
    console.log(error);
  }
};

/**@description: For login  users */
exports.loggedIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid  credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**@description: To check whether a user is login or not */
exports.userLogIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Please log in to access' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
