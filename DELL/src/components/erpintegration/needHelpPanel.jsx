import React, {Component} from 'react';
import ContactUs from '../erpintegration/SlidingPanes/ContactUs.jsx';
import Faq from '../erpintegration/SlidingPanes/faq.jsx';
import ErpMapping from '../common/constants/erpformfaqmapping';
import ReactSlidingPane from './SlidingPanes/Custom/SlidingPane.jsx';
import { getDataFromCms, getCMSValuesforKeys } from '../common/utils/cmsResponse.jsx';
import { CMS_KEY_COLLECTION } from '../common/constants/constants.jsx';

class CMS {
  static data = getCMSValuesforKeys(CMS_KEY_COLLECTION.NEED_HELP_PANEL);
}

class NeedHelpPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading:'',
            isPaneOpen: false,
            isPaneOpenLeft: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 150);
        let currentview =this.setKeys(window.location.hash);
        let mapkey = currentview.displayname;
        const getMapKeyData = getDataFromCms(mapkey);    
        this.setState({'heading':getMapKeyData?getMapKeyData:'New Integration'});
    }

    setKeys(hashurl) {
        var returnval;
        ErpMapping.forEach((item, index) => { if (item.loginval === hashurl.split('#')[1].split('?')[0]) { returnval = item; } })
        return returnval ? returnval : ErpMapping[0];
    }
    
    render() {
        return (
            <div className="left-padding-15 no-padding w-col w-col-3">
                <div className="div-help-options" data-ix="show-hide-help">
                    <div className="background-quartz padding-10" data-automationId="NeedHelpPanel">
                        <div className="d-bottom-offset-10">
                            <a className="default-link" onClick={() => this.setState({ isPaneOpen: true, isfaq: true })}>{CMS.data.GeneralContent_FaqLink}</a>
                        </div>
                        <div className="d-bottom-offset-10">
                            <a className="default-link" onClick={() => this.setState({ isPaneOpen: true, isfaq: false })}>{CMS.data.GeneralContent_ContactDellExpertLinkText}</a>
                        </div>
                    </div>
                </div>
                <div>
                    <ReactSlidingPane
                        className='some-custom-class'
                        overlayClassName='some-custom-overlay-class'
                        isOpen={this.state.isPaneOpen}
                        title={'Return to ' + this.state.heading}
                        //subtitle='Optional subtitle.'
                        width='50%'
                        onRequestClose={() => {
                            // triggered on "<" on left top click or on outside click
                            this.setState({ isPaneOpen: false });
                        }}>
                        {!this.state.isfaq ? <ContactUs onRequestClose={() => {
                            // triggered on "<" on left top click or on outside click
                            this.setState({ isPaneOpen: false });
                        }}></ContactUs> :
                            <Faq onRequestClose={() => {
                                // triggered on "<" on left top click or on outside click
                                this.setState({ isPaneOpen: false });
                            }}></Faq>}
                    </ReactSlidingPane>
                </div>
            </div>
        );
    }
}

export default NeedHelpPanel;
