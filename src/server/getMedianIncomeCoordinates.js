const request = require("request");
const async = require("async");
const _ = require("lodash");

function getCoordinateURL({
    latitude,
    longitude
}) {
    return "https://www.broadbandmap.gov/broadbandmap/demographic/2014/coordinates?latitude=" + latitude + "&longitude=" + longitude + "&format=json";
}

const centerCoordinate = {
    latitude: 42.358985,
    longitude: -71.058595
};

class CoordinatesBasedOnCenter {
    constructor({
        centerCoordinate,
        increment,
        rounds
    }) {
        _.assign(this, {
            centerCoordinate,
            increment,
            rounds
        });
    }

    getDataPointsForCenterLocation() {
        const east = this.getIncrementLatitude(1);
        const west = this.getIncrementLatitude(-1);
        const north = this.getIncrementLongitude(1);
        const northEast = this.getIncrementLatitudeAndLongitude({
            latitudeIncrement: 1,
            longitudeIncrement: 1
        });
        const northWest = this.getIncrementLatitudeAndLongitude({
            latitudeIncrement: -1,
            longitudeIncrement: 1
        });
        const south = this.getIncrementLongitude(-1);
        const southEast = this.getIncrementLatitudeAndLongitude({
            latitudeIncrement: 1,
            longitudeIncrement: -1
        });
        const southWest = this.getIncrementLatitudeAndLongitude({
            latitudeIncrement: -1,
            longitudeIncrement: -1
        });
        return [
            east,
            west,
            north,
            south,
            northEast,
            northWest,
            southEast,
            southWest
        ];
    }

    getDataPointsRounds(centerLocation, startingCenterCoordinate) {
        let coordinates = [];
        _.times(this.rounds, () => {
            this.centerCoordinate = centerLocation;
            coordinates = coordinates.concat(this.getDataPointsForCenterLocation());
        });
        this.centerCoordinate = _.cloneDeep(startingCenterCoordinate);
        return coordinates;
    }

    getDataPoints() {
        let coordinates = [];
        const startingCenterCoordinate = _.cloneDeep(this.centerCoordinate);
        coordinates = coordinates.concat(this.getDataPointsRounds(this.getIncrementLatitude(1), startingCenterCoordinate));
        coordinates = coordinates.concat(this.getDataPointsRounds(this.getIncrementLatitude(-1), startingCenterCoordinate));
        coordinates = coordinates.concat(this.getDataPointsRounds(this.getIncrementLongitude(-1), startingCenterCoordinate));
        coordinates = coordinates.concat(this.getDataPointsRounds(this.getIncrementLongitude(1), startingCenterCoordinate));
        return coordinates;
    }

    getIncrementLatitude(incrementDecrement) {
        return this.getIncrementLatitudeOrLongitude({
            latitudeOrLongitude: "latitude",
            incrementDecrement
        });
    }

    getIncrementLongitude(incrementDecrement) {
        return this.getIncrementLatitudeOrLongitude({
            latitudeOrLongitude: "longitude",
            incrementDecrement
        });
    }

    getIncrementLatitudeAndLongitude({
        latitudeIncrement,
        longitudeIncrement
    }) {
        const latitudeIncrementValue = latitudeIncrement * this.increment;
        const longitudeIncrementValue = longitudeIncrement * this.increment;
        return {
            latitude: this.centerCoordinate.latitude + latitudeIncrementValue,
            longitude: this.centerCoordinate.longitude + longitudeIncrementValue
        };
    }

    getIncrementLatitudeOrLongitude({
        latitudeOrLongitude,
        incrementDecrement
    }) {
        const valueToChangeBy = incrementDecrement * this.increment;
        const newCoordinateValue = this.centerCoordinate[latitudeOrLongitude] + valueToChangeBy;
        let newCoordinate = {};
        newCoordinate[latitudeOrLongitude] = newCoordinateValue;
        return _.assign({},
            this.centerCoordinate,
            newCoordinate
        );
    }
}

const coordinatesBasedOnCenter = new CoordinatesBasedOnCenter({
    centerCoordinate,
    increment: 0.007,
    rounds: 20
});

const dataPoints = coordinatesBasedOnCenter.getDataPoints();

const coordinateRequests = _.map(dataPoints, point => {
    return done => {
        request(getCoordinateURL({
            latitude: point.latitude,
            longitude: point.longitude
        }), function(err, response, body) {
            const pickedValues = _.pick(JSON.parse(body).Results, ["medianIncome"]);
            done(err, _.assign({}, pickedValues, point));
        });
    };
});

function sortByMedianIncome(coordinatesData, ascDesc) {
    return coordinatesData.sort((a, b) => {
        const keepObject = ascDesc ? b : a;
        const loseObject = ascDesc ? a : b;
        return keepObject.medianIncome - loseObject.medianIncome;
    });
}

async.parallel(coordinateRequests, (err, coordinatesData) => {
    const sortedByMedianIncomeCoordinatesData = sortByMedianIncome(coordinatesData, 1);
    const sortedByMedianIncomeCoordinatesDataWithoutMedianIncome = _.map(sortedByMedianIncomeCoordinatesData, data => {
        return _.omit(data, "medianIncome");
    });
    console.log(JSON.stringify(sortedByMedianIncomeCoordinatesDataWithoutMedianIncome.slice(0, 100)));
});
