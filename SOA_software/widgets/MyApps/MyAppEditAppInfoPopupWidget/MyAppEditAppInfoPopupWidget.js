/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var myAppEditAppInfoPopupWidget = {};

myAppEditAppInfoPopupWidget.name = 'widget.myapps.editappinfo.popup';
myAppEditAppInfoPopupWidget.isInitComplete = false;
myAppEditAppInfoPopupWidget.initBindings = function() {
	if(!this.isInitComplete) {
		this.isInitComplete = true;
		$("#cancelSaveApp").live("click", function(event){
			event.preventDefault();
			$("#EditAppInfoPopup").dialog("close");
			$("#EditAppInfoPopup").remove();
			renderLayout(null);
		});
	}
};
myAppEditAppInfoPopupWidget.createWidgetInstance = function (instanceName) {
    var widgetInstance = {};
    widgetInstance.widgetObject = this;
    widgetInstance.widgetInstanceName = instanceName;

    if (this.template == null) {
		this.template = jQuery.template(null, $("#MyAppsEditAppInfoPopupTemplate"));
	}
    widgetInstance.widgetInstanceTemplate = this.template;
    
    widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
    	layoutWidgetInstanceDOMObj.empty();
    	myAppEditAppInfoPopupWidget.initBindings();
		var dial = layoutWidgetInstanceDOMObj.dialog({ height: 290, width: 500, modal: true});
		$(".ui-dialog-titlebar").hide();
		$.ajax({
			type: 'GET',
			url: atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId).getFederationMemberId())+"/" + viewObj.objectId,
			accept: "application/json",
			dataType: "json",
			async:false,
			contentType: "application/x-www-form-urlencoded",
    		context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj, "viewObj" : viewObj },
			success: function(data){
				var templateHtml = jQuery.tmpl(widgetInstance.widgetInstanceTemplate, data);
    			templateHtml.appendTo(layoutWidgetInstanceDOMObj);
    			$("#MyAppsEditAppInfoPopupDiv").attr("objectId", viewObj.objectId);
    			formValidationEngine("editAppForm");
    			makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
			},
			error: function (data, textStatus, errorThrown) {
				alert(textStatus + " - error: " + errorThrown );
			}
		});
		
		$('#saveApp').live('click', function(){
		 	var spacecheck = /^\s*$/;
			if(spacecheck.test($("#myAppsEditAppName").val())) {
				$("#myAppsEditAppName").val('This field is required...');
				$(this).attr("cancel", "true");
				//$("#editAppForm").validationEngine('attach'); 
			}
			
			if ($(this).attr("cancel")=="true") {
				$(this).attr("cancel", "false");
				return false;
			}

			
			var errorcheck = "This field is required..."
				, check = true
				, userId = login.userFDN()
				, appname = $("#myAppsEditAppName").val();
			 
		 	if(appname == errorcheck) {
				check = false;
			}
			var objectId = $("#MyAppsEditAppInfoPopupDiv").attr("objectId");
			if(appname != '' && check) {
				$.ajax({
					type: 'PUT',
					url:   atmometadata.getAppsAPIEndpoint(new FDN(objectId).getFederationMemberId())+"/" + objectId,
					data: JSON.stringify({
					   "Name" : $("#MyAppsEditAppInfoPopupDiv input#myAppsEditAppName").val(),
					   "Description" : $("#MyAppsEditAppInfoPopupDiv input#myAppsEditVersionNotes").val()
					}),
					accept: "text",
					async:false,
					contentType: "application/json",
					success: function (data, textStatus, jqXHR) {
						$("#EditAppInfoPopup").dialog("close");
						$("#EditAppInfoPopup").remove();
						renderLayout(null);
					},
					error: function (data, textStatus, errorThrown) {
						alert('add app version failed, delete app impl pending ' +data);
						return false;
					}
				});
			}else{
				return false;
			}
			
			
		});
		
   };

    return widgetInstance;
};


registerWidgetObject(myAppEditAppInfoPopupWidget);




