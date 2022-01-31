const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StandardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: false,
    default: '',
    trim: true,
  },
  format: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('EBook', StandardSchema)