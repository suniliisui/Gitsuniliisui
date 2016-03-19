/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var footerWidget = {};

footerWidget.name = 'widget.footer';

registerWidgetObject(footerWidget);

footerWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template == null) {
		this.template = $.template(null, $("#FooterWidgetTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.donotDestroy = function(){
		return true;
	};
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		$.tmpl(widgetInstance.widgetInstanceTemplate, {}).appendTo(layoutWidgetInstanceDOMObj);
	};
	
	return widgetInstance;
};