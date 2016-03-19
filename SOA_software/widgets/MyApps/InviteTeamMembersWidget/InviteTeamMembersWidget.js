/**
 * 
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var inviteTeamMembersWidget = {};

inviteTeamMembersWidget.name = 'widget.myapps.inviteteammembers';

registerWidgetObject(inviteTeamMembersWidget);

inviteTeamMembersWidget.createWidgetInstance = function(instanceName) {

	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.Email = null;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template === undefined) {
		this.template = $.template(null, $("#" + instanceName + "Template"));
	}
	widgetInstance.helpEmail = getDisplayValue('com.soa.atmosphere.invite.email');
	widgetInstance.helpInvite = getDisplayValue('com.soa.atmosphere.invite.text');
	widgetInstance.helpTitle = getDisplayValue('com.soa.atmosphere.invite.help.title');
	widgetInstance.hide = function() {
		widgetInstance.Email = null;
	};

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		var text;
		layoutWidgetInstanceDOMObj.empty();
		$.tmpl(inviteTeamMembersWidget.template, {}).appendTo(layoutWidgetInstanceDOMObj);
		formValidationEngine("inviteTeamMembersWidgetForm");
		var dial = layoutWidgetInstanceDOMObj.dialog({
			width : 610,
			modal : true
		});
		widgetInstance.helpEmail = getDisplayValue('com.soa.atmosphere.invite.email');
		initHelperTextBehavior(layoutWidgetInstanceDOMObj);
		$(".ui-dialog-titlebar").hide();
		if (widgetInstance.Email) {
			$('#inviteTeamMemberEmailText').removeClass("helperText");
			$('#inviteTeamMemberEmailText').val(widgetInstance.Email);
		}
		
		$.ajax({
			type : "GET",
			url : atmometadata.getUsersAPIEndpoint(new FDN(login.userFDN())) + "/" + login.userFDN(),
			dataType : "json",
			cache : false,
			async:false,
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : widgetInstance.layoutWidgetInstanceDOMObj,
				"viewObj" : widgetInstance.viewObj
			},
			success : function(data, textStatus, errorThrown) {
				text = "DevExchange member, "+ data.UserName +", has invited you to join an application development team. To get started, just click on the following link to register with DevExchange."
			},
			error : function(data, textStatus, errorThrown) {
			}
		});

		$('#inviteTeamMemberStatus').hide();
		$('#inviteTeamMemberInviteTextTitle').append(widgetInstance.helpTitle);
		$('#inviteTeamMemberInviteTextLabel').append(text);
//		$('#inviteTeamMemberInviteTextLabel').append(widgetInstance.helpInvite);
		widgetInstance.bindAddAction(viewObj);
		widgetInstance.bindCancelAction(viewObj, layoutWidgetInstanceDOMObj);
		widgetInstance.bindDoneAction(viewObj);
		var helpElem = $('#inviteTeamMemberEmailText');
		setHelpText(helpElem, widgetInstance.helpEmail);
		$('#inviteTeamMemberCancelButton').focus(); // focus on button so help text focus works
		// makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
	};

	widgetInstance.bindAddAction = function(viewObj) {
		$("#inviteTeamMembersWidgetForm").submit(function() {
			var emailtext = $("#inviteTeamMemberEmailText").val();
			if (emailtext[emailtext.length - 1] == ',') {
				emailtext = emailtext.substring(0, emailtext.length - 2);
			}
			var emails = []; // hold values in suggestion box
			emails = emailtext.split(",");
			for ( var i = 0; i < emails.length; i++) {
				emails[i] = emails[i].replace(/^\s+|\s+$/g, '');
			}
			for ( var i = 0; i < emails.length; i++) { // send 1 at a time to api, for insert
				widgetInstance.addMembers(viewObj, emails[i]);
			}
			$('#inviteTeamMembersContentHeader').hide();
			$("#InviteTeamMembersWidget .headerPanel").hide();
			$('#inviteTeamMembersWidgetForm').hide();
			$('#inviteTeamMemberStatus').show();
			$('#inviteCancelButton').hide();
			$('#or').hide();
			return false;
		});
	};

	widgetInstance.bindCancelAction = function(viewObj, layoutWidgetInstanceDOMObj) {
		$("#inviteTeamMemberCancelButton").click(function() {
			widgetInstance.Email = null;
			$("#" + instanceName).dialog("destroy");
			$("#InviteTeamMembersWidget").remove(); // in case dialog box was closed
			updateView(viewObj.objectType, viewObj.objectId, "teammembers");
			return false;
		});

	};

	widgetInstance.bindDoneAction = function(viewObj) {
		$("#inviteTeamMemberDoneButton").click(function() {
			widgetInstance.Email = null;
			$("#" + instanceName).dialog("destroy");
			$("#InviteTeamMembersWidget").remove(); // in case dialog box was closed

			base_loc = location.href.split("#")[1];
			if (base_loc.indexOf('/myapps') == 0) {
				updateView("myapps", viewObj.objectId, "teammembers");
			} else {
				updateView("app", viewObj.objectId, "teammembers");
			}
			return false;

		});
	};

	widgetInstance.addMembers = function(viewObj, email) {
		if (email == widgetInstance.helpEmail) {
			$('#inviteTeamMemberStatusText').val($('#inviteTeamMemberStatusText').val() + "-- Invitation failure:  No email addresses were entered." + "\n");
		} else if (isEmailValid(email)) {
			var options = {
				type : "POST",
				url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId + "/members",
				dataType : "text",
				contentType : 'application/json',
				async:false,
				data : JSON.stringify({
					"Email" : email
				}),
				success : function(responseData, textStatus, jqXHR) {
					$('#inviteTeamMemberStatusText').val($('#inviteTeamMemberStatusText').val() + "-- Invitation successful for:  " + email + "\n");
				},
				error : function(data, textStatus, errorThrown) {
					if ((data.responseText).indexOf('Already followed') > -1) {
						$('#inviteTeamMemberStatusText').val($('#inviteTeamMemberStatusText').val() + "-- Invitation failure for:  " + email + " (Already invited)\n");
					} else {
						$('#inviteTeamMemberStatusText').val($('#inviteTeamMemberStatusText').val() + "-- Invitation failure for:  " + email + " (" + data.responseText + ")\n");
					}
				}
			};
			$.ajax(options);
		} else {
			$('#inviteTeamMemberStatusText').val($('#inviteTeamMemberStatusText').val() + "-- Invitation failure for:  " + email + " (Invalid email)\n");
		}
	};

	return widgetInstance;
};