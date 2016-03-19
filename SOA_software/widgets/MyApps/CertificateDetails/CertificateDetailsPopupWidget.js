/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 * This software is the confidential and proprietary information of SOA Software,
 * Inc. and is subject to copyright protection under laws of the United States of
 * America and other countries. The use of
 * this software should be in accordance with the license agreement terms you
 * entered into with SOA Software, Inc.
 */
var myAppsCertficateDetailsPopupWidget = {};

myAppsCertficateDetailsPopupWidget.name = 'widget.myapps.editappcertificate.popup';

myAppsCertficateDetailsPopupWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;

	if (!this.template) {
		this.template = $.template(null, $("#MyAppsCertificatePopupTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();

		var dial = layoutWidgetInstanceDOMObj.dialog({
			width : 500,
			modal : true,
			minHeight : $.browser.msie ? 130 : 150,
			dialogClass : 'smallDialog'
		});
		$(".ui-dialog-titlebar").hide();

		var data = {};
		data.title = getDisplayValue("com.soa.atmosphere.certificate.title");
		data.intro = getDisplayValue("com.soa.atmosphere.certificate.intro");
		data.fileLabel = getDisplayValue("com.soa.atmosphere.certificate.file.label") + ":";
		$.tmpl(widgetInstance.widgetInstanceTemplate, data).appendTo(layoutWidgetInstanceDOMObj);

		layoutWidgetInstanceDOMObj.find(".tooltip").soatooltip();

		layoutWidgetInstanceDOMObj.find("#myAppsCertFile").change(function(event) {
			event.preventDefault();
			var filepath = $('#myAppsCertFile').val();
			var backslashLastIndex = filepath.lastIndexOf("\\");
			var forwardslashLastIndex = filepath.lastIndexOf("/");
			var filename;
			if (backslashLastIndex !== -1 && forwardslashLastIndex === -1) {
				filename = filepath.substring(backslashLastIndex + 1);
			} else if (backslashLastIndex === -1 && forwardslashLastIndex !== -1) {
				filename = filepath.substring(forwardslashLastIndex + 1);
			}
			layoutWidgetInstanceDOMObj.find('.selectedCertFile').text(!filename ? filepath : filename);
		})

		widgetInstance.bindSubmitAction(viewObj);
		widgetInstance.bindCancelAction(viewObj);
		// makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
	};

	widgetInstance.bindSubmitAction = function(viewObj) {
		$('#myAppsCertForm').submit(function(event) {
			event.preventDefault();
			var keyUrl = atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId).getFederationMemberId()) + "/versions/" + viewObj.objectVersionId + "/keyinfo" + wrapInHTMLQueryString();
			var closePopup = function() {
				$("#EditAppCertificatePopup").dialog("close");
				$("#EditAppCertificatePopup").dialog("destroy");
				$("#EditAppCertificatePopup").hide();
				$("#EditAppCertificatePopup").remove();
				renderLayout(null);
			};
			var submitOptions = {
				type : "POST",
				url : keyUrl,
				iframe : true,
				iframeTarget : "#cert_upload_iframe",				dataType : 'text',
				contentType : 'multipart/form-data',
				success : function(responseData, textStatus, jqXHR) {
					// ajax file upload causes http error not to be recognized,
					// so check the responseData here. versionid indicates a successful response.
					// So if we get something else, force the error routine to execute and don't do
					// anymore processing here
					if (!(responseData && responseData.length) || responseData != viewObj.objectVersionId) {
						return jqXHR.abort(responseData, textStatus, jqXHR);
					}
					// closePopup is called only if  responseData != viewObj.objectVersionId. see
					// return statement in if condition above					closePopup();
				},
				error : function(jqXHR, textStatus, errorThrown) {
					var errorMessage = jqXHR.responseText || "Error occured while importing CSR. File may not be valid CSR or Certificate Authority may not yet exist.";
					soaAlert(errorMessage);
				}
			};
			$(this).ajaxSubmit(submitOptions);
		});

	};

	widgetInstance.bindCancelAction = function(viewObj) {
		$("#myAppsCertCancel").bind("click", function(event) {
			event.preventDefault();
			hideWidgetInstance("EditAppCertificatePopup");
			$("#EditAppCertificatePopup").dialog("close");
			$("#EditAppCertificatePopup").dialog("destroy");
			$("#EditAppCertificatePopup").hide();
		});
	};

	return widgetInstance;
};

registerWidgetObject(myAppsCertficateDetailsPopupWidget);
