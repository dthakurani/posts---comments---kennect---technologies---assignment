const mongoose = require('mongoose');

const { Schema } = mongoose;
const schemaTypes = mongoose.Schema.Types;

const userSchema = new Schema(
  {
    id: {
      type: schemaTypes.String,
    },
    email: {
      type: schemaTypes.String,
    },
    name: {
      type: schemaTypes.String,
    },
    password: {
      type: schemaTypes.String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema, 'user');

module.exports = { User };
