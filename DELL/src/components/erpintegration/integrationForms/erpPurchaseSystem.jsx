import React, {Component} from 'react';
import { Link } from 'react-router';
import Header from '../../common/header/header.jsx';
import Footer from '../../common/footer/footer.jsx';
import Breadcrumb from '../../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../../common/customerInfoHeader/customerInfoHeader.jsx';
import NeedHelpPanel from '../needHelpPanel.jsx';
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, NestedForm, FormError } from 'react-form';
import purchaseSystems from '../../../assets/statics/purchaseSystem.json';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, PURCHASE_SYS_OTHER, CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';
import _ from 'lodash';
import Services from '../../common/services/services.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { renderContent } from '../../common/utils/htmlcontentrender.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_PURCHASE_SYSTEM_FORM);
}

class ErpPurchaseSystem extends Component {
  constructor(props) {
    super(props);
    this.formInitialState = this.props.location && this.props.location.state || {postData:{}};

    const {key, value} = this.formInitialState.postData && this.formInitialState.postData.purchasingSystem || {};

    this.state = {
      purchasingSystem: {
        key: key || '',
        value: value || ''
      },
      needsAssistance : false,
      submittable:true
    }
  }

  selectSystem = (event) => {
    let key = event.currentTarget.name;
    let val = event.currentTarget.value;
    this.setState({
      purchasingSystem: {
        key: key,
        value: val
      },
      needsAssistance: false
    })
  }

  componentWillReceiveProps(nextProps) {
    let state = _.merge({}, this.state, nextProps.stepData);
    this.setState({
      purchasingSystem: state.purchasingSystem
    })
  }
  
  changeOther = (event) => {
    this.setState({
      purchasingSystem: {
        key: PURCHASE_SYS_OTHER,
        value: event.currentTarget.value
      },
      needsAssistance: true
    })
  }

  getPayLoadT = () => {
    return new Object({
      value : "",
      path : "",
      op : "replace"
    });
  }

  getPurchaseSysObj = () => {
    let _self = this;
    let obj = _self.getPayLoadT();
    obj.value = _self.state.purchasingSystem || {};
    obj.path = "/PurchasingSystem";
    return obj;
  }
  
  getNeedsAssistanceObj = () => {
    let _self = this;
    let obj = _self.getPayLoadT();
    obj.value = _self.state.needsAssistance;
    obj.path = "/needsAssistance";
    return obj;
  }

  getPayLoad = () => {
    let _self = this;
    let payLoad = [];
    payLoad.push(_self.getPurchaseSysObj());
    payLoad.push(_self.getNeedsAssistanceObj());
    return payLoad || [];
  }

  submitPurchaseSystemForm = (e) => {
    e.preventDefault();
    let _self = this;
    let updatedState = _self.formInitialState;
    if (e.target.dataset.action == "save") {
      if (_self.state.purchasingSystem && !_self.state.purchasingSystem.value) {
        return false;
      }
      Services.patchIntegrationReq(updatedState.postData.id, _self.getPayLoad())
        .then(function (response) {
          console.log("Updated Purchasing System : " + response);
          //_self.setState({postData:response.data});     
          updatedState = _.merge({}, _self.formInitialState, { postData: { purchasingSystem: _self.state.purchasingSystem, needsAssistance: _self.state.needsAssistance }, metaData: { identifyPurchaseSystem: ERP_STATUS_COMPLETE } });
          _self.routeToParent(updatedState);
        })
        .catch(function (error) {
          console.error("Purchasing System Updation Failed....: " + error);
          _self.routeToParent(updatedState);
        });     
    }
    else {
      _self.routeToParent(updatedState);
    }
  }
  routeToParent = (updatedState) => {
    this.props.router.push({
      pathname: '/ErpIntegrationContainer',
      state: updatedState
    });
  }

  componentDidMount() {
    document.title = CMS.data.PurchasingSystemPage_BrowserTitle;
    window.scrollTo(0, 150);
  }

