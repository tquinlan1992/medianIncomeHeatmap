const express = require("express");
const router = express.Router();
const getMedianIncomeCoordinates = require("./getMedianIncomeCoordinates");
const _ = require("lodash");
const heatmapModel = require("../../models/heatmap/model");

// home page route (http://localhost:8080)
function getCenterCordinateFromRequest(req) {
    const centerCoordinate = _.pick(req.query, ["latitude", "longitude"]);
    centerCoordinate.latitude = Number(centerCoordinate.latitude);
    centerCoordinate.longitude = Number(centerCoordinate.longitude);
    return centerCoordinate;
}
router.get('/heatmapCoordinates', (req, res) => {
    const centerCoordinate = getCenterCordinateFromRequest(req);
    getMedianIncomeCoordinates.getSortedSlicedCoordinates({
        centerCoordinate
    }, coordinates => {
        res.json(coordinates);
    });
});

router.get('/polygonCoordinates', (req, res) => {
    const centerCoordinate = getCenterCordinateFromRequest(req);
    const polygonCordinates = getMedianIncomeCoordinates.getPolygonCoordinatesBasedOnCenter(centerCoordinate);
    res.json(polygonCordinates);
});

router.get('/', (req, res) => {
    heatmapModel.getHeatmaps((err, heatmaps) => {
        if (err) {
            res.send(err);
        } else {
            res.json(heatmaps);
        }
    });
});

router.put('/', (req, res) => {
    const medianIncomeCoordinates = req.body.medianIncomeCoordinates;
    const polygonCoordinates = req.body.polygonCoordinates;
    const centerCoordinates = req.body.centerCoordinates;
    heatmapModel.addHeatmap({
        medianIncomeCoordinates,
        polygonCoordinates,
        centerCoordinates
    }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const heatmapId = req.params.id;
    heatmapModel.getHeatmap(heatmapId, (err, heatmap) => {
        if (err) {
            res.send(err);
        } else {
            res.json(heatmap);
        }
    });
});

module.exports = router;
