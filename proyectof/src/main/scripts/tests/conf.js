exports.config = {
  framework: 'jasmine',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '../node_modules/selenium-standalone-jar/bin/selenium-server-standalone-3.0.1.jar',
  specs: ['spec.js'],
  multiCapabilities: [{
        browserName: 'firefox',
        chromeOptions: {
            args: [
                '--disable-blink-features=BlockCredentialedSubresources', // needed for authentication
                '--headless', '--disable-gpu', '--window-size=1920x1040'
            ]
        }
    }]
}
