var express = require("express");
const indexController = require("../controllers/indexController");
var router = express.Router();

// localhost:3000/
router.get("/", indexController.showHome);

//localhost:3000/:artist_id
router.get("/:artist_id", indexController.showHomeUser);

module.exports = router;
