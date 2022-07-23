const connection = require("../config/db");

class IndexController {
  // Render home con todos los artistas
  showHome = (req, res) => {
    let sql = "SELECT * FROM artist";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };

  // HOME CON DATOS DE USUARIO LOGUEADO
  showHomeUser = (req, res) => {
    let artist_id = req.params.artist_id;

    let sql = "SELECT * FROM artist";
    // let sql = `SELECT artistic_name FROM artist WHERE artist_id = "${artist_id}"`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("indexUser", { result });
    });
  };
}

module.exports = new IndexController();
