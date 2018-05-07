import React, {Component} from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
        <div className="default-section flex-vertical position-relative">
            <div className="div-masthead-tier1">
                <div className="default-div">
                    <a data-automationId="LogoLink" className="w-inline-block" href="/"><img alt="Dell Logo" src="./assets/icons/Dell_Logo_Wht_49x49.png"/></a>
                </div>
            </div>
            <div className="div-masthead-tier2">
                <div className="default-div div-flex-horizontal position-relative">
                    <div className="d-icon d-icon-ui d-icon-size-36 d-icon-color-quartz up-arrow-masthead-account">
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold" href="#">Manage Profile</a>
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold left-padding-35" href="#">Manage Site</a>
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold left-padding-35" href="#">Contacts</a>
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold left-padding-35" href="#">Reports</a>
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold left-padding-35" href="#">Shared Documents</a>
                    </div>
                    <div className="masthead-tier2">
                        <a className="default-link text-bold left-padding-35" href="/premierconnect-learn-authenticated">ERP Integration</a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Header;