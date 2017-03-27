const async = require("async");
const getLanguageJSON = require("./resourceLanguages/getLanguageJSON");

async.series([
    done => {
        getLanguageJSON(done);
    },
    done => {
        require("./appIndex");
        done();
    }
]);
