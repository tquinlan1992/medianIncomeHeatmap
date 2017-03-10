// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./tests/protractor/app.spec.js'],
  args: [],
  autoStartStopServer: true,
  debug: false
};
