var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var HOTELS_COLLECTION = "hotels";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var mongoURI = process.env.MONGODB_URI;

if(!mongoURI){
    mongoURI = 'mongodb://heroku_x4tjb2tf:f0hcnsenq2q9ov1ikta8kfp3nk@ds139979.mlab.com:39979/heroku_x4tjb2tf';
}

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(mongoURI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// HOTELS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/api/hotels"
 *    GET: finds all hotels
 *    POST: creates a new hotel
 */

app.get("/api/hotels", function (req, res) {
    db.collection(HOTELS_COLLECTION).find({}).toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get hotels.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/hotels", function (req, res) {
    var newHotel = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    }

    db.collection(HOTELS_COLLECTION).insertOne(newHotel, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new hotel.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/hotels/:id"
 *    GET: find hotel by id
 *    PUT: update hotel by id
 *    DELETE: deletes hotel by id
 */

app.get("/api/hotels/:id", function (req, res) {
    db.collection(HOTELS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get hotel");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/hotels/:id", function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(HOTELS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update hotel");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/hotels/:id", function (req, res) {
    db.collection(HOTELS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete hotel");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});