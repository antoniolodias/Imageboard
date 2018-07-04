const express = require("express");
const app = express();
const db = require("./db.js");
const s3 = require("./s3");
const config = require("./config");
const bodyParser = require("body-parser");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.use(bodyParser.json());

//-------------------------------------------
//DONT TOUCH
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//DONT TOUCH
//------------------------------------------------

app.get("/images", (req, res) => {
    db.getImages().then(results => {
        res.json({
            images: results.rows
        });
    });
});

app.get("/images/:morepictures", (req, res) => {
    db.morePicturesBitte(req.params.morepictures).then(results => {
        res.json({
            images: results.rows
        });
    });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    db
        .saveImage(
            config.s3Url + req.file.filename,
            req.body.username,
            req.body.title,
            req.body.description,
            req.body.id
        )
        .then(function(results) {
            res.json({
                img: config.s3Url + req.file.filename,
                username: req.body.username,
                title: req.body.title,
                description: req.body.description,
                id: results.rows[0].id
            });
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/image/:id", function(req, res) {
    Promise.all([
        db.getImageById(req.params.id),
        db.getCommentsById(req.params.id)
    ]).then(([imageResults, commentResults]) => {
        imageResults.rows[0].image = config.s3Url + imageResults.rows[0].image;
        res.json({
            image: imageResults.rows[0],
            comments: commentResults.rows
        });
    });
});

app.post("/comments", function(req, res) {
    db
        .uploadComments(req.body.username, req.body.comment, req.body.image_id)
        .then(function(results) {
            res.json(results.rows[0]);
        })
        .catch(function(err) {
            console.log("post route error in index.js: ", err);
        });
});

app.listen(8080, () => console.log("Im listening"));
