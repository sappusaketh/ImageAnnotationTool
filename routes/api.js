const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Image = require('../models/Image');

// @route   POST image/addimage
// @desc    Add a Image
// @access  public

router.post('/addimage', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { height, width, text } = req.body;
  try {
    let imageurl;
    if (req.files) {
      let image = req.files.image;
      if (
        !(image.mimetype === 'image/jpeg' || image.mimetype === 'image/png')
      ) {
        return res.status(415).json({ image: 'invalid image type' });
      }
      const date = Date.now();
      imageurl = date + '-' + image.name;
      await image.mv('uploads/' + imageurl);
      imageurl = `http://localhost:5000/images/${imageurl}`;
    }
    let BoundingBox;
    if (req.body.BoundingBox) {
      BoundingBox = JSON.parse(req.body.BoundingBox);
    }

    image = new Image({
      imageurl,
      height,
      width,
      text,
      BoundingBox
    });
    await image.save();
    return res.status(200).send('Image Saved');
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// @route   GET image/getimage/:image_id
// @desc    get image by id
// @access  public

router.get('/getimage/:image_id', async (req, res) => {
  try {
    let image;
    if (req.params.image_id === 'latest') {
      image = await Image.findOne().sort({ _id: -1 });
      if (!image) {
        return res.send('No images added to DB yet');
      }
    } else {
      image = await Image.findById(req.params.image_id);
      if (!image) {
        return res.send('No image found');
      }
    }
    const curId = image._id;
    let nextImage = await Image.find({ _id: { $gt: curId } })
      .select('_id')
      .sort({ _id: 1 })
      .limit(1);
    let prevImage = await Image.find({ _id: { $lt: curId } })
      .select('_id')
      .sort({ _id: -1 })
      .limit(1);
    res.status(200).json({ image, nextImage, prevImage });
  } catch (error) {
    console.log(error.message);
    if ((error.kind = 'objectid')) {
      return res.status(404).send('Image not found');
    }
    res.status(500).send('Internal server error');
  }
});

// @route   POST image/edit/:image_id
// @desc    Edit annotation text, height, width of an image
// @access  public

router.post(
  '/edit/:image_id',
  [
    check('text', 'text is required')
      .not()
      .isEmpty(),
    check('height', 'height is required')
      .not()
      .isEmpty(),
    check('width', 'width is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let image = await Image.findById(req.params.image_id);
      if (!image) {
        return res.status(400).send('Image not found');
      }
      image.text = req.body.text;
      image.height = req.body.height;
      image.width = req.body.width;
      if (req.body.BoundingBox) {
        BoundingBox = req.body.BoundingBox;
      }

      image.BoundingBox.push(...BoundingBox);
      await image.save();
      return res.json(image);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('internal server error');
    }
  }
);
module.exports = router;
