var express = require("express");
const uploadImg = require("../middleware/uploadImg");
const artworkController = require("../controllers/artworkController");
var router = express.Router();

// localhost:3000/artwork/new
router.get("/new", artworkController.showArtworkForm);

// localhost:3000/artwork/new
router.post("/new", uploadImg("artwork"), artworkController.addArtwork);

// localhost:3000/artwork/edit/:artwork_id
router.get("/edit/:artwork_id", artworkController.showArtEditor);

// localhost:3000/artwork/edit/:artwork_id
router.post("/edit/:artwork_id", artworkController.editArtwork);

// localhost:3000/artwork/delete/:artist_id/:artwork_id
router.get("/delete/:artist_id/:artwork_id", artworkController.deleteArtwork);

module.exports = router;
