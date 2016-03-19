/**
 * Syndication configuration file.
 */

/*eslint-disable no-unused-expressions*/
(function ScionSyndication(config) {

  'use strict';

  var

  /**
   * ENVS
   */
  ENVS = {
    'local': '//local.scion.com',
    'staging': '//staging.scion.com',
    'prod': '//www.scion.com',
    '2astaging': '//scionbys.hitachi.2aprojects.com',
  },

  /**
   * CURRENT ENV
   */
  ENV = ENVS[config.environment] || ENVS.local,

  /**
   * CONSTANTS
   */
  CONST = {
    COD_URL: ENV + '/analytics/cod.js',
    SCION_SCODE_URL: ENV + '/analytics/scion_scode.js',
    SCION_2_0: ENV + '/analytics/Scion2.0.json',
    SYNDICATION_URL: ENV + '/api/syndication/',
    JQUERY_URL: ENV + '/assets/js/vendor/jquery.min.js',
    JQUERY_VALIDATE_URL: ENV + '/assets/js/vendor/jquery.validate.syndication.min.js',
    HANDLEBARS_URL: ENV + '/assets/js/vendor/handlebars.min.js',
    REQUIRE_URL: ENV + '/assets/js/vendor/require.min.js',
    PICTUREFILL_URL: ENV + '/assets/js/vendor/picturefill.min.js',
    SALEMOVE_URL: '//api.salemove.com/salemove_integration.js',
    LINK_TAG: '<link rel="stylesheet" href="{{href}}">',
    AT_THE_BEGINNING: 'afterbegin',
    AT_THE_END: 'beforeend',
    ERROR_MESSAGE: 'Syndication failed.'
  },

  /**
   * DOM ELEMENTS
   */
  DOM = {
    body: document.querySelector('body'),
    head: document.querySelector('head')
  };

  /**
   * Init
   */
  (function init() {

    // Setting global namespace
    window.SCION = window.SCION || {};
    window.SCION.includeSalemove = config.includeSalemove;

    // Analytics files
    if (config.includeAnalytics) {
      appendScript(CONST.COD_URL, DOM.head);
      appendScript(CONST.SCION_SCODE_URL, DOM.head);
      appendScript(CONST.SCION_2_0, DOM.head);
    }

    // Appending scripts based on config flags
    config.includePicturefill && appendScript(CONST.PICTUREFILL_URL, DOM.head);
    config.includeHandlebars ? appendHandlebars() : appendRequire();

  })();

  /**
   * Retrieves paths and markup to be injected
   * @param  {Function} requestListener triggered when data comes back
   * @return {void}
   */
  function fetchDataFromServer(requestListener) {

    var xhr = new XMLHttpRequest();

    xhr.onload = requestListener;
    xhr.onerror = errorCallback;
    xhr.open('get', CONST.SYNDICATION_URL, true);
    xhr.send();
  }

  /**
   * Error callback when fetching the data
   * @return {void}
   */
  function errorCallback() {
    console.warn(CONST.ERROR_MESSAGE);  // eslint-disable-line no-console
  }

  /**
   * Utility to append scripts
   * @param  {String} source path of the script to append
   * @param  {HTMLElement} element that will contain the script
   * @param  {Function} onLoad callback
   * @return {void}
   */
  function appendScript(source, element, onLoad) {
    var scriptToAppend = document.createElement('script');
    scriptToAppend.src = source;
    scriptToAppend.onload = onLoad;
    element.appendChild(scriptToAppend);
  }

  /**
   * Appends handlebars and then appends RequireJS
   * @return {void}
   */
  function appendHandlebars() {
    appendScript(
      CONST.HANDLEBARS_URL,
      DOM.head,
      appendRequire
    );
  }

  /**
   * Appends jQuery and then fetch data from server
   * @return {void}
   */
  function appendJquery() {
    appendScript(
      CONST.JQUERY_URL,
      DOM.head,
      function() {
        appendJqueryValidate(function() {
          fetchDataFromServer(bindDocument);
        });
      }
    );
  }

  /**
   * Appends jQuery Validate and then fetch data from server
   * @param  {Function} callback [description]
   * @return {void}
   */
  function appendJqueryValidate(callback) {
    appendScript(
      CONST.JQUERY_VALIDATE_URL,
      DOM.head,
      callback
    );
  }

  /**
   * Appends RequireJS and then appends jQuery regarding config flag
   * @return {void}
   */
  function appendRequire() {
    appendScript(
      CONST.REQUIRE_URL,
      DOM.head,
      function() {
        config.includeJquery
          ? appendJquery()
          : appendJqueryValidate(function() {
            fetchDataFromServer(bindDocument);
          });
      }
    );
  }

  /**
   * Inject markup, link and script tags in the document
   * @return {void}
   */
  function bindDocument() {

    var data = {};

    // Try catching in case the server returns plain html on errors
    try {
      // Parsing response if it is necessary
      data = typeof this.response === 'string'
        ? JSON.parse(this.response)
        : this.response;
    } catch (error) {
      console.warn(CONST.ERROR_MESSAGE);  // eslint-disable-line no-console
      return;
    }

    // Setting lists of domains
    window.SCION.domainsWhiteList = data.domainsWhiteList;
    window.SCION.internalDomainList = data.internalDomainList;

      var cssUrl = data.cssPath;
      
      var xhr = new XMLHttpRequest();      
      xhr.open('get', cssUrl , true);
      xhr.send();
      xhr.onreadystatechange=function(){
          if (xhr.readyState == 4) {
            if (xhr.status == 200) { 
              console.log('Response received ');                    
              var css = xhr.responseText;
              var head = document.getElementsByTagName('head')[0];
              var style = document.createElement('style');
              
              style.type = 'text/css';
              
              if(style.styleSheet){
                style.styleSheet.cssText = css;
              }else{
                  style.appendChild(document.createTextNode(css));
              }
              
              head.appendChild(style);                    
            
              // Header
              if (config.headerSelector) {
                document.querySelector(config.headerSelector).insertAdjacentHTML(CONST.AT_THE_BEGINNING,data.header);
              } else {
                DOM.body.insertAdjacentHTML(CONST.AT_THE_BEGINNING,data.header);
              }

              // Footer
              if (config.footerSelector) {
                document.querySelector(config.footerSelector).insertAdjacentHTML(CONST.AT_THE_END,data.footer);
              } else {
                DOM.body.insertAdjacentHTML(CONST.AT_THE_END,data.footer );
            }

            // Script
            appendScript(data.jsPath, DOM.body);  
            }
          }
      } 
  }
})({
  environment:         '2astaging',
  includeJquery:       false,
  includePicturefill : true,
  includeHandlebars:   true,
  includeAnalytics:    false,
  includeSalemove:     true,
  headerSelector:     '#bys-header',
  footerSelector:     '#bys-footer'
});
