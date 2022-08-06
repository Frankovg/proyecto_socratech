CREATE DATABASE digiart;
USE digiart;

-- DROP TABLE artist;

-- DROP TABLE artwork;

CREATE TABLE artist (
	artist_id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    artistic_name VARCHAR(45),
	email VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    style VARCHAR(250) NOT NULL,
    phone_number VARCHAR(12) NOT NULL,
    picture VARCHAR(100) DEFAULT "avatar.svg"
);

CREATE TABLE artwork (
	artwork_id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    image VARCHAR(100) NOT NULL,
    artist_id SMALLINT NOT NULL,
    
    CONSTRAINT fr_artist_1 FOREIGN KEY (artist_id)
    REFERENCES artist(artist_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- SELECT * FROM artist;
-- SELECT * FROM artwork;

-- DATOS DE PRUEBA PARA LA TABLA artist
INSERT INTO artist (name, surname, artistic_name, email, password, style, phone_number)
	VALUES ("Juan", "Álvarez", "elZorro", "zorro@zorro.com", "12345", "galáctico, futurista", "123456789");
INSERT INTO artist (name, surname, artistic_name, email, password, style, phone_number)
	VALUES ("Silvia", "Suarez", "Miku16", "miku@miku.com", "00000", "paisajismo, fotorealista", "987654321");
    
-- DATOS DE PRUEBA PARA LA TABLA artwork
INSERT INTO artwork (title, description, image, artist_id)
	VALUES ("Starlight", "Nave espacial Starlight reposando en el espacio", "starlight.jpg", 1);
INSERT INTO artwork (title, description, image, artist_id)
	VALUES ("Cascade", "Paisaje ficticio de un bosque con un lago y una cascada", "cascade.jpg", 2);
    
    
-- CONSULTA DE PRUEBA
/*
SELECT artwork.title, artwork.description, artist.name FROM artist, artwork
WHERE artist.artist_id = artwork.artist_id;

SELECT * FROM artist WHERE email = "sahra@connor.com";

SELECT concat(artist.name, " ", artist.surname) AS fullname, artist.artistic_name, artist.email, artist.style, artist.phone_number, artist.picture, artwork.*
FROM artist
	LEFT JOIN artwork ON artist.artist_id = artwork.artist_id
WHERE artist.artist_id = 4;


SELECT artist.password FROM artist WHERE artist_id = 2;

SELECT artist_id, artistic_name FROM artist ORDER BY artistic_name ASC;

SELECT artwork.*, artist.artistic_name FROM artwork, artist
WHERE artist.artist_id = artwork.artist_id
AND artwork_id = 2;

SELECT artwork.artwork_id, artwork.title, artwork.description, artwork.image, artist.artistic_name, artist.artist_id
FROM artist
	LEFT JOIN artwork ON artist.artist_id = artwork.artist_id
AND artwork.artwork_id = 2
ORDER BY artwork_id DESC;

SELECT * FROM artist WHERE artist_id = 6;

SELECT * FROM artist ORDER BY artistic_name ASC;

SELECT name FROM artist WHERE artist_id = 6;
*/
