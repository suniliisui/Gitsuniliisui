/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */


var errorWidget = {};
errorWidget.name = 'widget.error';
registerWidgetObject(errorWidget);

errorWidget.createWidgetInstance = function (instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj, renderer){
		renderer.render();
    };	
	
	return widgetInstance;
};