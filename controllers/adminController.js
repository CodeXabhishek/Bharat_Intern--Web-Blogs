const Post = require('./../models/post-model');
const User = require('./../models/user-model');
const adminLayout = './../views/layouts/admin';

/**@description: For getting login and sign up page */
exports.getAdminPage = async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };
    res.render('admin/admin_index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
};

/**@description: For dashboard after login */
exports.getDashedBoard = async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    let nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    // const data = await Post.find();
    res.render('admin/dashboard', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

/**@description: For new post layout page */
exports.addNewPost = async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    const data = await Post.find();
    res.render('admin/add-post', {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

/**@description: For adding a new post */
exports.createNewPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
    });

    await Post.create(newPost);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**@description: For edit layout page */
exports.getEditPost = async (req, res) => {
  try {
    const locals = {
      title: 'Edit Post',
      description: 'Free NodeJs User Management System',
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.render('admin/edit-post', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

/**@description: For updating current post */
exports.updatePost = async (req, res) => {
  console.log(req.params.id);
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });
    console.log('abhishek');

    res.redirect(`/admin/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

/**@description: For deleting a current post */
exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**@description: For logout  */
exports.logOut = async (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
};
