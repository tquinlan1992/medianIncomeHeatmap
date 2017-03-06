const Server = require('karma').Server;

module.exports = configFile => {
    return done => {
        new Server({
            configFile: configFile,
            singleRun: true
        }, done).start();
    };
};
