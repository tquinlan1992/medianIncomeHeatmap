const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

const corsOptions = {
  origin: [/.*/],
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/sample.json", (req, res) => {
    res.json({
        firstName: "Tom",
        lastName: "Quinlan"
    });
});

app.get("/", (req, res) => {
    res.send("hello from the angular-gulp-template api server");
});

var port = process.env.ADMIN_PORTAL_PORT || 3000;

app.listen(port, function(){
  console.log('api server listening on port '+ port);
});
