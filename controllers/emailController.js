// const connection = require("../config/db");

class EmailController {
  // FORM PARA ENVIAR UN EMAIL CON UN SERVIDOR EXTERNO
  sendEmail = (req, res) => {
    console.log(req);
    res.render("emailForm");
    // res.send("Hola Mundo");
  };
}

module.exports = new EmailController();
