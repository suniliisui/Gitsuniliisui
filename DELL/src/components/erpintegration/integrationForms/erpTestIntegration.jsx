import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from '../../common/header/header.jsx';
import Footer from '../../common/footer/footer.jsx';
import Breadcrumb from '../../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../../common/customerInfoHeader/customerInfoHeader.jsx';
import NeedHelpPanel from '../needHelpPanel.jsx';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';
import _ from 'lodash';
import Services from '../../common/services/services.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { renderContent } from '../../common/utils/htmlcontentrender.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_TEST_INTEGRATION_FORM);
}

class ErpTestIntegration extends Component {
  constructor(props) {
    super(props);
    this.formInitialState = this.props.location && this.props.location.state || {postData:{}};
    this.state = _.merge({
      submittable: true
    }, this.props.stepData);
  }


  componentDidMount() {
    document.title = CMS.data.IntegrationTestingPage_BrowserTitle;
    window.scrollTo(0, 150);
  }

  CopyToClipboard = (textElm2) => {
    try {
      const textElm = document.querySelector(textElm2);
      var inpElm =document.createElement('input');
      document.body.appendChild(inpElm);
      inpElm.value = textElm.textContent;
      inpElm.select();
      document.execCommand('copy',false);
      inpElm.remove();
    }
    catch(e) {
      alert('unable to copy data');
    }
  }

  getPayLoadT = () => {
    return new Object({
      value : "",
      path : "",
      op : "replace"
    });
  }
  
  getTestIntegrationConfirmedDateObj = () => {
    let _self = this;
    let obj = _self.getPayLoadT();
    obj.value = new Date().toJSON();
    obj.path = "/testIntegrationConfirmedDate";
    return obj;
  }

  getPayLoad = () => {
    let _self = this;
    let payLoad = [];
    payLoad.push(_self.getTestIntegrationConfirmedDateObj());
    return payLoad || [];
  }

  completeTestIntegration = (e) => {
    e.preventDefault();
    let _self = this;
    let _selfState = _self.state;
    let updatedState = _self.formInitialState;

    if(e.target.dataset.action == "save") {
      Services.patchIntegrationReq(updatedState.postData.id,_self.getPayLoad())
      .then(function(response){
        console.log("Updated Test Integration : " + response);
        updatedState = _.merge({}, _self.formInitialState, { postData: { testIntegrationConfirmedDate: new Date().toJSON() }, metaData:{ integrationConfirmation: ERP_STATUS_COMPLETE }});
        _self.routeToParent(updatedState);
      })
      .catch(function(error){
        console.error("Update Test Integration failed" + error);
        _self.routeToParent(updatedState);
      })
    }else{
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
    let { stepSubmitForm, stepCancelForm, stepExitForm } = this.props;
    let defaultValues = _.merge({}, this.state);

    return (
      <div className="mainApp">
        <CustomerInfoHeader />
        <Header />
        <Breadcrumb />
        <div className="erpTestIntegration">
          <div className="default-section">
            <div className="default-div">
              <h1 className="d-bottom-offset-30">{CMS.data.IntegrationTestingPage_HeaderText}</h1>
            </div>
          </div>
        </div>
        <div className="default-div">
          <div className="w-row">
            <div className="no-padding right-padding-15 z-index-10 w-col w-col-9">
              <div className="default-paragraph d-bottom-offset-10">
                {CMS.data.IntegrationTestingPage_Part1DescriptionText} 
                <Link className="default-link" to={{ pathname:"/ErpIntegrationContainer/ErpTestEnvironment", state: this.formInitialState}}> {CMS.data.IntegrationTestingPage_Part2DescriptionTestEnvLinkText}</Link>
                {CMS.data.IntegrationTestingPage_Part3DescriptionText}
              </div>
              <div className="default-paragraph d-bottom-offset-10">
                <strong>{CMS.data.IntegrationTestingPage_ConfirmSettingsOnErpText}</strong>
              </div>
              <div className="d-alert d-bottom-offset-10">
                <div className="div-block-11">
                  <div>
                    <div className="d-icon d-icon-lg d-icon-color-blue d-icon-size-28 d-padding-right-10">
                      
                    </div>
                  </div>
                  <div className="notification-content">
                    <p className="default-paragraph">{CMS.data.IntegrationTestingPage_Part1AlertText} 
                      <strong> {CMS.data.IntegrationTestingPage_Part2BoldAlertText}</strong>
                      &nbsp;{CMS.data.IntegrationTestingPage_Part3AlertText}
                    </p>
                  </div>
                </div><a className="modal-close-button display-none w-inline-block" href="#">
                <div className="modal-close-icon">
                  
                </div></a>
              </div>
              <h2>{CMS.data.IntegrationTestingPage_TestScenariosHeaderText}</h2>
              <div className="erpTestIntScenarios copyErpTestIntScenarios">
                <ol className="ordered-list">
                  <li className="list-item">{CMS.data.IntegrationTestingPage_TestStep1Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_TestStep2Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_TestStep3Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_Part1TestStep4Text}
                    <strong className="list-item">{CMS.data.IntegrationTestingPage_Part2BoldTestStep4Text}</strong>
                    {CMS.data.IntegrationTestingPage_Part3TestStep4Text}</li>
                </ol>
                <ul className="no-padding left-padding-60 d-bottom-offset-5">
                  <li className="list-item">{CMS.data.IntegrationTestingPage_Item1TestStep4Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_Item2TestStep4Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_Item3TestStep4Text}</li>
                  <li className="list-item">{CMS.data.IntegrationTestingPage_Item4TestStep4Text}</li>
                </ul>
              </div>
              <div className="default-paragraph">
                <a className="default-link" onClick={this.CopyToClipboard.bind(this, ".copyErpTestIntScenarios")}>{CMS.data.GeneralContent_CopyToClipboardLinkText}</a>
              </div>
              <div className="d-hr-gray d-bottom-offset-20"></div>
              <div className="flex-horizontal-start-center">
                <div className="right-margin-10">
                  <button className="d-btn d-btn-primary right-margin-10 w-button" 
                  data-automationId="erpTestIntegrat_LnkCnfExit" data-action="save" 
                  onClick={this.completeTestIntegration}>
                  {/* <div dangerouslySetInnerHTML={renderContent(CMS.data.IntegrationTestingPage_ConfirmAndContinueButton)}></div> */}
                  Confirm & Continue
                  </button>
                </div>
                <div className="right-margin-10">
                  |
                </div>
                <div>
                  <div className="right-margin-10"><div className="default-link" 
                  data-automationId="erpTestIntegratCancelBtn" data-action="cancel"  
                  onClick={this.completeTestIntegration}>{CMS.data.IntegrationTestingPage_GoBackButton}</div></div>
                </div>
              </div>
            </div>
            <NeedHelpPanel />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ErpTestIntegration;
