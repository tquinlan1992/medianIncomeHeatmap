const express = require("express");
const router = express.Router();
const getMedianIncomeCoordinates = require("./getMedianIncomeCoordinates");
const _ = require("lodash");

let cache = null;
// home page route (http://localhost:8080)
function getCenterCordinateFromRequest(req) {
    const centerCoordinate = _.pick(req.query, ["latitude", "longitude"]);
    centerCoordinate.latitude = Number(centerCoordinate.latitude);
    centerCoordinate.longitude = Number(centerCoordinate.longitude);
    return centerCoordinate;
}
router.get('/heatmapCoordinates', (req, res) => {
    if (cache) {
        res.json(cache);
        return;
    }
    const centerCoordinate = getCenterCordinateFromRequest(req);
    getMedianIncomeCoordinates.getSortedSlicedCoordinates({centerCoordinate}, coordinates => {
        cache = coordinates;
        res.json(coordinates);
    });
});

router.get('/polygonCoordinates', (req, res) => {
    const centerCoordinate = getCenterCordinateFromRequest(req);
    const polygonCordinates = getMedianIncomeCoordinates.getPolygonCoordinatesBasedOnCenter(centerCoordinate);
    res.json(polygonCordinates);
});

module.exports = router;
