/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var myAppsEditVersionInfoWidget = {};

myAppsEditVersionInfoWidget.name = 'widget.myapps.editappversioninfo';

myAppsEditVersionInfoWidget.createWidgetInstance = function (instanceName) {
    var widgetInstance = {};
    widgetInstance.widgetObject = this;
    widgetInstance.widgetInstanceName = instanceName;
    if (this.template == null) {
		this.template = $.template(null, $("#MyAppsEditVersionInfoTemplate"));
	}
    widgetInstance.widgetInstanceTemplate = this.template;
    widgetInstance.objectVersionId = null;
    widgetInstance.objectId = null;
    widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		function submitHandler(form){
			var widgetcontrol = getWidgetControl(form)
				, initEnv = 'Sandbox'
				, url = atmometadata.getAppsAPIEndpoint(new FDN(objectId))
				, type = 'POST'
				, newVersion = true
				, versionId, versionNotes, tagVal
			;
			$(".helperText",form).val("");
			versionId = $('#versionid',layoutWidgetInstanceDOMObj).val();
			versionNotes = $("form textarea#versionnotes").val();
			tagVal = $("#editVersionInfoTags",layoutWidgetInstanceDOMObj).val();
			if(objectVersionId) {
				url = url + "/versions" + "/" + objectVersionId;
				type = 'PUT';
				newVersion = false;
			} else {
				url = url + "/" + objectId + "/versions";
			}
			tagVal = getJSONArray(tagVal);
			$.ajax({
				type: type,
				url:   url,
				async:false,
				data: JSON.stringify({
				   "Name" : versionId,
				   "Description" : versionNotes,
				   "Tag":tagVal,
				   "AppID" : objectId,
				   "InitialEnvironment" : initEnv
				}),
				accept: "text",
				contentType: "application/json",
				context : {"widgetcontrol" : widgetcontrol},
				success: function (data, textStatus, jqXHR) {
					widgetcontrol.dialog("close");
					if (newVersion) {
						currentView.objectVersionId = null;
					}
					widgetcontrol.remove();
					renderLayout(null);
				},
				error: function (data, textStatus, errorThrown) {
					var
						alertProp = "com.soa.atmosphere.myapps.app.version.error."
						, alertTitleTxt, alertBodyTxt
					;
					if(type=='PUT'){
						alertTitleTxt = $.i18n.prop(alertProp + 'editversion');
						alertBodyTxt = data.responseText;
					}else if(type=='POST'){
							alertTitleTxt = $.i18n.prop(alertProp + 'addversion');
						alertBodyTxt = data.responseText;
					}
					//Calling a global function from error.js
					soaError(alertBodyTxt,alertTitleTxt);
				}
			});
		}
	
    	layoutWidgetInstanceDOMObj.empty();
    	if (this.objectId == null) {
    		this.objectId = viewObj.objectId;
    	}
		var dial = layoutWidgetInstanceDOMObj.dialog({width: 610, modal: true})
			, objectVersionId, objectId = widgetInstance.objectId, templateHtml, myAppsVersionInfoForm
			, validateRules = {
				rules: {
					VersionId:"stillHasHelperText"
				},
		
				submitHandler:submitHandler
			}
		;
		$(".ui-dialog-titlebar").hide();
		if(this.objectVersionId) {
    		objectVersionId =  this.objectVersionId;
    		$.ajax({
    			type: 'GET',
    			url: atmometadata.getAppsAPIEndpoint(new FDN(this.objectId))+ "/versions/" + objectVersionId,
    			dataType: "json",
    			async:false,
        		context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj, "viewObj" : viewObj },
    			success: function(data){
					var myAppsVersionInfoForm;
					templateHtml = $.tmpl(widgetInstance.widgetInstanceTemplate, data);
        			templateHtml.appendTo(layoutWidgetInstanceDOMObj);
					myAppsVersionInfoForm = $("#MyAppsVersionInfoForm");
        			$("input#versionid",layoutWidgetInstanceDOMObj).val(data.Name);
        			$("textarea#versionnotes",layoutWidgetInstanceDOMObj).val(data.Description);
        			$("input#editVersionInfoTags",layoutWidgetInstanceDOMObj).val(data.Tag);
        			$("#prodAccessCBCell").hide().html("<br>");
        			if(data.initialEnvironment) {
        				$("input#prodAccessCB",layoutWidgetInstanceDOMObj).attr('checked', 'checked');
        			} 
		    		$(".headerPanel .titleLabel").html("Edit Version Info");
					$("input, textarea",myAppsVersionInfoForm).addClass("helpTextClear").removeClass("helperText");
					bindAutoCompleteForTags($("#editVersionInfoTags"),true);
					initHelperTextBehavior(layoutWidgetInstanceDOMObj);
					myAppsVersionInfoForm.validate(validateRules);
    			},
    			error: function (data, textStatus, errorThrown) {
    				alert(textStatus + " - error: " + errorThrown );
    			}
    		});
    	} else {
    		templateHtml = $.tmpl(widgetInstance.widgetInstanceTemplate, {});
    		templateHtml.appendTo(layoutWidgetInstanceDOMObj);
			myAppsVersionInfoForm = $("#MyAppsVersionInfoForm");
			initHelperTextBehavior(layoutWidgetInstanceDOMObj);
			myAppsVersionInfoForm.validate(validateRules);
    	}
		$("#cancelVersionInfo", layoutWidgetInstanceDOMObj).on("click", function(event){
			event.preventDefault();
			var widgetcontrol = getWidgetControl(this);
			widgetcontrol.remove();
			widgetcontrol.dialog("close");
			renderLayout(null);
		});
     	widgetInstance.finalize(viewObj);
    	widgetInstance.objectVersionId = null;
    	widgetInstance.objectId = null;
    	makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
    };
    widgetInstance.finalize = function (viewObj) {}
    widgetInstance.setObjectversionID = function(objectVersionId) {
    	this.objectVersionId = objectVersionId;
    };
    widgetInstance.setObjectID = function(objectId) {
    	this.objectId = objectId;
    };
    return widgetInstance;
};


registerWidgetObject(myAppsEditVersionInfoWidget);
