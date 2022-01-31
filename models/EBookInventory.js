const mongoose = require("mongoose");
const Schema = mongoose.Schema

const StandardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  book: {
		type: Schema.Types.ObjectId,
		ref: 'EBook',
		required: true,
	},
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
});

module.exports = mongoose.model('EBookInventory', StandardSchema)