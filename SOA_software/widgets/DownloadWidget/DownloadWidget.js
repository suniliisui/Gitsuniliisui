/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var downloadWidget = {};

downloadWidget.name = 'widget.download';
downloadWidget.docBase = '/content/services/uddi:bb507dd4-841c-11e0-ad4f-afe6f82312fe/user-defined/';

registerWidgetObject(downloadWidget);

downloadWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;

	if (this.template === undefined) {
		this.template = jQuery.template(null, $("#DownloadTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		steal('/ui/apps/atmosphere/' + scriptsVersion + '/resources/thirdparty/ajaxupload.3.6.js')
		.then(function () {
			// Add the Table of Contents and Controls
			layoutWidgetInstanceDOMObj.append("<div class='toc'></div>");
			widgetInstance.fetchTOC();
		});
	};

	widgetInstance.fetchTOC = function() {
		var location = downloadWidget.docBase;
		$.ajax({
			url : location,
			type : "GET",
			async : false,
			dataType : "json",
			data : null,
			error : function(data, textStatus, errorThrown) {
				alert('Error retrieving data. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown);
			},
			success : widgetInstance.process
		});
	};

	widgetInstance.fileNameDialog = function() {
		var cancel = function() {
			$("#filenameDialog").dialog("close");
		};
		var getResponse = function() {
			downloadWidget.docName = $("#fileName").val();
			downloadWidget.saveDocument();
			$("#filenameDialog").dialog("close");
			widgetInstance.fetchTOC();
		};
		var dialogOpts = {
			modal : true,
			buttons : {
				"Done" : getResponse,
				"Cancel" : cancel
			},
			autoOpen : false
		};
		$("#filenameDialog").dialog(dialogOpts);
	};

	widgetInstance.uploadDialog = function() {

		var uploadUri = downloadWidget.docBase;
		new AjaxUpload('#fileUploadButton', {
			action : uploadUri,
			data : {
				'key1' : "This data won't",
				'key2' : "be send because",
				'key3' : "we will overwrite it"
			},
			onSubmit : function(file, ext) {
				this.setData({
					'name' : file
				});
			},
			onComplete : function(file) {
				widgetInstance.fetchTOC();
			}
		});

	};

	widgetInstance.process = function(jsonData) {
		$("#" + widgetInstance.widgetInstanceName + " .toc").empty();
		$.tmpl(widgetInstance.widgetInstanceTemplate, jsonData.resources).appendTo("#" + widgetInstance.widgetInstanceName + " .toc");
		widgetInstance.fileNameDialog();
		widgetInstance.uploadDialog();
	};

	widgetInstance.finalize = function() {

	};
	widgetInstance.hide = function() {

	};

	return widgetInstance;
};

downloadWidget.delDoc = function(uri) {
	var serverUrl = downloadWidget.docBase + uri;
	$.ajax({
		type : "DELETE",
		url : serverUrl,
		cache : false,
		async : false,
		success : function(data) {
			widgetInstances.Download.fetchTOC();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('Error retrieving data. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown);
		}
	});
};
