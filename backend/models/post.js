const mongoose = require('mongoose');

const { Schema } = mongoose;
const schemaTypes = mongoose.Schema.Types;

const commentSchema = new Schema(
  {
    id: {
      type: schemaTypes.String,
    },
    userId: {
      type: schemaTypes.String,
      ref: 'User',
    },
    content: {
      type: schemaTypes.String,
    },
  },
  { timestamps: true },
);

const postSchema = new Schema(
  {
    id: {
      type: schemaTypes.String,
    },
    userId: {
      type: schemaTypes.String,
      ref: 'User',
    },
    title: {
      type: schemaTypes.String,
    },
    content: {
      type: schemaTypes.String,
    },
    comments: [commentSchema],
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema, 'post');
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Post, Comment };
