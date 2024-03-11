const Post = require('./../models/post-model');
const adminLayout = './../views/layouts/admin';

/**@description: For getting a single post layout page */
exports.getPostPage = async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    const locals = {
      title: data.title,
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    res.render('post', {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

/**@description: For getting a search results */
exports.getSearchResult = async (req, res) => {
  console.log(req.body);
  try {
    const locals = {
      title: 'Search',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.',
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });
    res.render('search', {
      data,
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};
