const HeatmapMongooseModel = require("./schema");

class HeatMapModel {

    constructor(HeatmapMongooseModel) {
        this.HeatmapMongooseModel = HeatmapMongooseModel;
    }

    getHeatmaps(done) {
        this.HeatmapMongooseModel.find({}, (err, heatmaps) => {
            if (err) {
                done("database error");
            } else {
                done(null, heatmaps);
            }
        });
    }

    addHeatmap({medianIncomeCoordinates, polygonCoordinates, centerCoordinates}, done) {
        const newHeatmap = new this.HeatmapMongooseModel({medianIncomeCoordinates, polygonCoordinates, centerCoordinates});
        newHeatmap.save((err, result) => {
            if (err) {
                done("database error");
            } else {
                done(null, result);
            }
        });
    }

    getHeatmap({id}, done) {
        this.HeatmapMongooseModel.findOne({id}, (err, heatmap) => {
            if (err) {
                done("database error");
            } else {
                done(null, heatmap);
            }
        });
    }
}

module.exports = new HeatMapModel(HeatmapMongooseModel);
