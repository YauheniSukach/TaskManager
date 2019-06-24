const express = require("express");
const images = express.Router();
const cors = require("cors");
const Image = require("../models/Image");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const fs = require("fs");

images.use(cors());

images.post("/upload", upload.single('myFile'), (req, res) => {
  const newImage = new Image();
  newImage.img.data = fs.readFileSync(req.file);
  newImage.img.contentType = 'image/png';

  newImage.save()
    .then(() => {
      res.status(200).send("Image uploaded");
    })
    .catch(err => {
      res.status(400).send("error:" + err);
    });
});

module.exports = images;
