import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import dynamics from 'dynamics.js';
import centerComponent from 'react-center-component';
import EventStack from 'active-event-stack';
// import keycode from 'keycode';
import { inject } from 'narcissus';

import ModalHeader from "./modalHeader";

const styles = {
  dialog: {
    boxSizing: 'border-box',
    position: 'relative',
    background: 'white',
    padding: 20,
    color: '#333',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.4)',
    borderRadius: 2,
  }
};

// This decorator centers the dialog
@centerComponent
export default class ModalDialog extends React.Component {
  
  static defaultProps = {
    width: '75%',
    margin: 20,
    dismissOnBackgroundClick: true,
  }
  componentWillMount = () => {
    /**
     * This is done in the componentWillMount instead of the componentDidMount
     * because this way, a modal that is a child of another will have register
     * for events after its parent
     */
    this.eventToken = EventStack.addListenable([
      [ 'click', this.handleGlobalClick ],
      [ 'keydown', this.handleGlobalKeydown ],
    ]);
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.topOffset !== null && this.props.topOffset === null) {
      // This means we are getting top information for the first time
      if (!this.didAnimateInAlready) {
        // Double check we have not animated in yet
        this.animateIn();
      }
    }

    if (nextProps.componentIsLeaving && !this.props.componentIsLeaving) {
      const node = ReactDOM.findDOMNode(this);
      dynamics.animate(node, {
        scale: 1.2,
        opacity: 0,
      }, {
        duration: 300,
        type: dynamics.easeIn,
      });
    }
  };
  componentWillUnmount = () => {
    EventStack.removeListenable(this.eventToken);
  };
  didAnimateInAlready = false;
  shouldClickDismiss = (event) => {
    const { target } = event;
    // This piece of code isolates targets which are fake clicked by things
    // like file-drop handlers
    if (target.tagName === 'INPUT' && target.type === 'file') {
      return false;
    }
    if (!this.props.dismissOnBackgroundClick) {
      if (target !== this.refs.self || this.refs.self.contains(target)) return false;
    } else {
      if (target === this.refs.self || this.refs.self.contains(target)) return false;
    }
    return true;
  };
  handleGlobalClick = (event) => {
    if (this.shouldClickDismiss(event)) {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose(event);
      }
    }
  };
  handleGlobalKeydown = (event) => {
    if (keycode(event) === 'esc') {
      if (typeof this.props.onClose == 'function') {
        this.props.onClose(event);
      }
    }
  };
  animateIn = () => {
    this.didAnimateInAlready = true;

    // Animate this node once it is mounted
    const node = ReactDOM.findDOMNode(this);

    // This sets the scale...
    if (document.body.style.transform == null) {
      node.style.WebkitTransform = 'scale(0.5)';
    } else {
      node.style.transform = 'scale(0.5)';
    }

    dynamics.animate(node, {
      scale: 1,
    }, {
      type: dynamics.spring,
      duration: 500,
      friction: 400,
    });
  };
  render = () => {
    const {
      props: {
        children,
        className,
        componentIsLeaving, 
        left, 
        leftOffset,
        margin,
        onClose,
        recenter, 
        style,
        top, 
        topOffset,
        width,
        dismissOnBackgroundClick,
        title,
        ...rest,
      },
    } = this;

    const dialogStyle = {
      position: 'absolute',
      marginBottom: margin,
      width: width,
      top: Math.max(topOffset, margin),
      left: leftOffset,
      ...style,
    };

    const divClassName = classNames(inject(styles.dialog), className);

    return <div {...rest}
      ref="self"
      className={divClassName}
      style={dialogStyle}
    >
      <ModalHeader onClose={onClose} title={title} />
      {children}
    </div>;
  };
}
