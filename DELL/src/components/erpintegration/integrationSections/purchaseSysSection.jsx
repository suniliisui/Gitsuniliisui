import React, {Component} from 'react';
import * as constants from '../../common/constants/constants.jsx';
import erpFormStaticData from '../../common/constants/erpFormStaticData.jsx';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.PURCHASE_SYSTEM_SECTION);
}

class PurchaseSysSection extends Component {
  constructor(props) {
    super(props);     
    this.purchaseSys = props.formState && props.formState.postData && props.formState.postData.purchasingSystem && props.formState.postData.purchasingSystem.value || '---';
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.status === constants.ERP_STATUS_COMPLETE){
      this.purchaseSys = nextProps.formState && nextProps.formState.postData && nextProps.formState.postData.purchasingSystem && nextProps.formState.postData.purchasingSystem.value || '---';
    }
  }

  render() {
    return (
      <div className="w-col w-col-11" data-automationid="PurchaseSysSection">
        <div className="purchasesystem-state">
          <div className="default-paragraph">
            <strong>{CMS.data.IntegrationHomePage_ErpStepSelectedErpText}<br /></strong>
            {this.purchaseSys}
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseSysSection;
