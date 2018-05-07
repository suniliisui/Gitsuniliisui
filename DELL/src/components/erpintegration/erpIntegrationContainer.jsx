import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from '../common/header/header.jsx';
import Footer from '../common/footer/footer.jsx';
import Breadcrumb from '../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../common/customerInfoHeader/customerInfoHeader.jsx';
import { Icon, StatusBlock } from '../common/utils/icon.jsx';
import IntegrationStep from './integrationStep.jsx';
import NeedHelpPanel from './needHelpPanel.jsx';
import erpFormStaticData from '../common/constants/erpFormStaticData.jsx';
import {LoginCredentialsSection, PurchaseSysSection, RequestActivationSection, TestEnvironmentSection, TestIntegrationSection} from './integrationSections';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, PURCHASE_SYS_OTHER, CMS_KEY_COLLECTION , INT_STATUS_INPROGRESS, INT_STATUS_COMPLETE} from '../common/constants/constants.jsx';
import Services from '../common/services/services.jsx';
import ContactUs from '../erpintegration/SlidingPanes/ContactUs.jsx';
import ReactSlidingPane from './SlidingPanes/Custom/SlidingPane.jsx';
import { getCMSValuesforKeys } from '../common/utils/cmsResponse.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_INTEGRATION_CONTAINER);
}

class ErpIntegrationContainer extends Component {
    constructor(props) {
        super(props);
        console.log("in ErpIntegrationContainer constructor... ");
        
        const newData = { postData: {}};
        const data = (this.props.location && this.props.location.state) || newData;
        const newRequest = (data === newData);
        data.newRequest = newRequest;
        this.populateMetaData(data);          
        this.state = _.merge({ isPaneOpen: false }, data);
        //Update session storate in edit mode
        this.updateIntReqObjInStorage(data.postData); 
    }
    populateMetaData = (data) => {
      var newRequest = !!data.newRequest;
      var currentStep = newRequest ? 0 : this.extractStep(data.postData);
      data.metaData = this.createMetaData(currentStep, newRequest);
    }
    extractStep = (postData) => {
      if (postData.productionRequestActivationDate)
        return 5;
      if (postData.testIntegrationConfirmedDate)
        return 4;
      if (postData.testEnvironmentConfirmedDate)
        return 3;
      if (postData.loginId)
        return 2;
      if (postData.purchasingSystem && postData.purchasingSystem.value)
        return 1;
      
      return 0;
    }
    createMetaData = (currentStep, newRequest) => {
      return {
        currentStep: (currentStep > 4 ? 4 : currentStep),
        identifyPurchaseSystem: this.stepStatus(currentStep, 0),
        configureLoginCredentials: this.stepStatus(currentStep, 1),
        envConfirmation: this.stepStatus(currentStep, 2),
        integrationConfirmation: this.stepStatus(currentStep, 3),
        prodRequestActivation: this.stepStatus(currentStep, 4),
        triggerNewReq: newRequest
      }
    }
    stepStatus = (currentStep, step) => {
      if (step === currentStep)
        return ERP_STATUS_CURRENT;
      if (step < currentStep)
        return ERP_STATUS_COMPLETE;

      return ERP_STATUS_INCOMPLETE;
    }
    //Method to persist data required in other flow
    updateIntReqObjInStorage(obj){
        try{
          sessionStorage.setItem("integrationRequestName", obj.integrationRequestName+" "+obj.integrationRequestId || "");
          sessionStorage.setItem("integrationRequestObjectId", obj.id  || "");
          sessionStorage.setItem("premierUserId", obj.userId  || "");
        }
        catch(e)
         {
            console.log("updateIntReqObjInStorage Failed....: " + e);
        }

    }
 
    componentDidMount() {
        let self = this;
        document.title = CMS.data.IntegrationHomePage_BrowserTitle;
        window.scrollTo(0, 150);
        if (self.state.metaData.triggerNewReq) {
            Services.postIntegrationReq({})
                .then(function (response) {
                    console.log("Integration Req Created : " + response);
                    self.state.metaData.triggerNewReq = false;
                    self.updateIntReqObjInStorage(response.data);    
                    self.setState({ postData: response.data });               
                })
                .catch(function (error) {
                    console.log("Integration Req Creation Failed....: " + error);
                });
        } 
    }

