const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const connectDB = require('./models/db');
const PORT = 5000 || process.env.PORT;

connectDB(); //connect to db

app.use(
  fileUpload({
    createParentPath: true
  })
);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ extended: true })); //for jsondata bodyparsing
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded bodyparsing

app.use('/image', require('./routes/api'));
app.get('/', (req, res) => {
  res.send(`listening to port ${PORT}`);
});

app.listen(PORT, () => console.log(`listening to port ${PORT}........`));
