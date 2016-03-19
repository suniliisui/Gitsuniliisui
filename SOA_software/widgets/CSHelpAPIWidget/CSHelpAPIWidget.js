/*globals $ registerWidgetObject getDisplayValue login getJSONArray atmometadata renderLayout FDN tagValidation bindAutoCompleteForTags soaSelect formValidationEngine dd_menus*/
/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var CSHelpAPI = {};
CSHelpAPI.name = 'widget.cshelpapi';
registerWidgetObject(CSHelpAPI);

CSHelpAPI.createWidgetInstance = function (instanceName, props) {
	var widgetInstance = {};
	var mylayout = null;
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template === undefined) {
		this.template = $.template(null, $("#CSHelpAPIWidgetTemplate"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj){
        layoutWidgetInstanceDOMObj.empty();
//        layoutWidgetInstanceDOMObj.append("<h1>test</h1>");
		$.tmpl(widgetInstance.widgetInstanceTemplate,null).appendTo(layoutWidgetInstanceDOMObj);
		$.ajax({
			type: "GET",
			url: atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId,
			async:false,
			dataType: "json",
			success: function(json) {
				if(json.Visibility == 'Limited')
					{
						$(".csHelpContainer",layoutWidgetInstanceDOMObj).csHelp({csHelpName: 'com.soa.helptext.group.talkbox', csHelpURL: '/content/cshelp/group_talkbox.html'});
					}
				else
					{
						$(".csHelpContainer",layoutWidgetInstanceDOMObj).csHelp({csHelpName: 'com.soa.helptext.api.talkbox', csHelpURL: '/content/cshelp/api_talkbox.html'});
					}
			},
			error: function (data, textStatus, errorThrown) {
				alert('Error retrieving data. data= ' + '; textStatus= '  + textStatus + '; errorThrown= '  + errorThrown);
			}
		});
	};
	widgetInstance.hide = function(){
		$("#"+ instanceName).remove();
	};
	return widgetInstance;
};