const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: new Date()
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {
  Note,
};
