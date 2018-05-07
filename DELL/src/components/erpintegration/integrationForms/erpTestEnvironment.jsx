import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from '../../common/header/header.jsx';
import Footer from '../../common/footer/footer.jsx';
import Breadcrumb from '../../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../../common/customerInfoHeader/customerInfoHeader.jsx';
import NeedHelpPanel from '../needHelpPanel.jsx';
import DellLogo from '../../../assets/images/Dell_logo.png';
import _ from 'lodash';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';
import Services from '../../common/services/services.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { renderContent } from '../../common/utils/htmlcontentrender.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_TEST_ENVIRONMENT_FORM);
}

class ErpTestEnvironment extends Component {
  constructor(props) {
    super(props);
    this.formInitialState = this.props.location && this.props.location.state || {postData:{}};
    this.loginData ={
      loginId: this.formInitialState && this.formInitialState.postData && this.formInitialState.postData.loginId || "",
      password: this.formInitialState && this.formInitialState.postData && this.formInitialState.postData.password || ""
    }
    this.state = {
      type: 'password'
    }
  }

  componentDidMount() {
    document.title = CMS.data.TestEnvironmentPage_BrowserTitle;
    window.scrollTo(0, 150);
  }

  showPassword = () => {
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    })
  }

  CopyToClipboard = (textElm2) => {
    let doc = document;
    try {
      const textElm = doc.querySelector(textElm2);
      var inpElm =doc.createElement('input');
      doc.body.appendChild(inpElm);
      inpElm.value = textElm.textContent;
      inpElm.select();
      doc.execCommand('copy',false);
      inpElm.remove();
    }
    catch(e) {
      alert('unable to copy data');
    }
  }

  onEditClick = (e) => {
    e.preventDefault();
    if(e.target.dataset.action == "editPassword"){
      this.props.router.push({
        pathname: '/ErpIntegrationContainer/ErpLoginCredentials',
        state: this.formInitialState
      });
    }
  }

  getPayLoadT = () => {
    return new Object({
      value : "",
      path : "",
      op : "replace"
    });
  }

  getTestEnvironmentConfirmedDateObj = () => {
    let _self = this;
    let obj = _self.getPayLoadT();
    obj.value = new Date().toJSON();
    obj.path = "/testEnvironmentConfirmedDate";
    return obj;
  }

  getPayLoad = () => {
    let _self = this;
    let payLoad = [];
    payLoad.push(_self.getTestEnvironmentConfirmedDateObj())
    return payLoad || [];
  }

  completeTestEnvironment = (e) => {
    e.preventDefault();
    let _self = this;
    let _selfState = _self.state;
    let updatedState = _self.formInitialState;
    
    if(e.target.dataset.action == "save"){
       Services.patchIntegrationReq(updatedState.postData.id,_self.getPayLoad())
      .then(function(response){
        console.log("Updated Test Env : " + response);
        updatedState = _.merge({}, _self.formInitialState, { postData: { testEnvironmentConfirmedDate: new Date().toJSON() } ,metaData:{ envConfirmation:ERP_STATUS_COMPLETE }});
        _self.routeToParent(updatedState);
      })
      .catch(function(error){
        console.error("Update Test Env failed" + error);
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
    const {loginId, password} = this.loginData;
    const passwordText = this.state.type === 'text'? password : '*'.repeat(password.length);
    return (
      <div className="mainApp">
        <CustomerInfoHeader />
        <Header />
        <Breadcrumb />
        <div className="erpTestEnvironment">
          <div className="default-section">
            <div className="default-div">
              <h1>{CMS.data.TestEnvironmentPage_HeaderText}</h1>
            </div>
          </div>
          <div className="default-div">
            <div className="w-row">
              <div className="no-padding right-padding-15 w-col w-col-9 z-index-10">
                <div className="state-1">
                  <div className="default-paragraph d-bottom-offset-10">
                    {CMS.data.TestEnvironmentPage_DescriptionText}&nbsp;
                     <a className="default-link" href={CMS.data.TestEnvironmentPage_IntegrationGuideLink} target="_blank">{CMS.data.TestEnvironmentPage_IntegrationGuideLinkText}</a>.
	                </div>
                  <div className="default-paragraph d-bottom-offset-20">
                    <strong>{CMS.data.TestEnvironmentPage_ConfirmSettingsOnErpText}</strong>
                  </div>
                  <h2 className="d-bottom-offset-20">{CMS.data.TestEnvironmentPage_SettingsHeaderText}</h2>
                  <div className="d-bottom-offset-20 d-hr-gray"></div>
                  <div>
                    <div className="form w-form">
                      <form className="position-relative" data-name="Email Form" name="email-form">
                        <label className="field-label" htmlFor="name-3">{CMS.data.TestEnvironmentPage_LoginIdText}</label>
                        <div className="d-bottom-offset-5 default-paragraph left-padding-15 copyUserLoginId">
                          {loginId}
                        </div>
                        <div className="d-bottom-offset-10 default-paragraph left-padding-15">
                          <a className="default-link" onClick={this.CopyToClipboard.bind(this, ".copyUserLoginId")}>{CMS.data.GeneralContent_CopyToClipboardLinkText}</a>
                        </div>
                      </form>
                      <div className="w-form-done"></div>
                      <div className="w-form-fail"></div>
                    </div>
                    <div className="d-bottom-offset-20 d-hr-gray"></div>
                    <div className="flex-horizontal-start-start form w-form">
                      <form className="flex-expand position-relative" data-name="Email Form" name="email-form">
                        <label className="field-label" htmlFor="name-4">{CMS.data.TestEnvironmentPage_PasswordText}</label>
                        <div className="d-bottom-offset-5 default-paragraph left-padding-15">
                          {passwordText}
                        </div>
                        <div className="left-padding-15 w-checkbox">
                          <input className="w-checkbox-input" data-name="Checkbox" name="checkbox" type="checkbox" onClick={this.showPassword}/><label className="d-inline-block d-margin-left-5 w-form-label" htmlFor="checkbox"> {CMS.data.TestEnvironmentPage_ShowPasswordText}</label>
                        </div>
                      </form>
                      <div className="table-column-cta">
                        <div className="text-align-right"><button className="d-btn d-btn-default w-button" data-automationId="erpTestEnv_EditLink" data-action="editPassword" onClick={this.onEditClick}>{CMS.data.TestEnvironmentPage_EditButton}</button></div>
                      </div>
                      <div className="w-form-done"></div>
                      <div className="w-form-fail"></div>
                    </div>
                    <div className="d-bottom-offset-20 d-hr-gray"></div>
                    <div>
                      <div>
                        <div className="d-bottom-offset-5 default-paragraph">
                          {CMS.data.TestEnvironmentPage_TestEnvironmentText}
                        </div>
                        <div className="d-bottom-offset-5 default-paragraph left-padding-15 copyPunchOutURL">
                          {CMS.data.TestEnvironmentPage_TestEnvironmentPunchoutPoUrl}
                        </div>
                        <div className="d-bottom-offset-10 default-paragraph left-padding-15">
                          <a className="default-link" onClick={this.CopyToClipboard.bind(this, ".copyPunchOutURL")}>{CMS.data.GeneralContent_CopyToClipboardLinkText}</a>
                        </div>
                      </div>
                    </div>
                    <div className="d-bottom-offset-20 d-hr-gray"></div>
                    <div>
                      <div className="d-bottom-offset-5 default-paragraph">
                        {CMS.data.TestEnvironmentPage_DellLogoText}
                      </div><a className="d-bottom-offset-5 left-margin-15 w-inline-block width-150" href={DellLogo} download><img src={DellLogo} /></a>
                      <div className="d-bottom-offset-5 default-paragraph left-padding-15">
                        <a className="default-link" href={DellLogo} download><span className="d-icon d-icon-sml"></span> {CMS.data.TestEnvironmentPage_DownloadDellLogoLinkText}</a>
                      </div>
                      <div className="d-bottom-offset-20 d-hr-gray display-none"></div>
                      <div className="flex-horizontal-start-start display-none">
                        <div className="default-paragraph flex-expand right-padding-10">
                          You may send all of the above settings by email to a technical contact who maintains the purchasing system for your organization. This step is optional.
                        </div>
                        <div className="table-column-cta">
                          <a className="d-btn d-btn-block d-btn-default w-button" data-ix="show-off-canvas" href="#masthead-customer">Send Settings</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="display-none flex-horizontal-start-center">
                    <div className="default-paragraph flex-expand right-margin-15">
                      (Optional) You may test the connection after you have entered the Login ID and Password within your purchasing system.
                    </div><a className="btn-disabled-primary d-btn-default w-button" href="#">Begin Test</a><a className="btn-enabled-primary d-btn-default w-button" href="#">Begin Test</a>
                  </div>
                  <div className="d-bottom-offset-30 d-hr-gray"></div>
                  <div className="display-none form w-form">
                    <form data-name="Email Form" name="email-form">
                      <div className="d-bottom-offset-20 validation-unchecked w-checkbox" data-ix="validate-test-environment">
                        <input className="w-checkbox-input" data-name="Checkbox 5" name="checkbox-5" type="checkbox" /><label className="field-label-5 font-color-white w-form-label" htmlFor="checkbox-5">All of the required settings, above, have been configured in my purchasing system and it is ready to test the integration.</label>
                      </div>
                      <div className="d-bottom-offset-20 validation-checked w-checkbox" data-ix="unvalidate-test-environment">
                        <input checked onChange={()=>{}} className="w-checkbox-input" data-name="Checkbox 5" name="checkbox-5" type="checkbox" /><label className="field-label-5 w-form-label" htmlFor="checkbox-6">All of the required settings, above, have been configured in my purchasing system and it is ready to test the integration.</label>
                      </div>
                    </form>
                    <div className="w-form-done"></div>
                    <div className="w-form-fail"></div>
                  </div>
                  <div className="flex-horizontal-start-center">
                    <div className="right-margin-10">
                      <button className="d-btn d-btn-primary right-margin-10 w-button" data-automationId="erpTestEnv_LnkCnfExit" data-action="save" onClick={this.completeTestEnvironment}>
                        {/*<div dangerouslySetInnerHTML={renderContent(CMS.data.TestEnvironmentPage_ConfirmAndContinueButton)}></div>*/}
                        Save & Continue
                      </button>
                    </div>
                    <div className="right-margin-10">
                      |
                    </div>
                    <div>
                      <div className="right-margin-10"><div className="default-link" data-automationId="erpTestEnv_Cancel" data-action="cancel"  onClick={this.completeTestEnvironment}>{CMS.data.TestEnvironmentPage_GoBackButton}</div></div>
                    </div>
                  </div>
                </div>
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

export default ErpTestEnvironment;
