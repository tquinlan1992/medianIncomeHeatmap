const Server = require('karma').Server;

module.exports = configFile => {
    return () => {
        new Server({
            configFile: configFile,
            singleRun: true
        }).start();
    };
};
