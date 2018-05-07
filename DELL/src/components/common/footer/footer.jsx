import React, {Component} from 'react';
import { Link } from 'react-router';
import { getCMSValuesforKeys } from '../../common/utils/cmsResponse.jsx';
import { renderContent } from '../../common/utils/htmlcontentrender.jsx';
import { CMS_KEY_COLLECTION } from '../../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.FOOTER);
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="text-left dell-b2b-footer">
                <div className="default-section">
                    <div className="background-blue d-top-offset-30 div-flex-vertical">
                        <div className="default-div">
                            <div className="flex-horizontal-start-center height-50px">
                                <div>
                                    <a className="footer-link" data-automationId="Footer_LegalReg" href={CMS.data.GeneralContent_FooterLegalAndRegulatoryLink} target="_blank">{CMS.data.GeneralContent_FooterLegalAndRegulatoryLinkText} & {CMS.data.GeneralContent_FooterLegalAndRegulatoryLinkText2}</a>
                                </div>
                                <div>
                                    <a className="footer-link" data-automationId="Footer_TermsOfSale" href={CMS.data.GeneralContent_FooterTermsOfSaleLink} target="_blank">{CMS.data.GeneralContent_FooterTermsOfSaleLinkText}</a>
                                </div>
                                <div>
                                    <a className="footer-link" data-automationId="Footer_Privacy" href={CMS.data.GeneralContent_FooterPrivacyStatementLink} target="_blank">{CMS.data.GeneralContent_FooterPrivacyStatementLinkText}</a>
                                </div>
                                <div>
                                    <a className="footer-link" data-automationId="Footer_Feedback" href={CMS.data.GeneralContent_FooterFeedbackLink} target="_blank">{CMS.data.GeneralContent_FooterFeedbackLinkText}</a>
                                </div>
                            </div>
                        </div>
                        <div className="d-bottom-offset-20 default-div">
                            <div className="div-footer-divider-small"></div>
                            <div className="text-color-sky text-small">
                                {CMS.data.GeneralContent_FooterText}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText2}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText3}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText4}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText5}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText6}<br />
                                <br />
                                {CMS.data.GeneralContent_FooterText7}<br />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;
