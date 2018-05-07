import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from '../../common/header/header.jsx';
import Footer from '../../common/footer/footer.jsx';
import Breadcrumb from '../../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../../common/customerInfoHeader/customerInfoHeader.jsx';
import NeedHelpPanel from '../needHelpPanel.jsx';
import { Form, Text, Textarea, Checkbox, FormError } from 'react-form';
import _ from 'lodash';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, VALIDATIONS, CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';
import Services from '../../common/services/services.jsx';
import validations from '../../../assets/statics/validations.json';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { renderContent } from '../../common/utils/htmlcontentrender.jsx';
import Button from 'react-bootstrap-button-loader';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_LOGIN_CREDENTIALS_FORM);
}

class ErpLoginCredentials extends Component {
  constructor(props) {
    super(props);
    this.formInitialState = this.props.location && this.props.location.state || {postData: {}};
    this.loginIdRegex = VALIDATIONS.LOGIN_REGEX;
    this.passwordRegex = VALIDATIONS.PASSWORD_REGEX;
    let postData = this.formInitialState && this.formInitialState.postData;
    this.state = {
      type: 'password',
      loginId: (postData ? this.extractLoginId(postData) : ""),
      password: postData && postData.password || "",
      isLoading : false,
      editLoginId: !postData || (postData && !postData.loginId)
    }
  }

  extractLoginId = (postData) => (postData.loginId ? postData.loginId : this.createLoginId(postData));

  createLoginId(postData) {
    var id = (postData.purchasingSystem && postData.purchasingSystem.value || "").trim().toLocaleUpperCase().padEnd(4, "0");
    id += (postData.integrationRequestId || "");

    return (postData.integrationRequestId ? id : "");
  }

  componentDidMount() {
    document.title = CMS.data.LoginCredentialsPage_BrowserTitle;
    window.scrollTo(0, 150);
  }

  showPassword = () => {
    this.setState({type: this.state.type === 'text' ? 'password' : 'text'})
  }
  
  getPayloadObject = (value, path) => {
    return new Object({
      value : value || "",
      path : "/" + path,
      op : "replace"
    });
  }

  getPayLoad = () => {
    let payLoad = [];
    if (this.state.editLoginId)
      payLoad.push(this.getPayloadObject(this.state.loginId, "loginId"));
    payLoad.push(this.getPayloadObject(this.state.password, "password"));
    return payLoad || [];
  }

  saveLogin = (e) => {
    console.log("submitting login, password");
    e.preventDefault();
    let self = this;
    let state = self.state;
    let updatedState = self.formInitialState;
    let updatedPostData = updatedState.postData;   

    if (e.target.dataset.action == "save") {

      //if (self.loginIdHasError(state.loginId)) {
        //return false;
      //}
      
      if (state.loginId == updatedPostData.loginId && state.password == updatedPostData.password) {
        self.routeToParent(updatedState);
        return true;
      }

      self.setState({ isLoading: true });
      Services.patchIntegrationReq(updatedPostData.id, self.getPayLoad())
        .then(function (response) {
          self.setState({ isLoading: false });
          //var data = (response && response.data) || "No response";
          //if (data.toLowerCase().indexOf("success") >= 0) {
            //self.setState({ "loginIdError": null });
            console.log("Update Login and password : " + response);
            let updatedData = { 
              postData: { loginId: state.loginId, password: state.password }, 
              metaData: { configureLoginCredentials: ERP_STATUS_COMPLETE } 
            };
            let updatedState = _.merge({}, self.formInitialState, updatedData);
            self.routeToParent(updatedState);
          //}
          //else {
            //var errorMsg = CMS.data[data] == undefined ? "Unknown error" : CMS.data[data];
           // self.setState({ isLoading: false, "loginIdError": errorMsg }, self.showLoginIdValidation);
          //}
        })
        .catch(function (error) {
          self.setState({ isLoading: false });
          var errorMsg = "Login and password update failed";
          console.error(errorMsg + ": " + error);
          self.setState({ isLoading: false, "loginIdError": errorMsg });
        });
    } 
    else {
      self.setState({isLoading:false});
      self.routeToParent(updatedState);
    }
  }

  showLoginIdValidation = () => { 
    setTimeout(() => {
      var loginIdText = document.getElementById("loginIdText");
      if (loginIdText) {
        loginIdText.focus();
        loginIdText.blur();
      }
    }, 0);
  }

