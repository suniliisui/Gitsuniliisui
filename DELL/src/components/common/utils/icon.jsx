import React, { Component } from 'react';
import Services from '../../common/services/services.jsx';
import { INT_STATUS_COMPLETE, INT_STATUS_INPROGRESS } from '../../common/constants/constants.jsx';

const Icon = (props) => {
  const name = props.name;
  const className = props.className ? props.className : "";
  const style = props.style ? props.style : {};
  const sizeClass = props.size ? "d-icon-size-" + props.size : "";
  const icons = {
    complete: { classList: "d-icon d-icon-lg", color: "green", charCode: 58882},
    inprogress: { classList: "d-icon d-icon-lg", color: "orange", charCode: 58913},
    info: { classList: "d-icon d-icon-lg", color: "blue", charCode: 58884}
  };
  const colorClass = "d-icon-color-" + (props.color ? props.color : icons[name].color);
  
  return (
    <span className={`${icons[name].classList} ${sizeClass} ${colorClass} ${className}`} style={style}>
      {String.fromCharCode(icons[name].charCode)}
    </span>
  )
}

// enable to reveal font icon options
const FontMap = () => {
  return (
    <div className="d-icon-lg font-size-28" style={{textAlign: 'left'}}>
      <div>58913:  {"".charCodeAt()} (edit:lg)</div>
      <div>58882:  {"".charCodeAt()} (check:lg)</div>
      <div>58883:  {"".charCodeAt()} (inactive:lg)</div>
      <div className="d-icon-ui">58883:  {"".charCodeAt()} (inactive:ui)</div>
      {_.range(58880,58990).map(c => 
        <div>
          <span>{c}: </span><span>lg: {String.fromCharCode(c)}</span> <span className="d-icon-ui"> ui: {String.fromCharCode(c)}</span>
        </div>
      )} 
    </div>
  )
}

const StatusBlock = (props) => {
  const name = props.status.replace(" ", "").toLowerCase();
  const size = props.size ? props.size : "18";
  const className = props.className ? props.className : "";
  var style = props.style ? props.style : {};
  var inlineStyle = {};
  if (props.inline) {
    inlineStyle = { display: "inline" };
    _.merge(style, inlineStyle);
  }
  var labelStyle = _.merge({fontSize: size + "px", lineHeight: size + "px"}, inlineStyle);
  const statusMsg = name == "complete" ? INT_STATUS_COMPLETE : INT_STATUS_INPROGRESS;  
  return (
    <div className={`flex-horizontal-start-center ${className}`} style={style}>
      <Icon name={name} size={size} style={inlineStyle} />
      <h4 className="no-margins" style={labelStyle}>&ensp;{statusMsg}</h4>
    </div>
  )
}

export { Icon, FontMap, StatusBlock};