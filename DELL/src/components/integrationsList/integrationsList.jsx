import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Header from '../common/header/header.jsx';
import Footer from '../common/footer/footer.jsx';
import { Icon, StatusBlock } from '../common/utils/icon.jsx';
import Breadcrumb from '../common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from '../common/customerInfoHeader/customerInfoHeader.jsx';
import Services from '../common/services/services.jsx';
import { CMS_KEY_COLLECTION } from '../common/constants/constants.jsx';
import { getCMSValuesforKeys } from '../common/utils/cmsResponse.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.ERP_INTEGRATIONS_LIST);
}

const IntegrationsContainer = (props) => {
  if (props.hasIntegrations)
    return <IntegrationsContent {...props} />

  if (props.loading)
    return null;

  return <IntegrationStart />
}

const IntegrationStart = () => {
  return (
    <div className="default-div">
      <IntegrationsHeader />
      <h3 className="d-bottom-offset-20">
        {CMS.data.IntegrationsListPage_NoIntegrationsText}
      </h3>
      <div className="flex-horizontal-start-center">
        <Link to={{pathname: "/ErpIntegrationContainer"}} className="d-btn d-btn-primary w-button right-margin-10">{CMS.data.IntegrationsListPage_BeginButton}</Link>
      </div>
      
    </div>
  )
}

const IntegrationsHeader = () => {  
  return (
    <div>
      <h1>{CMS.data.IntegrationsListPage_HeaderText}</h1>
      <div className="d-bottom-offset-20 default-paragraph">
        {CMS.data.IntegrationsListPage_DescriptionText}
      </div>
    </div>
  )
}

const IntegrationsContent = (props) => {
  const inProgressIsTopGroup = (props.inProgressIntegrations.length > 0);
  return (
    <div className="integration-status-progress">
      <div className="default-section">
        <div className="default-div">
          <IntegrationsHeader />
          <IntegrationsNeedingAssistance integrations={props.flaggedIntegrations} />
        </div>
      </div>
      <div className="default-section flex-vertical-start-center">
        <div className="d-bottom-offset-10 default-div flex-horizontal-start-center">
          <div className="default-div">
            <IntegrationGroup title="In Progress" isTopGroup={inProgressIsTopGroup} integrations={props.inProgressIntegrations} />
            <IntegrationGroup title="Completed" isTopGroup={!inProgressIsTopGroup} integrations={props.completedIntegrations} />            
          </div>
        </div>
      </div>
    </div>
  )
}

const IntegrationsNeedingAssistance = (props) => {
  if (props.integrations.length === 0)
    return null;
    
  return (
    <div className="d-alert d-bottom-offset-30">
      <div className="div-block-11">
        <div className="d-padding-right-10">
          <Icon name="info" size="28" />
        </div>
        <div className="notification-content">
          <div className="default-paragraph">{CMS.data.IntegrationsListPage_InProgressAlertText}</div>
          <ul>
            {props.integrations.map((intReq, idx) => {
              return (
                <li key={intReq.id}>
                  <span>{CMS.data.IntegrationsListPage_DellExpertAlertText} </span>
                  <Link to={{pathname: "/ErpIntegrationContainer", state: { postData: {...intReq}}}} className="default-link">
                    {intReq.integrationRequestName} {intReq.integrationRequestId}
                  </Link>
                </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

const IntegrationGroup = (props) => {
  if (props.integrations.length == 0)
    return null;

  return (
    <div style={{ borderBottom: "1px solid #aaa" }}>
      <IntegrationGroupHeader title={props.title} isTopGroup={props.isTopGroup} />
      <IntegrationList integrations={props.integrations} />
    </div>
  )
}

const IntegrationGroupHeader = (props) => {
  return (
    <div className="flex-horizontal-start-center">
      <h2 className="d-top-offset-30 flex-expand">{props.title} {CMS.data.IntegrationsListPage_CompleteHeading}</h2>
      <IntegrationGroupOptions isTopGroup={props.isTopGroup} />
    </div>
  )
}

const IntegrationGroupOptions = (props) => {
  if (!props.isTopGroup)
    return null;

  return (
    <Link to={{pathname: "/ErpIntegrationContainer"}} className="default-link" data-automationid="LnkNewIntegration">
      <div className="flex-horizontal-start-center">
        <div className="d-icon d-icon-sml right-margin-5"><span className="hyperlinkWithOutUnderline" style={{display: "inline-block"}}></span></div>
        <div>{CMS.data.IntegrationsListPage_NewIntegrationLink}</div>
      </div>
    </Link>
  )
}

const IntegrationList = (props) => {
  return (<div>{props.integrations.map(i => <IntegrationRow key={i.id} {...i} />)}</div>)
}

class IntegrationRow extends Component {
  click(e, id) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/ErpIntegrationContainer',
      state: { id: id }
      });
  }
  render() {
    return (
      <div className="manager-row">
        <div className="manager-column1">
          <h3 className="bottom-margin-5 no-margins">
            <Link to={{pathname: "/ErpIntegrationContainer", state: { postData: {...this.props}}}} className="default-link">
              {this.props.integrationRequestName} {this.props.integrationRequestId}
            </Link>
          </h3>
          <p className="default-paragraph">{CMS.data.IntegrationsListPage_startedonText} {this.props.dateCreatedMsg}</p>
        </div>
        <div className="manager-column2">          
          <StatusBlock status={this.props.statusMsg} />
        </div>
        <div className="manager-column3">
          <Link to={{pathname: "/ErpIntegrationContainer", state: { postData: {...this.props}}}} className="d-btn d-btn-primary w-button">{CMS.data.IntegrationsListPage_ViewIntegration}</Link>
        </div>
      </div>
    )
  }
}

class IntegrationsPage extends Component {
  state = { loading: true, testing: false};

  componentDidMount() {   
    document.title = CMS.data.IntegrationsListPage_BrowserTitle;
    let self = this;
    Services.getIntegrationReqs()
    .then(function (response) {
      if (!response || !response.data || response.data.length == 0) {
        console.log("No response data");
        self.setState({loading: false, hasIntegrations: false});
        return;
      }
      if (response.data.length > 0)
      {        
        response.data.filter(data => {
          data.statusMsg = data.status == "Complete" ? data.status : "In Progress";
          data.dateCreatedMsg = moment(data.dateCreated).format('MM-DD-YYYY [at] LT'); // time zone?
        });
        response.data.sort((a, b) => {
            return (new Date(a.dateCreated)).getTime() - (new Date(b.dateCreated)).getTime();
        });
        self.setState({
          loading: false,
          hasIntegrations: true,
          inProgressIntegrations: self.filterIntegrations(response.data, d => d.status !== "Complete"), 
          completedIntegrations: self.filterIntegrations(response.data, d => d.status === "Complete"),
          flaggedIntegrations: self.filterIntegrations(response.data, d => d.status !== "Complete" && d.needsAssistance)
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
  filterIntegrations(data, filter) {
    return data.filter(data => filter(data))
  }
  render() {            
    return (
      <div className="mainApp">
        <CustomerInfoHeader />
        <Header />
        <Breadcrumb />
        {/* <FontMap /> */}
        <IntegrationsContainer {...this.state} />
        <Footer />
      </div>
    );
  }
}
export default IntegrationsPage;