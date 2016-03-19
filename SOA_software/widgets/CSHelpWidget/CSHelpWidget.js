/*globals $ registerWidgetObject getDisplayValue login getJSONArray atmometadata renderLayout FDN tagValidation bindAutoCompleteForTags soaSelect formValidationEngine dd_menus*/
/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var CSHelp = {};
CSHelp.name = 'widget.cshelp';
registerWidgetObject(CSHelp);

CSHelp.createWidgetInstance = function (instanceName, props) {
	var widgetInstance = {};
	var mylayout = null;
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template === undefined) {
		this.template = $.template(null, $("#CSHelpWidgetTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj){
		$(layoutWidgetInstanceDOMObj).html($.tmpl(widgetInstance.widgetInstanceTemplate,null));
		$(".csHelpContainer",layoutWidgetInstanceDOMObj).csHelp({csHelpName: props.preferenceName, csHelpURL: props.contentResourceUri});
	};
	widgetInstance.hide = function(){
		$("#"+ instanceName).remove();
	};
	return widgetInstance;
};