import React, {Component} from 'react';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import * as constants from '../../common/constants/constants.jsx';
import { CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.REQUEST_ACTIVATION_SECTION);
}

class RequestActivationSection extends Component {
  constructor(props) {
    super(props);
    this.reqActivationStatus = props.formState && props.formState.postData && props.formState.postData.productionRequestActivationDate || false;
  }

  render() {
    const reqActivationStatusTxt = this.reqActivationStatus ? 'A Dell expert is currently processing your request to activate the production environment.' : '---'
    return (
      <div className="w-col w-col-11" data-automationid="requestActivationSection">
        <div className="default-paragraph state-9">
          <strong>{CMS.data.IntegrationHomePage_IntegrationStepStatusText}<br /></strong>
          <div>{reqActivationStatusTxt}</div>
        </div>
      </div>
    );
  }
}

export default RequestActivationSection;