    render() {
        let self = this;
        let integrationRequestId = self.state && self.state.postData && self.state.postData.integrationRequestId ? self.state.postData.integrationRequestId + "  ":  " ";
        let integrationRequestName = self.state && self.state.postData && self.state.postData.integrationRequestName ? self.state.postData.integrationRequestName + "  ":  "Request ID: "
        document.title = CMS.data.IntegrationHomePage_BrowserTitle + " " + integrationRequestId;
        const purchaseKey = this.state && this.state.postData && this.state.postData.purchasingSystem && this.state.postData.purchasingSystem.key;
        const isOtherSelected = purchaseKey === PURCHASE_SYS_OTHER;
        let IntStatusMsg = this.state.postData.status;
        if(IntStatusMsg === "Complete"){
            IntStatusMsg = INT_STATUS_COMPLETE
        }else {
            IntStatusMsg = INT_STATUS_INPROGRESS
        }
        return (
            <div className="mainApp">
                <CustomerInfoHeader />
                <Header />
                <Breadcrumb />
                <div className="erp-integration-form-container">
                    <div className="default-section">
                        <div className="default-div">
                            <div>
                                <h1>{integrationRequestName} {integrationRequestId}</h1>
                            </div>
                            <div className="d-bottom-offset-10 flex-horizontal-start-center">
                                <h5 className="display-inline-block no-margins right-margin-20">{CMS.data.IntegrationHomePage_IntegrationStepStatusText}: <StatusBlock status={IntStatusMsg} size="16" inline={true} /></h5>
                                <div>
                                    <Link className="default-link" to="/integrationsList" data-automationid="LnkViewAllIntegrations"><span className="d-icon d-icon-ui"></span> {CMS.data.IntegrationHomePage_ViewIntegrationsLink}</Link>
                                </div>
                            </div>
                            <h3 className="d-bottom-offset-20 d-top-offset-0">
                              {CMS.data.IntegrationHomePage_HeaderText}
                            </h3>
                            <div className="state-9">
                                <div className="d-alert d-bottom-offset-30">
                                    <div className="div-block-11">
                                        <Icon name="info" className="d-padding-right-10" size="28" />
                                        <div className="notification-content">
                                            <p className="default-paragraph">{CMS.data.IntegrationHomePage_IntegrationInProgressAlertText}.</p>
                                            <ul>
                                                <li>
                                                    <div>
                                                        {CMS.data.IntegrationHomePage_ContactDellExpertAlertText} <a className="default-link" onClick={() => this.setState({ isPaneOpen: true })}>{CMS.data.GeneralContent_ContactDellExpertLinkText}</a>.
                                                    </div>
                                                </li>
                                                { 
                                                    isOtherSelected &&
                                                    <li>
                                                        <div className="purchasyingSys-other-message">
                                                            <div>{CMS.data.IntegrationsListPage_DellExpertAlertText}. </div>
                                                        </div>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <a className="display-none modal-close-button w-inline-block" href="#"><div className="modal-close-icon"></div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="default-section">
                        <div className="default-div">
                            <div className="d-bottom-offset-30 w-row">
                                <div className="no-padding right-padding-15 w-col w-col-9 z-index-10">
                                    <div className="d-bottom-offset-30 table-wrapper" data-ix="select-navbar-btn2">
                                        <div className="table" style={{borderBottom: "1px solid rgba(0, 0, 0, .2)"}}>
                                            {
                                                erpFormStaticData.map(function (formData, index) {
                                                    return <IntegrationStep stepData={formData} key={index} formState={self.state}/>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <NeedHelpPanel />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ReactSlidingPane
                    className='contact-dell-expert' overlayClassName='contact-dell-expert-overlay' 
                    isOpen={this.state.isPaneOpen} title='Return to New Integration' width='50%' 
                    onRequestClose={() => { this.setState({ isPaneOpen: false }); }}>
                    {<ContactUs onRequestClose={() => { this.setState({ isPaneOpen: false }); }}></ContactUs> }
                </ReactSlidingPane>
            </div>
        );
    }
}

export default ErpIntegrationContainer;
