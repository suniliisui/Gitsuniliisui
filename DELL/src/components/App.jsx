import React, {Component} from 'react';
import { Link } from 'react-router';
import DropDown from './dropdown/DropDown.jsx';
import Header from './common/header/header.jsx';
import Footer from './common/footer/footer.jsx';
import Breadcrumb from './common/breadcrumb/breadcrumb.jsx';
import CustomerInfoHeader from './common/customerInfoHeader/customerInfoHeader.jsx';
import NeedHelpPanel from './erpintegration/needHelpPanel.jsx';

class App extends Component {
  render() {
    var options = ["Agresso","Banner","Basware","ePlus","Eschool Mall","GHX Procurement Suite","Great Plans","IBX","JD Edwards","Ketera","Lawson","Market4Care","Maximo","MS Dynamics","Munis","Oracle","Other","Periscope","Perigon","PMM","Puridiom","Quosal","QuoteWerks","Researching","ServiceNow","SunGard","Vinimaya","Visma Proceedo","Wincap"];
    
    return (
      <div className="mainApp">
        <CustomerInfoHeader></CustomerInfoHeader>  
        <Header></Header>
        <Breadcrumb></Breadcrumb>
        <div className="erp-integration-flow">
            <div className="container">
                <div className="default-section">
                    <div className="default-div">
                        <h1 data-automationId="PageHeader">ERP Integration</h1>
                    </div>
                </div>
                <div className="default-div">
                    <div className="w-row">
                        <div className="no-padding right-padding-15 w-col w-col-9">
                            <h3 className="bottom-margin-30 no-margins" data-ix="show-hide-fixed-navbar">You’re on your way to PremierConnect! We can walk you through each step of your ERP integration. Here is how it works:</h3>
                            <div className="d-bottom-offset-30 flex-horiz-space-stretch">
                                <div className="get-started-step get-started-step-align">
                                    <div className="d-bottom-offset-10 numbered-circle">
                                        <h1 className="no-margins text-bold">1</h1>
                                    </div>
                                    <h4 className="font-center no-margins">Verify your contact information</h4>
                                </div>
                                <div className="get-started-step get-started-step-align">
                                    <div className="d-bottom-offset-10 numbered-circle">
                                        <h1 className="no-margins text-bold">2</h1>
                                    </div>
                                    <h4 className="font-center no-margins">Tell us about your organization</h4>
                                </div>
                                <div className="get-started-step get-started-step-align">
                                    <div className="d-bottom-offset-10 numbered-circle">
                                        <h1 className="no-margins text-bold">3</h1>
                                    </div>
                                    <h4 className="font-center no-margins">Identify your purchasing system</h4>
                                </div>
                                <div className="get-started-step get-started-step-align">
                                    <div className="d-bottom-offset-10 numbered-circle">
                                        <h1 className="no-margins text-bold">4</h1>
                                    </div>
                                    <h4 className="font-center no-margins">Select PunchOut or Buyer-hosted catalog</h4>
                                </div>
                                <div className="get-started-step get-started-step-align">
                                    <div className="d-bottom-offset-10 numbered-circle">
                                        <h1 className="no-margins text-bold">5</h1>
                                    </div>
                                    <h4 className="font-center no-margins">Select transaction types</h4>
                                </div>
                            </div>
                            <div className="d-bottom-offset-20 flex-horizontal-start-stretch">
                                <div className="flex-expand right-padding-15 width-max-80per">
                                    <div className="d-bottom-offset-20">
                                        Your progress will be saved during these steps so you can resume integration at a later time. Are you ready to continue?
                                    </div>
                                    <div className="d-bottom-offset-20">
                                        If you prefer, you can ask someone else at your organization to answer the technical questions about your purchasing system, catalog and transaction types.
                                    </div>
                                    <div>
                                        You can also request integration assistance from one of our Dell experts, but this probably won’t be as fast as trying it yourself.
                                    </div>
                                </div>
                                <div className="width-min-20per">
                                    <Link className="d-bottom-offset-20 d-btn d-btn-block d-btn-lg d-btn-primary w-button" to="/ErpIntegrationContainer" data-automationId="BtnContinue">Continue</Link>
                                    <a className="d-bottom-offset-20 d-btn d-btn-block d-btn-default d-btn-lg w-button" href="#" data-automationId="BtnRequestTechHelp">Request Technical Help</a>
                                    <a className="d-btn d-btn-block d-btn-default d-btn-lg w-button" href="#" data-automationId="BtnContactDellHelp">Contact a Dell Expert</a>
                                </div>
                            </div>
                        </div>
                        <NeedHelpPanel></NeedHelpPanel>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default App;
