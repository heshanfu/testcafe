var os = require('os');

var isTravisEnvironment = !!process.env.TRAVIS;
var hostname            = isTravisEnvironment ? os.hostname() : '127.0.0.1';

var browserProviderNames = {
    sauceLabs:    'sauceLabs',
    browserstack: 'browserstack'
};

var testingEnvironmentNames = {
    osXDesktopAndMSEdgeBrowsers: 'osx-desktop-and-ms-edge-browsers',
    mobileBrowsers:              'mobile-browsers',
    localBrowsersAppveyor:       'local-browsers-appveyor',
    localBrowsers:               'local-browsers',
    localHeadlessBrowsers:       'local-headless-browsers',
    oldBrowsers:                 'old-browsers',
    legacy:                      'legacy'
};

var testingEnvironments = {};

testingEnvironments[testingEnvironmentNames.osXDesktopAndMSEdgeBrowsers] = {
    jobName: 'functional tests - OS X desktop and MS edge browsers',

    browserstack: {
        username:  process.env.BROWSER_STACK_USERNAME,
        accessKey: process.env.BROWSER_STACK_ACCESS_KEY
    },

    browsers: [
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'safari',
            alias:     'safari'
        },
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'chrome',
            alias:     'chrome-osx'
        },
        {
            os:        'OS X',
            osVersion: 'Sierra',
            name:      'firefox',
            alias:     'firefox-osx'
        },
        {
            os:        'Windows',
            osVersion: '10',
            name:      'edge',
            alias:     'edge',
        }
    ]
};

testingEnvironments[testingEnvironmentNames.mobileBrowsers] = {
    jobName: 'functional tests - mobile browsers',

    browserstack: {
        username:  process.env.BROWSER_STACK_USERNAME,
        accessKey: process.env.BROWSER_STACK_ACCESS_KEY
    },

    browsers: [
        {
            realMobile: true,
            os:         'android',
            osVersion:  '7.1',
            device:     'Google Pixel',
            name:       'Android',
            alias:      'android'
        },
        {
            realMobile: true,
            os:         'ios',
            osVersion:  '11.2',
            device:     'iPad Pro',
            name:       'Mobile Safari',
            alias:      'ipad'
        },
        {
            realMobile: true,
            os:         'ios',
            osVersion:  '10.3',
            device:     'iPhone 7 Plus',
            name:       'Mobile Safari',
            alias:      'iphone'
        }
    ]
};

testingEnvironments[testingEnvironmentNames.localBrowsers] = {
    isLocalBrowsers: true,

    browsers: [
        {
            platform:    'Windows 10',
            browserName: 'chrome',
            alias:       'chrome'
        },
        {
            platform:    'Windows 10',
            browserName: 'ie',
            version:     '11.0',
            alias:       'ie'
        },
        {
            platform:    'Windows 10',
            browserName: 'firefox',
            alias:       'firefox'
        }
    ]
};

testingEnvironments[testingEnvironmentNames.localBrowsersAppveyor] = {
    isLocalBrowsers: true,

    browsers: [
        {
            platform:    'Windows 10',
            browserName: 'ie',
            version:     '11.0',
            alias:       'ie'
        }
    ]
};

testingEnvironments[testingEnvironmentNames.localHeadlessBrowsers] = {
    isLocalBrowsers: true,

    browsers: [
        {
            platform:    'Windows 10',
            browserName: 'chrome:headless --no-sandbox',
            userAgent:   'headlesschrome',
            alias:       'chrome'
        },
        {
            platform:    'Windows 10',
            browserName: 'firefox:headless:disableMultiprocessing=true',
            alias:       'firefox'
        }
    ]
};

testingEnvironments[testingEnvironmentNames.oldBrowsers] = {
    jobName: 'functional tests - ms desktop browsers',

    sauceLabs: {
        username:  process.env.SAUCE_USERNAME_FUNCTIONAL_DESKTOP,
        accessKey: process.env.SAUCE_ACCESS_KEY_FUNCTIONAL_DESKTOP,

    },

    browsers: [
        {
            platform:    'Windows 8',
            browserName: 'internet explorer',
            version:     '10.0',
            alias:       'ie 10'
        },
        {
            platform:    'Windows 7',
            browserName: 'internet explorer',
            version:     '9.0',
            alias:       'ie 9'
        }
    ]
};

testingEnvironments[testingEnvironmentNames.legacy] = {
    isLocalBrowsers: true,

    browsers: [
        {
            platform:    'Windows 10',
            browserName: 'chrome',
            alias:       'chrome'
        },
        {
            platform:    'Windows 10',
            browserName: 'ie',
            version:     '11.0',
            alias:       'ie'
        }
    ]
};


module.exports = {
    get currentEnvironment () {
        var environmentName = process.env.TESTING_ENVIRONMENT || this.testingEnvironmentNames.localBrowsers;

        return this.testingEnvironments[environmentName];
    },

    get useLocalBrowsers () {
        return this.currentEnvironment.isLocalBrowsers;
    },

    testingEnvironmentNames: testingEnvironmentNames,
    testingEnvironments:     testingEnvironments,
    browserProviderNames:    browserProviderNames,

    testCafe: {
        hostname: hostname,
        port1:    2000,
        port2:    2001
    },

    site: {
        viewsPath: './test/functional/',
        ports:     {
            server1:                3000,
            server2:                3001,
            basicAuthServer:        3002,
            ntlmAuthServer:         3003,
            trustedProxyServer:     3004,
            transparentProxyServer: 3005
        }
    },

    browserstackConnectorServicePort: 4000,

    browsers: []
};
