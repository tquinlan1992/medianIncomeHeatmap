const express = require("express");
const router = express.Router();
const getMedianIncomeCoordinates = require("./getMedianIncomeCoordinates");
const _ = require("lodash");

// home page route (http://localhost:8080)
function getCenterCordinateFromRequest(req) {
    const centerCoordinate = _.pick(req.query, ["latitude", "longitude"]);
    centerCoordinate.latitude = Number(centerCoordinate.latitude);
    centerCoordinate.longitude = Number(centerCoordinate.longitude);
    return centerCoordinate;
}
router.get('/heatmapCoordinates', (req, res) => {
    const centerCoordinate = getCenterCordinateFromRequest(req);
    getMedianIncomeCoordinates.getSortedSlicedCoordinates({centerCoordinate}, coordinates => {
        res.json(coordinates);
    });
});

router.get('/polygonCoordinates', (req, res) => {
    const centerCoordinate = getCenterCordinateFromRequest(req);
    const polygonCordinates = getMedianIncomeCoordinates.getPolygonCoordinatesBasedOnCenter(centerCoordinate);
    res.json(polygonCordinates);
});

module.exports = router;
