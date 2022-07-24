var express = require("express");
const emailController = require("../controllers/emailController");
var router = express.Router();

// localhost:3000/email/contact
router.get("/contact", emailController.sendEmail);

module.exports = router;
