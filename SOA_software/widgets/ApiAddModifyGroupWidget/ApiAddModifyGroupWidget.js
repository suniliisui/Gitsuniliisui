/*globals $ jQuery registerWidgetObject formValidationEngine spaceCheck atmometadata FDN soaUnselect soaSelect*/
/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var apiAddModifyGroupWidgets = {};

apiAddModifyGroupWidgets.name = 'widget.api.addmodifygroup';
registerWidgetObject(apiAddModifyGroupWidgets);

apiAddModifyGroupWidgets.createWidgetInstance = function (instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	widgetInstance.widgetInstanceTemplate = $("#ApiAddModifyGroupWidgetTemplate");
	widgetInstance.widgetInstanceTemplateFedOptions = jQuery.template(null, $("#FedmemberOptionsTemplate"));
	
	// DRAW WIDGET
	widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		$.tmpl(widgetInstance.widgetInstanceTemplate, {fedmembers : widgetInstance.data}).appendTo(layoutWidgetInstanceDOMObj);
		initHelperTextBehavior(layoutWidgetInstanceDOMObj);
		$("#apiAddModifyGroupFedmember").styledSelect({width: 150});
		widgetInstance.finalize(viewObj);
		widgetInstance.populateFedmembersList();
	};

	widgetInstance.finalize = function (viewObj) {
		/* form events */
		
    	// bind cancel btn
		$('#apiAddModifyGroupCancelBtn').bind('click', function () {
			window.location = '#/api/' + viewObj.objectId + '/versions/' + viewObj.objectVersionId + '/groupaccess';
			return false;
		});
//		formValidationEngine("apiAddModifyGroupForm");
    	/* form submit */
    	var theform = $('#apiAddModifyGroupForm');
		$(theform).validate({
			rules: {
				Name:"stillHasHelperText",
				Description : "stillHasHelperText"
			},
			submitHandler : function(form) {
				widgetInstance.formSubmit(viewObj);
			}
		}); 
	};
	
	widgetInstance.formSubmit = function(viewObj){
		var fedmemberId = $("#apiAddModifyGroupFedmember").val();
		
		var admin_url = atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectId))  + '/' + viewObj.objectId + '/admins';

		$.ajax({
			type: 'get',
			url:  admin_url,
			dataType: 'json',
			async:false,
			success: function (data) {
				var admins = [];
				/*$(data).find('channel').each(function() {
					//console.log($(this).find('title').text());
					//admins.push('admin1');
				});*/
				if (data.channel.item && data.channel.item.length > 0) {
					for (var i = 0; i < data.channel.item.length; i++) {
						admins.push(data.channel.item[i].guid.value);
					}
				}
				
				var formdata = {};
				formdata.Group = {};
				formdata.Group.Name = $('#apiAddModifyGroupName').val();
				formdata.Group.Description = $('#apiAddModifyGroupDescription').val();
				formdata.Group.GroupType = 'com.soa.group.type.private.apigroup';
				formdata.Group.ContextObjectID = viewObj.objectVersionId;
				formdata.Administrators = admins;
				
				// post add group call
				var addgroup_url = atmometadata.getGroupAPIEndpoint(fedmemberId);
				$.ajax({
					type: 'POST',
					url:  addgroup_url,
					data: JSON.stringify(formdata),
					dataType: 'json',
					async:false,
					contentType: "application/json",
					success: function (data, textStatus, jqXHR) {
						//now call to invite the viewer to establish relationship
						///versions/{apiVersionID}/viewers/{ViewerID}
						var groupDN = data.GroupID;
						var inviteViewerUrl = atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectVersionId)) + '/versions/' + viewObj.objectVersionId + '/viewers/' + groupDN;
						$.ajax({
							type: 'POST',
							url: inviteViewerUrl,
							async:false,
							accept: "text",
							success: function (data, textStatus, jqXHR) {
								//TODO let the user know about the creation of the group?
							},
							error: function (data, textStatus, errorThrown) {
								//TODO convey the message to the user about the error 
								//call for delete group
								var deletegroup_url = atmometadata.getGroupAPIEndpoint(fedmemberId) + '/' + groupDN;
								$.ajax({
									type: 'DELETE',
									url: deletegroup_url,
									async:false,
									accept: 'text',
									success: function (data, textStatus, jqXHR) {
										//TODO 
									},
									error: function (data, textStatus, errorThrown) {
									}
								});
							}
						});
						window.location = '#/api/' + viewObj.objectId + '/versions/' + viewObj.objectVersionId + '/groupaccess';
						return false;
					},
					error: function (xhrObj, textStatus, errorThrown) {
						if (xhrObj.responseText == 'Group name already exists') {
							alert('Group with the same name exists for the api version. Please provide a different name.');
						} else {
							alert('Error creating group. ' + xhrObj.responseText + '...' + errorThrown);
						}
						return false;
					}
				});
			}
		});
		
		return false;
			
	};
	
	widgetInstance.populateFedmembersList = function () {
		var allFedMembers = atmometadata.getAllFederationMemberIds();
		widgetInstance.data = allFedMembers;
		$('#apiAddModifyGroupFedmember').find('option').remove();
		$("#apiAddModifyGroupFedmember").append("<option value=''>Select a Fedmember</option>");
		$.tmpl(widgetInstance.widgetInstanceTemplateFedOptions, {fedmembers : widgetInstance.data}).appendTo("#apiAddModifyGroupFedmember");
		//soaUnselect($("#apiAddModifyGroupFedmember"));
    	//soaSelect(document.getElementById("apiAddModifyGroupFedmember"));
    	$("#apiAddModifyGroupFedmember").styledSelect({width: 150});
	};

	return widgetInstance;
};

