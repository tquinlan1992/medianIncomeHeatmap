const express = require("express");
const router = express.Router();
const getMedianIncomeCoordinates = require("./getMedianIncomeCoordinates");
let cache = null;
// home page route (http://localhost:8080)
router.get('/points', function(req, res) {
    if (cache) {
        res.json(cache);
        return;
    }
    console.log("req.query.latitude", req.query.latitude);
    console.log("req.query.longitude", req.query.longitude);
    getMedianIncomeCoordinates.getSortedSlicedCoordinates(coordinates => {
        cache = coordinates;
        res.json(coordinates);
    });
});

module.exports = router;
