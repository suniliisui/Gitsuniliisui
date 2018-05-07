import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class ModalHeader extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render(){
    return (
      <div className="modal-header-wrapper">
        <a className="modal-close-button w-inline-block" data-ix="close-modal" onClick={this.props.onClose}>
            <div className="modal-close-icon"></div>
          </a>
        <div className="modal-title-wrapper">
          <div className="text-block-2">{this.props.title}</div>
        </div>
      </div>
    )
  }
}