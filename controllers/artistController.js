const connection = require("../config/db");
const bcrypt = require("bcrypt");

class ArtistController {
  // Render registro de artista
  joinForm = (req, res) => {
    res.render("addArtist", { message: "" });
  };

  //Obtener datos de registro de artista
  newArtist = (req, res) => {
    let { name, surname, artistic_name, email, password, style, phone_number } =
      req.body;

    if (
      name == "" ||
      surname == "" ||
      artistic_name == "" ||
      email == "" ||
      password == ""
    ) {
      res.render("addArtist");

      return;
    }

    let searchEmail = `SELECT email FROM artist WHERE email = "${email}"`;

    connection.query(searchEmail, (error1, resultEmail) => {
      if (error1) throw error1;

      if (resultEmail == "") {
        let sql = "";
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          sql = `INSERT INTO artist (name, surname, artistic_name, email, password, style, phone_number) VALUES ("${name}", "${surname}", "${artistic_name}", "${email}", "${hash}", "${style}", "${phone_number}")`;

          if (req.file != undefined) {
            let img = req.file.filename;
            sql = `INSERT INTO artist (name, surname, artistic_name, email, password, style, phone_number, picture) VALUES ("${name}", "${surname}", "${artistic_name}", "${email}", "${hash}", "${style}", "${phone_number}", "${img}")`;
          }

          connection.query(sql, (error2, result) => {
            if (error2) throw error2;
            res.redirect("/artist/login");
          });
        });
      } else {
        res.render("addArtist", { message: "Account already exist." });
      }
    });
  };

  // View de login
  viewLogin = (req, res) => {
    res.render("login", { message: "" });
  };

  // Obtener datos para loguearse
  artistLogin = (req, res) => {
    let { email, password } = req.body;

    let sql = `SELECT * FROM artist WHERE email = "${email}"`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);
      if (result.length == 1) {
        let encryptedPass = result[0].password;
        bcrypt.compare(password, encryptedPass, (err, resComparePass) => {
          if (resComparePass) {
            console.log(result[0].artist_id);
            res.redirect("/" + result[0].artist_id);
          } else {
            res.render("login", { message: "¡Wrong password!" });
          }
        });
      } else {
        res.render("login", { message: "Email doesn't match" });
      }
    });
  };

  // Muestra view de un solo artista
  showArtistProfile = (req, res) => {
    let artist_id = req.params.artist_id;

    let sql = `SELECT concat(artist.name, " ", artist.surname) AS fullname, artist.artistic_name, artist.email, artist.style, artist.phone_number, artist.picture, artwork.* FROM artist LEFT JOIN artwork ON artist.artist_id = artwork.artist_id WHERE artist.artist_id = ${artist_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      let groupOfArtwork = [];
      let artwork = {};
      let finalResult = {};

      result.forEach((art) => {
        artwork = {
          artwork_id: art.artwork_id,
          title: art.title,
          description: art.description,
          image: art.image,
          artist_id: art.artist_id,
        };

        groupOfArtwork.push(artwork);
      });

      finalResult = {
        artist_id: artist_id,
        name: result[0].fullname,
        artistic_name: result[0].artistic_name,
        email: result[0].email,
        style: result[0].style,
        phone_number: result[0].phone_number,
        picture: result[0].picture,
        artwork: groupOfArtwork,
      };

      // console.log(finalResult.artwork[0].title);

      res.render("artist", { finalResult });
    });
  };

  //MOSTRAR EDITOR DE USUARIO
  editForm = (req, res) => {
    let artist_id = req.params.artist_id;

    let sql = `SELECT * FROM artist WHERE artist_id = ${artist_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editArtist", { result });
    });
  };

  //CAMBIAR DATOS DE ARTISTA
  editArtist = (req, res) => {
    let artist_id = req.params.artist_id;

    let { name, surname, artistic_name, phone_number, style, email } = req.body;

    let sql = `UPDATE artist SET name = "${name}", surname = "${surname}", artistic_name = "${artistic_name}", email = "${email}", style = "${style}", phone_number = "${phone_number}" WHERE artist_id = ${artist_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE artist SET name = "${name}", surname = "${surname}", artistic_name = "${artistic_name}", email = "${email}", style = "${style}", phone_number = "${phone_number}" WHERE artist_id = ${artist_id}, picture = "${img}"`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/artist/${artist_id}`);
    });
  };

  // MOSTRAR CAMBIAR PASSWORD
  showNewPassForm = (req, res) => {
    let artist_id = req.params.artist_id;

    let sql = `SELECT concat(artist.name, " ", artist.surname) AS fullname, artist.artist_id FROM artist WHERE artist_id = ${artist_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("changePassword", { result, mesaje: "" });
    });
  };

  // CAMBIAR PASSWORD
  changePassword = (req, res) => {
    let artist_id = req.params.artist_id;

    let { password, new_password, repeat_password } = req.body;

    let sql = `SELECT * FROM artist WHERE artist_id = "${artist_id}"`;

    if (new_password == repeat_password) {
      connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length == 1) {
          let encryptedPass = result[0].password;
          bcrypt.compare(password, encryptedPass, (err, resComparePass) => {
            if (resComparePass) {
              let sql2 = "";
              bcrypt.hash(new_password, 10, (err, hash) => {
                if (err) throw err;
                sql2 = `UPDATE artist SET password = "${hash}"`;

                connection.query(sql2, (error2, result2) => {
                  if (error2) throw error2;
                  res.redirect(`/artist/${artist_id}`);
                });
              });
            } else {
              res.redirect(`/artist/wrong_password/${artist_id}`);
            }
          });
        }
      });
    } else {
      res.redirect(`/artist/wrong_password/${artist_id}`);
    }
  };

  // VISTA CON MENSAJE DE ERROR DE CONSTRASEÑA
  showPasswordError = (req, res) => {
    let artist_id = req.params.artist_id;

    let sql = `SELECT artist_id FROM artist WHERE artist_id = ${artist_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("wrongPassword", { result });
    });
  };
}

module.exports = new ArtistController();