  routeToParent = (updatedState) => {
    this.props.router.push({
      pathname: '/ErpIntegrationContainer',
      state: updatedState
    });
  }

  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    this.setState({"loginIdError": null});
  }

  loginIdHasError = (loginId) => {
    if (!loginId)
      return CMS.data.LoginCredentialsPage_LoginIdNullErrorText;
    if (!this.loginIdRegex.test(loginId))
      return CMS.data.LoginCredentialsPage_LoginIdMinLengthErrorText;

    return false;
  }

  render() {
    let defaultValues = _.merge({}, this.state);
    return (
      <Form
        onSubmit={(values) => {
          return true;
        }}
        defaultValues={{
            loginId: defaultValues.loginId,
            password: defaultValues.password
        }}
        validate={values => {
          let errors = {
            loginId: this.loginIdHasError(values.loginId) || this.state.loginIdError,
            password: (this.passwordRegex.test(values && values.password)) ? false : 'Password does not meet minimum requirements'
          }
          return errors;
        }}
      >
        {({ submitForm, setValue, values, resetForm }) => {
          return (
            <form onSubmit={submitForm}>
              <div className="mainApp">
                <CustomerInfoHeader />
                <Header />
                <Breadcrumb />
                <div className="erpLoginCredentials">
                  <div className="default-section">
                    <div className="default-div">
                      <h1 className="d-bottom-offset-30">{CMS.data.LoginCredentialsPage_HeaderText}</h1>
                    </div>
                  </div>
                  <div className="default-div">
                    <div className="w-row">
                      <div className="no-padding right-padding-15 w-col w-col-9 z-index-10">
                        <h2 className="d-top-offset-0">{CMS.data.LoginCredentialsPage_LoginIdentityHeaderText}</h2>
                        <div className="state-1">
                          <div className="d-bottom-offset-10 default-paragraph">
                            {CMS.data.LoginCredentialsPage_LoginIdentityDescriptionText}
                          </div>
                          <div className="d-bottom-offset-20 default-paragraph">
                            {CMS.data.LoginCredentialsPage_LoginIdentitySuggestionText} <strong>{CMS.data.LoginCredentialsPage_LoginIdentityWarningText}.</strong>
                          </div>
                          <div className="form w-form">
                            <label className="field-label" htmlFor="name-3">{CMS.data.LoginCredentialsPage_LoginIdentityInputText}:</label>
                          { 
                            defaultValues.editLoginId &&
                            <div>
                              <div className="state-no-error">
                                <div className="default-paragraph field-prefilled"></div>
                                
                                <Text id="loginIdText" className="d-bottom-offset-5 field w-input" value={defaultValues.loginId} field="loginId" data-name="Login Identity" required name="loginId" type="text" onChange={this.onInputChange}/>
                                <FormError field='loginId' className="w-form-fail" />
                            
                              </div>
                              <div className="state-error" data-ix="initial-display-none" style={{ display: 'none' }}>
                                <div className="error-footnote">
                                  {CMS.data.LoginCredentialsPage_LoginIdentityInputTextError}.
                                </div>
                              </div>
                              <div className="d-top-offset-5 default-paragraph text-small">
                                {CMS.data.LoginCredentialsPage_LoginIdentityInputReqText}
                              </div>
                              <div className="w-form-done"></div>
                              <div className="w-form-fail"></div>
                            </div>
                          }
                          {
                            !defaultValues.editLoginId &&
                            <div><input type="text" className="d-bottom-offset-5 field w-input" data-automationid="LoginIdText" style={{cursor: "text"}} readOnly="true" value={defaultValues.loginId} /></div>
                          }
                          </div>
                        </div>

                        <div className="d-bottom-offset-30 d-hr-gray"></div>
                        <h2 className="d-top-offset-0">{CMS.data.LoginCredentialsPage_PasswordHeaderText}</h2>
                        <div className="state-1">
                          <div className="d-bottom-offset-10 default-paragraph">
                            {CMS.data.LoginCredentialsPage_PasswordDescriptionText}
                          </div>
                          <div className="d-bottom-offset-20 form w-form">
                            <label className="field-label" htmlFor="name-4">{CMS.data.LoginCredentialsPage_PasswordHeaderText}</label>
                            <div className="state-no-error">
                              <Text className="d-bottom-offset-5 field w-input" field="password" data-automationid="PswdText" value={defaultValues.password} type={this.state.type} data-name="password" name="password" onChange={this.onInputChange} />
                            </div>
                            <div className="d-bottom-offset-5 d-top-offset-5 default-paragraph text-small">
                              {CMS.data.LoginCredentialsPage_PasswordInputReqText}
                            </div>
                            <FormError field='password' className="w-form-fail" />
                            <div>
                              <input onChange={this.showPassword} checked={this.state.type === 'text'} className="w-checkbox-input show-password-checkbox" data-name="Checkbox 3" name="checkbox-3" type="checkbox" />
                              <label className="w-form-label" htmlFor="checkbox-3">{CMS.data.LoginCredentialsPage_ShowPasswordText}</label>
                            </div>
                            <div className="w-form-done"></div>
                            <div className="w-form-fail"></div>
                          </div>
                        </div>
                        <div className="display-none flex-horizontal-start-center">
                          <div className="default-paragraph flex-expand right-margin-15">
                            (Optional) You may test the connection after you have updated the Login ID and Password within your purchasing system.
                          </div>
                          <a className="d-btn d-btn-default w-button" href="#">Begin Test</a>
                        </div>
                        <div className="d-bottom-offset-30 d-hr-gray"></div>
                        <div className="flex-horizontal-start-center">
                          <div className="right-margin-10">
                            <Button className="d-btn d-btn-primary right-margin-10 w-button" 
                                loading={this.state.isLoading}
                                spinAlignment="right"
                                data-automationId="erpLoginCreds_LnkSaveExit" 
                                data-action="save"
                                onClick={(e) => {
                                  submitForm(); this.saveLogin(e);}
                                }>
                                {/*<div dangerouslySetInnerHTML={renderContent(CMS.data.LoginCredentialsPage_SaveAndContinueButton)}></div>*/}
                                Save & Continue
                            </Button>
                          </div>
                          <div className="right-margin-10">
                            |
                          </div>
                          <div>
                            <div className="right-margin-10">
                              <div className="default-link" data-automationId="erpLoginCreds_LnkCancel" data-action="cancel" onClick={(e) => { resetForm(); this.saveLogin(e); }}>{CMS.data.LoginCredentialsPage_CancelButton}</div>
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
            </form>
          )
        }}
      </Form>
    );
  }
}

export default ErpLoginCredentials;
