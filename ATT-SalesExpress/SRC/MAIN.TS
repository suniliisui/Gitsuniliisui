import './polyfills'
import './vendor'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { environment } from './environments/environment'
import { AppModule } from './app/'
import { KitchenSinkModule } from './kitchensink/'

import { Logger, LoggerConfig } from './app/se-util/log'

const log = Logger.tag('main')

if (environment.production) {
  log.info('*** PRODUCTION MODE ENABLED *** ')
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(location.pathname === '/kitchensink.html'
  ? KitchenSinkModule
  : AppModule)
