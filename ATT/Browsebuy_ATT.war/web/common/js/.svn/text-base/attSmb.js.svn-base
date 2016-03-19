/**
 * Created with IntelliJ IDEA.
 * User: tl2451
 * Date: 4/4/13
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */


/* Only namespace for the whole small business project */
var ATTSMB = ATTSMB || {};


/**
 *  Common javascript object
 *  It executes once the DOM is loaded
 **/

ATTSMB.Common = ATTSMB.Common || {};

ATTSMB.Common.init = function () {

    // Avoid 'console' errors in browsers that lack a console.
    (function () {
        var method,
                noop = function noop() {
                },
                methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                    'timeStamp', 'trace', 'warn'
                ],
                length = methods.length,
                console = ( window.console = window.console || {});

        while ( length-- ) {
            method = methods[length];

            if ( !console[method] ) {
                console[method] = noop;
            }
        }
    }());    
}


/**
 *  Util javascript object
 *
 **/

ATTSMB.Util = ATTSMB.Util || {};

/* Util exec function */
ATTSMB.Util.exec = function ( controler, action ) {
    var ns = ATTSMB,
            action = ( action === undefined ) ? "init" : action;

    if ( controler !== "" && ns[controler] &&
            typeof ns[controler][action] == "function" ) {
        ns[controler][action]();
    }
}

/* Util init function */

ATTSMB.Util.init = function () {
    var body = document.body,
            controller = body.getAttribute( "data-controller" ),
            action = body.getAttribute( "data-action" );

    ATTSMB.Util.exec( "Common" );
    ATTSMB.Util.exec( controller );
    ATTSMB.Util.exec( controller, action );
}

ATTSMB.Global = ATTSMB.Global || {};

ATTSMB.BNB = ATTSMB.BNB || {};
