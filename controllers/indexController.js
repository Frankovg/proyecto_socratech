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

    let sqlUser = `SELECT * FROM artist WHERE artist_id = ${artist_id}`;
    let sqlIndex = "SELECT * FROM artist";

    connection.query(sqlUser, (error1, resultUser) => {
      if (error1) throw error1;

      connection.query(sqlIndex, (error2, resultIndex) => {
        if (error2) throw error2;
        res.render("indexUser", { resultUser, resultIndex });
      });
    });
  };
}

module.exports = new IndexController();
