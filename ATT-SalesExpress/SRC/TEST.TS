import './polyfills.ts'
import 'zone.js/dist/long-stack-trace-zone'
import 'zone.js/dist/proxy.js'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/jasmine-patch'
import 'zone.js/dist/async-test'
import 'zone.js/dist/fake-async-test'

// typing not available for `__karma__`
declare var __karma__: any
declare var require: any

// prevent Karma from running prematurely.
__karma__.loaded = function () {}

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
])
  // initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    )
  })
  // find all the tests
  .then(() => require.context('./', true, /\.spec\.ts/))
  // load the modules
  .then(context => context.keys().map(context))
  // start Karma to run the tests
  .then(__karma__.start, __karma__.error)
