'use strict';

angular.module('bysLib', ['ngCookies', 'ui.bootstrap']);
angular.module('headerModule', []);
angular.module('footerModule', []);
angular.module('commonModule', ['ngSanitize']);
angular.module('configurationModule', ['bysLib', 'ui.router', 'ui.select', 'ngTouch']);
angular.module('pesModule', ['bysLib', 'ui.router', 'ui.select', 'ngTouch']);
angular.module('selectModule', ['ui.router']);
angular.module('dealerModule', ['ui.router']);
angular.module('applyModule', ['ui.router']);
angular.module('summaryModule', ['ngTouch']);
angular.module('summaryBarModule', ['bysLib']);
angular.module('errorModule', ['bysLib', 'ui.bootstrap']);

angular.module('bysApp', [
	// 'ngAnimate',
	// 'ngCookies',
	// 'ngResource',
	// 'ngRoute',
	// 'ngSanitize',
	// 'ngTouch',
	'ui.router',
	'bysLib',
	'headerModule',
	'footerModule',
	'commonModule',
	'configurationModule',
	'pesModule',
	'selectModule',
	'dealerModule',
	'applyModule',
	'summaryModule',
	'summaryBarModule',
	'errorModule',
	'ui.bootstrap',
	'ng.deviceDetector'
]).constant('APP_NAME', 'bysApp');
