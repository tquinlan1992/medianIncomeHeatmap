const del = require('del');



module.exports = function(matchStr) {
    return function() {
        return del(matchStr);
    };
};
