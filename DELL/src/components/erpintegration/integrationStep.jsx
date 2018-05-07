import React, {Component} from 'react';
import { Link } from 'react-router';
import IntegrationButton from './integrationButton.jsx';
import { ERP_STATUS_COMPLETE, ERP_STATUS_INCOMPLETE, ERP_STATUS_CURRENT, ERP_STATUS_LABELS, INT_STATUS_COMPLETE, INT_STATUS_INPROGRESS } from '../common/constants/constants.jsx';
import { Icon, StatusBlock } from '../common/utils/icon.jsx';

class IntegrationStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayKeyData: []
        }
    }

    completedStepStyles() {
        const { index } = this.props.stepData;
        const { currentStep, prodRequestActivation } = this.props.formState.metaData;
        if (currentStep + 1> index || prodRequestActivation === ERP_STATUS_COMPLETE) {
            return { backgroundColor: '#6ea204' }
        } else if (currentStep + 1 === index) {
            return { backgroundColor: '#007db8' }
        } else {
            return { backgroundColor: '#ccc' }
        }
    }

    intButtonStatusStyles(){
        const { currentStep, prodRequestActivation} = this.props.formState.metaData;
        const { index } = this.props.stepData;

        if (currentStep + 1 < index || (index === 5 && currentStep === 4 && prodRequestActivation === ERP_STATUS_COMPLETE)) {
          return { display: 'none' }
        } else if (currentStep + 1 === index) {
          return { backgroundColor: '#007db8' }
        } else {
          return { backgroundColor: '#eee', borderColor: '#ccc', color: '#00618f' }
        }
    }

    renderButton() {
        const { currentStep, prodRequestActivation } = this.props.formState.metaData;
        const { index, formLinkURL, automationId } = this.props.stepData;
        
        if (prodRequestActivation === ERP_STATUS_COMPLETE && index === 5) {
          return null;
        } else if (prodRequestActivation === ERP_STATUS_COMPLETE && (index === 1 || index === 2)) {
          return <IntegrationButton link={''} style={{visibility: 'hidden'}}/>;
        }

        let btnText = ERP_STATUS_LABELS.BEGIN_TXT;
        if ((currentStep >= index) && index === 1) {
            btnText = ERP_STATUS_LABELS.EDIT_TXT;
        } else if ((currentStep >= index) && index === 2) {
            btnText = ERP_STATUS_LABELS.EDIT_PASSWORD_TXT;
        } else if ((currentStep >= index && currentStep > 2) && (index === 3 || index === 4)) {
            btnText = ERP_STATUS_LABELS.VIEW_TXT;
        }

        return <IntegrationButton formState={this.props.formState} link={formLinkURL} automationId={automationId} displayText={btnText} style={this.intButtonStatusStyles()}/>
    }
    render() {
        const { status, index, title, component } = this.props.stepData;
        const { currentStep, prodRequestActivation } = this.props.formState.metaData;
        let isFormComplete = false;
        let erpWizardStepId = "erp-wizard-step-" + index;
        if (index < currentStep+1) {
          isFormComplete = true;
        }
        let IntStatusMsg = this.props.formState.postData.status;
        if(IntStatusMsg === "Complete"){
            IntStatusMsg = INT_STATUS_COMPLETE
        }else {
            IntStatusMsg = INT_STATUS_INPROGRESS
        }
        // console.log('isFormComplete :::: ', isFormComplete, currentStep, index);
        return (
            <div className="integration-form">
                <div className="table-row-block" data-automationId={erpWizardStepId}>
                    <div className="state-1">
                        <div className="table-row-numbered">
                            <div className="background-dell-blue numbered-circle" style={this.completedStepStyles()}><h3 className="font-color-white no-margins text-bold">{index}</h3></div>
                        </div>
                    </div>
                    <div className="table-column1-block">
                        <div className="d-bottom-offset-10 flex-horizontal-start-center">
                            <h4 className="flex-expand">{title}</h4>
                            <div className="state-4" data-ix="initial-display-none">
                                <div className="default-paragraph right-margin-10">
                                    {
                                    (isFormComplete || (index !== 5 && currentStep === 4)) &&
                                        <StatusBlock status="Complete" size="14" />
                                    }
                                    {
                                    prodRequestActivation === ERP_STATUS_COMPLETE && index === 5 &&
                                        <StatusBlock status={IntStatusMsg} size="14" />
                                    }
                                </div>
                            </div>
                            {
                                this.renderButton()
                            }
                        </div>
                        <div className="state-1">
                            <div className="default-paragraph">
                                {<this.props.stepData.component formState={this.props.formState} status={this.props.stepData.status} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IntegrationStep;
