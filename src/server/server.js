const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const corsOptions = {
    origin: [/.*/],
    credentials: true
};

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Successfully connected to MONGO_URL: " + process.env.MONGO_URL);
}, () => {
    console.error("Error connecting to MONGO_URL: " + process.env.MONGO_URL);
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.send("hello from the angular-gulp-template api server");
});

app.use("/coordinates", require("./routes/coordinates/router"));

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('api server listening on port ' + port);
});
