const mongoose = require("mongoose");

const requiredNumber = {
    type: Number,
    required: true
};

const coordinateSchema = {
    latitude: requiredNumber,
    longitude: requiredNumber
};

const schema = {
    centerCoordinates: {
        type: coordinateSchema,
        required: true
    },
    medianIncomeCoordinates: {
        type: [coordinateSchema],
        required: true
    },
    polygonCoordinates: {
        type: [coordinateSchema],
        required: true
    }
};

const mongooseSchema = new mongoose.Schema(schema);
const HeatmapMongooseModel = mongoose.model('Heatmap', mongooseSchema);

module.exports = HeatmapMongooseModel;
