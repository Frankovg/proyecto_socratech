const connection = require("../config/db");

class ArtworkController {
  // Mostrar formulario para nuevo arte
  showArtworkForm = (req, res) => {
    let sql = `SELECT artist_id, artistic_name FROM artist ORDER BY artistic_name ASC`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("addArtwork", { result });
    });
  };

  // Agregar datos de nuevo arte
  addArtwork = (req, res) => {
    let { title, artist_id, description } = req.body;
    let img = req.file.filename;

    if (title == "" || artist_id == "" || description == "" || img == "") {
      res.render("addArtwork");

      return;
    }

    let sql = `INSERT INTO artwork (title, description, image, artist_id) VALUES ("${title}", "${description}", "${img}", ${artist_id})`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/artist/${artist_id}`);
    });
  };

  // Mostrar editor de arte
  showArtEditor = (req, res) => {
    let artwork_id = req.params.artwork_id;

    let sql = `SELECT artwork.artwork_id, artwork.title, artwork.description, artwork.image, artist.artistic_name, artist.artist_id FROM artist LEFT JOIN artwork ON artist.artist_id = artwork.artist_id AND artwork.artwork_id = ${artwork_id} ORDER BY artwork_id DESC`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      // console.log(result);
      res.render("editArtwork", { result });
    });
  };

  // Actualizar datos de arte
  editArtwork = (req, res) => {
    let artwork_id = req.params.artwork_id;

    let { title, artist_id, description } = req.body;

    let sql = `UPDATE artwork SET title = "${title}", description = "${description}", artist_id = ${artist_id} WHERE artwork_id = ${artwork_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/artist/${artist_id}`);
    });
  };

  // Eliminar arte
  deleteArtwork = (req, res) => {
    let { artist_id, artwork_id } = req.params;

    let sql = `DELETE FROM artwork WHERE artwork_id = ${artwork_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/artist/${artist_id}`);
    });
  };
}

module.exports = new ArtworkController();
