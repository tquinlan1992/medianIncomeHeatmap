const del = require('del');



module.exports = {
    cleanFilesBasedOnMatch: function(matchStr) {
        return function() {
            return del(matchStr);
        };
    }
};
