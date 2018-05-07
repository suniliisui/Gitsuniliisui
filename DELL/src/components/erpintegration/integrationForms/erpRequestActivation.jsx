import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from '../../common/header/header.jsx';
import Footer from '../../common/footer/footer.jsx';
import Breadcrumb from '../../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../../common/customerInfoHeader/customerInfoHeader.jsx';
import { Icon } from '../../common/utils/icon.jsx';
import NeedHelpPanel from '../needHelpPanel.jsx';
import _ from 'lodash';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';
import Services from '../../common/services/services.jsx';
import {  getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_REQUEST_ACTIVATION_FORM);
}

class ErpRequestActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedState: {metaData: {prodRequestActivation : this.props.location.state.metaData.prodRequestActivation}}
    }    
    this.formInitialState = this.props.location && this.props.location.state || {postData:{}};
  }

  componentDidMount() {
    document.title = CMS.data.ProductionRequestPage_BrowserTitle;
    window.scrollTo(0, 150);
  }

  getPayLoadT = () => {
    return new Object({
      value : "",
      path : "",
      op : "replace"
    });
  }

  getProductionRequestActivationDate = () => {
    let _self = this;
    let obj = _self.getPayLoadT();
    obj.value = new Date().toJSON();
    obj.path = "/productionRequestActivationDate";
    return obj;
  }

  getPayLoad = () => {
    let _self = this;
    let payLoad = [];
    payLoad.push(_self.getProductionRequestActivationDate())    
    return payLoad || [];
  }

  onRequestActivation = (e) => {
    e.preventDefault();
    let _self = this;
    let _selfState = _self.state;
    let updatedState = _self.formInitialState;
    if(e.target.dataset.action == "save") {
      Services.patchIntegrationReq(updatedState.postData.id,_self.getPayLoad())
        .then(function (response) {
          console.log("Updated Request Activation : " + response);
          updatedState = _.merge({}, _self.formInitialState, { postData: { productionRequestActivationDate : new Date().toJSON() } ,metaData:{ prodRequestActivation: ERP_STATUS_COMPLETE }});
          _self.setState({ updatedState: updatedState });
        })
        .catch(function (error) {
          console.error("Request Activation Updation Failed : " + error);
          _self.routeToParent(updatedState);
        });
    } else if(e.target.dataset.action == "exit") {
        _self.routeToParent(_self.state.updatedState);
    } else {
        _self.routeToParent(updatedState);
    }
  }

  routeToParent = (updatedState) => {
    this.props.router.push({
      pathname: '/ErpIntegrationContainer',
      state: updatedState
    });
  }

  render() {
    const { prodRequestActivation } = this.state.updatedState.metaData;
    return (
      <div className="mainApp">
        <CustomerInfoHeader />
        <Header />
        <Breadcrumb />
        <div className="erpRequestActivation">
          <div className="default-section">
            <div className="default-div">
              <h1>{CMS.data.ProductionRequestPage_HeaderText}</h1>
            </div>
          </div>
          <div className="default-div">
            <div className="w-row">
              <div className="no-padding right-padding-15 w-col w-col-9 z-index-10">
                <div className="d-bottom-offset-10 default-paragraph">
                  {CMS.data.ProductionRequestPage_DescriptionText}
                </div>
                { 
                  prodRequestActivation !== ERP_STATUS_COMPLETE &&
                  <div className="erp-request-activation">
                    <h3 className="d-bottom-offset-5">{CMS.data.ProductionRequestPage_RequestActivationQuestionText}</h3>
                    <div className="default-paragraph d-bottom-offset-20">{CMS.data.ProductionRequestPage_RequestActivationDescriptionText}</div>
                    <div className="flex-horizontal-start-center">
                      <div className="right-margin-10">
                        <button className="d-btn d-btn-primary right-margin-10 w-button" 
                        data-automationId="erpRequestActionBtn" data-action="save" onClick={this.onRequestActivation}>
                          {CMS.data.ProductionRequestPage_RequestActivationButton}
                        </button>
                      </div>
                      <div className="right-margin-10">
                        |
                      </div>
                      <div>
                        <div className="right-margin-10">
                          <div className="default-link" data-automationId="erpRequestActCancelBtn" data-action="cancel"  onClick={this.onRequestActivation}>
                            {CMS.data.ProductionRequestPage_GoBackButton}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                { 
                  prodRequestActivation === ERP_STATUS_COMPLETE &&
                  <div className="requestActivationExit">
                    <div>
                      <h3><span className="d-icon d-icon-lg d-icon-size-20 d-icon-color-green text-bold"></span> {CMS.data.ProductionRequestPage_ActivationSubmittedHeaderText}</h3>
                    </div>
                    <div className="d-alert">
                      <div className="div-block-11">
                        <Icon name="info" size="28" className="d-padding-right-10" />
                        <div className="notification-content">
                          <p className="default-paragraph">{CMS.data.ProductionRequestPage_Part1AlertText}
                            <strong> {this.state && this.state.postData && this.state.postData.integrationRequestId ? this.state.postData.integrationRequestId : ""} </strong>
                            {CMS.data.ProductionRequestPage_Part2AlertText}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-horizontal-start-center">
                      <div className="d-btn d-btn-primary w-button req-activation-exit"
                        data-automationId="erpRequestActExitBtn" data-action="exit" onClick={this.onRequestActivation}>
                        {CMS.data.ProductionRequestPage_CloseButton}
                      </div>
                    </div>
                  </div>
                }
              </div>
              <NeedHelpPanel />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default ErpRequestActivation;
