// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require('es6-promise').polyfill();

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import ViewIntReqs from './viewintreqs/ViewIntReqs.jsx';
import IntegrationsList from './integrationsList/integrationsList.jsx';
import ErpIntegrationContainer from './erpintegration/erpIntegrationContainer.jsx';
import ErpLoginCredentials from './erpintegration/integrationForms/erpLoginCredentials.jsx';
import ErpPurchaseSystem from './erpintegration/integrationForms/erpPurchaseSystem.jsx';
import ErpRequestActivation from './erpintegration/integrationForms/erpRequestActivation.jsx';
import ErpTestEnvironment from './erpintegration/integrationForms/erpTestEnvironment.jsx';
import ErpTestIntegration from './erpintegration/integrationForms/erpTestIntegration.jsx';
//import AppBoot from './common/appboot/appboot.jsx';
import "babel-polyfill";
import { Router, Route, hashHistory } from 'react-router';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={IntegrationsList}/>
    <Route path="/ViewIntReqs" component={ViewIntReqs}/>
    <Route path="/IntegrationsList" component={IntegrationsList}/>
    <Route path="/ErpIntegrationContainer" component={ErpIntegrationContainer}/>
    <Route path="/ErpIntegrationContainer/ErpLoginCredentials" component={ErpLoginCredentials}/>
    <Route path="/ErpIntegrationContainer/ErpPurchaseSystem" component={ErpPurchaseSystem}/>
    <Route path="/ErpIntegrationContainer/ErpRequestActivation" component={ErpRequestActivation}/>
    <Route path="/ErpIntegrationContainer/ErpTestEnvironment" component={ErpTestEnvironment}/>
    <Route path="/ErpIntegrationContainer/ErpTestIntegration" component={ErpTestIntegration}/>       
  </Router>
), document.getElementById('b2b-root'));
