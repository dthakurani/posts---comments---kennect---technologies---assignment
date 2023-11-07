const { CustomException } = require('../utilities/errorHandler');
const { Post, Comment } = require('../models/post');

// Create a new post
const createPost = async function (user, body) {
  const postAlreadyExists = await Post.findOne({
    title: { $regex: new RegExp(body.title, 'i') },
  });

  if (postAlreadyExists) {
    throw new CustomException('Post with this title already exists', 409);
  }

  const post = new Post({
    ...body,
    userId: user._id,
  });

  await post.save();

  return post;
};

// Add comment to a post
const addComment = async function (user, id, body) {
  const postAlreadyExists = await Post.findById(id);

  if (!postAlreadyExists) {
    throw new CustomException('Post not found', 404);
  }

  const comment = new Comment({
    userId: user._id,
    content: body.content,
  });

  const response = await Post.updateOne(
    { _id: id },
    { $push: { comments: comment } },
  );

  return response;
};

// Display post with comments
const postDetails = async function (id) {
  const post = await Post.findById(id)
    .populate('userId', 'name')
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'name',
      },
    });
  return post;
};

// Find posts
const findPosts = async function (user, query) {
  const whereQuery = {};

  if (query.type === 'posts' && query.searchQuery !== '') {
    whereQuery.title = new RegExp(query.searchQuery, 'i');
  } else if (query.type === 'comments' && query.searchQuery !== '') {
    whereQuery['comments.content'] = new RegExp(query.searchQuery, 'i');
  } else if (query.searchQuery !== '') {
    whereQuery.$or = [
      { title: new RegExp(query.searchQuery, 'i') },
      { 'comments.content': new RegExp(query.searchQuery, 'i') },
    ];
  }

  if (query.userPost === 'true') {
    whereQuery.userId = user._id;
  }

  // Define the sort options based on sortBy and sortOrder
  const sortOptions = {
    [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
  };

  // Calculate skip and limit for pagination
  const skip = (query.page - 1) * query.limit;
  const { limit } = query;

  const posts = await Post.find(whereQuery)
    .select(['id', 'title', 'createdAt'])
    .populate('userId', 'name')
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(whereQuery);

  return { posts, total };
};

module.exports = { createPost, addComment, postDetails, findPosts };
