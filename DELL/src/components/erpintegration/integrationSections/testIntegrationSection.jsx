import React, {Component} from 'react';
import * as constants from '../../common/constants/constants.jsx';
import erpFormStaticData from '../../common/constants/erpFormStaticData.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.TEST_INTEGRATION_SECTION);
}

class TestIntegrationSection extends Component {
  constructor(props) {
    super(props);
    this.confirmedDate = props.formState && props.formState.postData && props.formState.postData.testIntegrationConfirmedDate || '';
  }

  render() {
    const confirmedDate = new Date(this.confirmedDate);
    const displayDateStr = confirmedDate ? ('0' + (confirmedDate.getMonth()+1)).slice(-2) +"/"+ ('0' + (confirmedDate.getDate())).slice(-2) +"/"+ confirmedDate.getFullYear() : '';
    const testIntegrationStatus = this.confirmedDate ? 'Testing of the integration was confirmed on ' + displayDateStr + '.' : '---'

    return (
      <div className="w-col w-col-11" data-automationid="testIntegrationSection">
        <div className="default-paragraph state-7">
          <strong>{CMS.data.IntegrationHomePage_IntegrationStepStatusText}<br /></strong>
          <div>{testIntegrationStatus}</div>
        </div>
      </div>
    );
  }
}

export default TestIntegrationSection;
