/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */

var apiVersionsWidget = {};

apiVersionsWidget.name = 'widget.api.versions';
apiVersionsWidget.isInitComplete = false;
apiVersionsWidget.initBindings = function() {

apiVersionsWidget.createWidgetInstance = function (instanceName) {
    var widgetInstance = {};
    var appname = null;
    widgetInstance.widgetObject = this;
    widgetInstance.widgetInstanceName = instanceName;
    widgetInstance.apiname = null;
    
    if (this.template == null) {
		this.template = jQuery.template(null, $("#ApiVersionsTemplate"));
	}
    widgetInstance.widgetInstanceTemplate = this.template;
    
    widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
    	layoutWidgetInstanceDOMObj.empty();
    	widgetInstance.data = {};
		// renderKey is a unique key used to make sure only the current request's content is added to the dom and not any obsolete content by the 
		// slow performing 'callback' from previous requests. 
		var renderKey = (new Date()).getTime();
		$(layoutWidgetInstanceDOMObj).attr('key', renderKey);
		
    	widgetInstance.executeAjaxCalls(viewObj, layoutWidgetInstanceDOMObj);
    	var retryCounter = 0;
    	widgetInstance.renderWidget(layoutWidgetInstanceDOMObj, renderKey, retryCounter);
    };
    
    widgetInstance.getVersionHistory = function (viewObj,layoutWidgetInstanceDOMObj) {
    	var callIndex = widgetInstance.allAjaxAsyncCallsReturned.length;
    	widgetInstance.allAjaxAsyncCallsReturned[callIndex] = false;
    	$.ajax({
			type: 'GET',
			url: atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId + "/versions",
			accept: "application/json",
			async : true,
			dataType: "json",
    		context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj, "viewObj" : viewObj },
			success: function(data){
				widgetInstance.data = data;
				widgetInstance.allAjaxAsyncCallsReturned[callIndex] = true;
			},
			error: function (data, textStatus, errorThrown) {
				widgetInstance.allAjaxAsyncCallsReturned[callIndex] = true;
				alert(textStatus + " - error: " + errorThrown );
			}
		});
    };
    widgetInstance.executeAjaxCalls = function(viewObj, layoutWidgetInstanceDOMObj) {
    	widgetInstance.allAjaxAsyncCallsReturned = [];
    	widgetInstance.getApiName(viewObj, layoutWidgetInstanceDOMObj);
    	widgetInstance.getVersionHistory(viewObj, layoutWidgetInstanceDOMObj);

    };
    widgetInstance.getApiName = function(viewObj, layoutWidgetInstanceDOMObj) {
    	var callIndex = widgetInstance.allAjaxAsyncCallsReturned.length;
    	widgetInstance.allAjaxAsyncCallsReturned[callIndex] = false;
    	$.ajax({
			type: "GET",
			url: atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId,
			contentType:"application/x-www-form-urlencoded",
			async : true,
			dataType: "json",
			context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj, "viewObj" : viewObj },
			success: function (data, textStatus, jqXHR) {
				if (data != null) {
					widgetInstance.apiname = data.Name;
				}
				widgetInstance.allAjaxAsyncCallsReturned[callIndex] = true;
			},
			error: function (data, textStatus, errorThrown) {
				widgetInstance.allAjaxAsyncCallsReturned[callIndex] = true;
				alert(textStatus + " - error: " + errorThrown );
			}
		});
    };
    
    widgetInstance.renderWidget = function(domObject, renderKey, retryCounter) {
    	var allCallsReturned = true;
    	for(var i=0; i<widgetInstance.allAjaxAsyncCallsReturned.length; i++) {
    		if(widgetInstance.allAjaxAsyncCallsReturned[i] == false) {
    			allCallsReturned = false;
    		}
    	}
    	if(allCallsReturned) {
    		var domObjectElement = $('[key='+renderKey+']');
    		widgetInstance.data.apiName=widgetInstance.apiname;
			$.tmpl(widgetInstance.widgetInstanceTemplate, widgetInstance.data).appendTo(domObjectElement);
    	} else if(retryCounter < 10) {
    		setTimeout(function(){
    			widgetInstance.renderWidget(domObject, renderKey, ++retryCounter);
    		}, 500);
    	} else {
    		var domObjectElement = $('[key='+renderKey+']');
    		domObjectElement.append('<h4><font color=red>Load API Versions request timed out.  </font></h4>');
    	}
    };

    return widgetInstance;
};

registerWidgetObject(apiVersionsWidget);
apiVersionsWidget.initBindings();



