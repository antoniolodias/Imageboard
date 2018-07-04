var spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/imageboard"
);

exports.getImages = function() {
    return db.query(`SELECT * FROM images
        ORDER BY id DESC
        LIMIT 8;`);
};

exports.morePicturesBitte = function(id) {
    return db.query(
        `
        SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 4`,
        [id]
    );
};

exports.saveImage = function(url, username, title, description) {
    return db.query(
        `
        INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING url, username, title, description, id
        `,
        [url, username || null, title || null, description || null]
    );
};

exports.getImageById = function(id) {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};


exports.getCommentsById = function(id) {
    return db.query(`SELECT * FROM comments WHERE image_id = $1`, [id]);
};

exports.uploadComments = function(username, comment, imageId) {
    return db.query(
        `INSERT INTO comments (username, comment, image_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
        [username, comment, imageId]
    );
};
