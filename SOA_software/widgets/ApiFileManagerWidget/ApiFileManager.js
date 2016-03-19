/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */

/*
 * TODO:
 * 1) type based drop-downs are reset when view or sort by is changed 
 * 2) When adding comments 'View All' link isn't updating.
 */


var apiFileManagerWidget = {}; 

apiFileManagerWidget.name = 'widget.api.filemanager';
apiFileManagerWidget.templateItem = null;
apiFileManagerWidget.templateOptions = null;

registerWidgetObject(apiFileManagerWidget);


apiFileManagerWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = new Object();
	widgetInstance.widgetObject = this;
	widgetInstance.instanceName = instanceName;
	widgetInstance.dom = null;
	widgetInstance.uri = null;
	var currLocPath = getCurrentLocationPath();
	if (currentView.objectType=='api'&&currLocPath.indexOf("/versions")>-1) {
		widgetInstance.uri = currLocPath.replace(/\#/gi, '/content').split("/versions")[0] + "/details" ;
	} else {
		widgetInstance.uri = currLocPath.replace(/\#/gi, '/content');			
	}

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		this.dom = layoutWidgetInstanceDOMObj;
		$.tmpl($.template(null, $("#" + this.instanceName + "LayoutTemplate")), null).appendTo(layoutWidgetInstanceDOMObj);
		var tocs = widgetInstance.getTOCData().split(",");
		for (var i=0;i<tocs.length;i++) {
			$("#fileManagerList").append("<div style='padding:4px;'><a href='#'>" + tocs[i] + "</a></div>");
		}
	};

	widgetInstance.finalize = function() {
		
	};

	widgetInstance.hide = function() {
		if (this.dom) {
			this.dom.empty();
		}
	};


	widgetInstance.getTOCData = function() {
		var uri = this.uri;
		var rtn = null;
		var dirs = uri.split("/");
		var docuri = "";
		var weburi = "";
		for (var i=0;i<dirs.length-1;i++) {
			if (dirs[i]!='') {
				docuri += "/" + dirs[i];
			}
		}
		var finaluri = docuri +  '/documents/Documents';

		$.ajax({
			type: "GET",
			url: finaluri + "/toc.htm",
			cache:true,
			async:false,
			success: function (data) {
				try {
					var len = data.length;
					if (data.length!=null) {
						rtn = data;
					}
				} catch(e) {
					
				}
			},
			error: function (data, textStatus, errorThrown) {
				
			}
		});
		return rtn;
	};
	return widgetInstance;
};

