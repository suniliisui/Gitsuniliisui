import React, {Component} from 'react';
import * as constants from '../../common/constants/constants.jsx';
import erpFormStaticData from '../../common/constants/erpFormStaticData.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.LOGIN_CREDENTIALS_SECTION);
}

class LoginCredentialsSection extends Component {
  constructor(props) {
    super(props);
    const { loginId, password } = props.formState && props.formState.postData && props.formState.postData || {};
    this.loginId = loginId || '---';
    this.password = password || '---';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === constants.ERP_STATUS_COMPLETE) {
      this.loginId = nextProps.formState && nextProps.formState.postData && nextProps.formState.postData.loginId || '---';
      this.password = nextProps.formState && nextProps.formState.postData && nextProps.formState.postData.password || '---';
    }
  }

  render() {
    return (
      <div className="w-col w-col-11" data-automationid="loginCredentialsSection">
        <div className="table-column1-block">
            <div className="d-bottom-offset-10 default-paragraph">
              <strong>{CMS.data.IntegrationHomePage_ConfigLoginStepIdText}<br /></strong><div>{this.loginId}</div>
            </div>
          <div className="state-4" data-ix="initial-display-none">
            <div className="default-paragraph">
              <strong>{CMS.data.IntegrationHomePage_ConfigLoginStepPwdText}<br /></strong>
              <div>{'*'.repeat(this.password.length)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginCredentialsSection;
