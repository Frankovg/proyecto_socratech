const multer = require("multer");

function uploadImage(folder) {
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,

    filename: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("img");

  return upload;
}

module.exports = uploadImage;
