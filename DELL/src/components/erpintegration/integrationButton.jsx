import React, {Component} from 'react';
import { Link } from 'react-router';

class IntegrationButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="state-1 width-20per">
                <div className=" width-100per">
                    <div className="state-1">
                        <Link
                          className="d-btn d-btn-block d-btn-primary w-button"
                          to={{
                            pathname: this.props.link,
                            state: this.props.formState
                          }}
                          data-automationId={this.props.automationId}
                          style={this.props.style}>{this.props.displayText}</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default IntegrationButton;
