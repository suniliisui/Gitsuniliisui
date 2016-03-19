/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var horizontalTilingWidget = new Object();

horizontalTilingWidget.name = 'widget.horiz.tiling';

registerWidgetObject(horizontalTilingWidget);


horizontalTilingWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = new Object();
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	widgetInstance.donotDestroy = function(){
		return true;
	};
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
	};
	
	widgetInstance.finalize = function() {
		
	};
	widgetInstance.hide = function() {
		
	};
	
	return widgetInstance;
};