  render() {
    let { stepSubmitForm, stepCancelForm, stepExitForm } = this.props;
    let defaultValues = _.merge({}, this.state);
    let _self = this;
    let systems = purchaseSystems;
    let listSystemHTML = systems.map((system) => {
      return (<div key={system.name} className="radio-button w-radio"><label className="w-form-label" style={{fontWeight: system.fontStyle}}><input name={system.name} onChange={this.selectSystem} checked={this.state.purchasingSystem.key === system.name} className="w-radio-input margin-left-n20" type="radio" value={system.value}/>{system.label}</label></div>);
    });

    let self = this;
    return (
      <div className="erpPurchaseSystem">
        <CustomerInfoHeader />
        <Header />
        <Breadcrumb />
        <div className="erpPurchaseSystem-form">
          <div className="default-section">
            <div className="default-div">
              <h1 className="d-bottom-offset-30">{CMS.data.PurchasingSystemPage_Heading}</h1>
            </div>
          </div>
          <div className="default-div">
            <div className="w-row">
              <div className="no-padding right-padding-15 w-col w-col-9 z-index-10">
                <div className="div-step-content state-1">
                  <div className="form w-form">
                    <div className="field-label">
                      {CMS.data.PurchasingSystemPage_DescriptionText}
                      <strong>{CMS.data.PurchasingSystemPage_DescriptionWarningText}</strong>:
                    </div>
                    <Form
                      onSubmit={(values) => {
                        return true;
                      }}
                      defaultValues={defaultValues}
                      validate={values => {
                        let errors = {
                          PurchaseSysError: !self.state.purchasingSystem.key ? 'Please select an option' : false,
                          PurchaseSysOther: (self.state.purchasingSystem.key === PURCHASE_SYS_OTHER && !self.state.purchasingSystem.value ) ? 'What other purchasing system do you use?' : false,
                        }
                        return errors;
                      }}
                      onValidationFail={() => {
                        _self.state.submittable = false;
                      }}
                    >
                      {({ submitForm, setValue, values, resetForm }) => {
                        return (
                          <form onSubmit={submitForm}>
                            <div className={!this.state.submittable && !this.state.purchasingSystem.key?"erpNoSelection":""}>  
                              <div className="form w-form" data-automationId="PurSys_ERPList">
                                {listSystemHTML}
                              </div>
                              {this.state.purchasingSystem.key === PURCHASE_SYS_OTHER ? <div className="form-enter-erp left-margin-20 w-form" >
                                <label className="field-label" htmlFor="other-purchasing-system">{CMS.data.PurchasingSystemPage_OtherErpNameText}:</label>
                                <input data-automationId="PurSys_TextOtherErp" onChange={this.changeOther} value={this.state.purchasingSystem.value || ''} className="field w-input" maxLength="256" type="text" style={{ transition: 'border 0.2s ease 0s, box-shadow 0.2s ease 0s, box-shadow 0.2s ease 0s' }} />
                              </div> : ''
                              }
                              <FormError field='PurchaseSysOther' className="w-form-fail" />
                            </div>
                            <div><FormError field='PurchaseSysError' className="erpNoSelection-error"/></div>
                            <div className="d-bottom-offset-30 d-hr-gray"></div>
                            <div className="d-top-offset-30 flex-horizontal-start-center">
                              <div className="right-margin-10">
                                <button className="d-btn d-btn-primary right-margin-10 w-button" 
                                data-automationId="PurSys_LnkSaveExit" 
                                data-action="save" 
                                onClick={(e) => { submitForm(); this.submitPurchaseSystemForm(e); }}>
                                  {/*<div dangerouslySetInnerHTML={renderContent(CMS.data.PurchasingSystemPage_SaveAndContinueButton)}></div>*/}
                                  Save & Continue
                                </button>
                              </div>
                              <div className="right-margin-10">|</div>
                              <div className="right-margin-10"><div className="default-link" data-automationId="PurSys_LnkCancelIntegration" data-action="cancel" onClick={(e) => { resetForm(); this.submitPurchaseSystemForm(e); }}>{CMS.data.PurchasingSystemPage_CancelButton}</div></div>
                            </div>
                          </form>
                        )
                      }}
                    </Form>
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

export default ErpPurchaseSystem;
