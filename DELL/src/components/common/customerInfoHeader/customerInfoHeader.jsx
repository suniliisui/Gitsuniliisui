import React, {Component} from 'react';
import { Link } from 'react-router';
import Services from '../../common/services/services.jsx';
import {  getCMSValuesforKeys } from '../utils/cmsResponse.jsx';
import { CMS_KEY_COLLECTION} from '../constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.CUSTOMER_INFO_HEADER);
}

class CustomerInfoHeader extends Component {
    constructor(props) {
        super(props);
        let userClaims = JSON.parse(sessionStorage.getItem("userclaims")) || {};
        this.rcId = userClaims.rcId || '',
        this.premierCustomerName = (userClaims.firstName || '') + " " + (userClaims.lastName || '')
    } 

  render() {
    return (
        <div className="background-quartz default-section">
            <div className="default-div div-customer-row">
                <div className="default-paragraph" data-automationId="ContactUs">
                    {CMS.data.DellCustomerInfo_ContactUs}
                </div>
                <div className="default-paragraph" data-automationId="LoginName">
                    {this.premierCustomerName} &nbsp;{this.rcId} -&nbsp;<a className="default-link">Logout</a>
                </div>
            </div>
        </div>
    );
  }
}

export default CustomerInfoHeader;
