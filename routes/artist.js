var express = require("express");
const uploadImg = require("../middleware/uploadImg");
const artistController = require("../controllers/artistController");
var router = express.Router();

// localhost:3000/artist/join
router.get("/join", artistController.joinForm);

// localhost:3000/artist/join
router.post("/join", uploadImg("artist"), artistController.newArtist);

// localhost:3000/artist/login
router.get("/login", artistController.viewLogin);

// localhost:3000/artist/login
router.post("/login", artistController.artistLogin);

// localhost:3000/artist/account/:artist_id
router.get("/account/:artist_id", artistController.showArtistProfile);

// localhost:3000/artist/:artist_id
router.get("/:artist_id", artistController.showArtistProfile);

// localhost:3000/artist/edit/:artist_id
router.get("/edit/:artist_id", artistController.editForm);

// localhost:3000/artist/edit/:artist_id
router.post(
  "/edit/:artist_id",
  uploadImg("artist"),
  artistController.editArtist
);

// localhost:3000/artist/change_password/:artist_id
router.get("/change_password/:artist_id", artistController.showNewPassForm);

// localhost:3000/artist/change_password/:artist_id
router.post("/change_password/:artist_id", artistController.changePassword);

//localhost:3000/artist/wrong_password/:artist_id
router.get("/wrong_password/:artist_id", artistController.showPasswordError);

// localhost:3000/artist/delete/:artist_id
router.get("/delete/:artist_id", artistController.deleteAccount);

module.exports = router;
