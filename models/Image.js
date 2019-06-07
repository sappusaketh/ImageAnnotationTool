const mongoose = require('mongoose');

const ImageSchema = {
  imageurl: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  height: {
    type: Number
  },
  width: {
    type: Number
  },
  BoundingBox: [
    {
      posInPercent: {
        type: Object
      },
      posInPixel: {
        type: Object
      }
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now()
  }
};

module.exports = Image = mongoose.model('Images', ImageSchema);
