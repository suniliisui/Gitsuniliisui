/**
 * 
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var inviteGroupMembersWidget = {};

inviteGroupMembersWidget.name = 'widget.api.invitegroupmembers';

registerWidgetObject(inviteGroupMembersWidget);

inviteGroupMembersWidget.createWidgetInstance = function(instanceName) {
	
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template == null) {
		this.template = $.template(null, $("#"+instanceName+"Template"));
	}
	widgetInstance.helpEmail=getDisplayValue('com.soa.atmosphere.invite.email');
	widgetInstance.helpInvite=getDisplayValue('com.soa.atmosphere.invite.group.text');
	
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		var dial = layoutWidgetInstanceDOMObj.dialog({width: 600, modal: true});
		$(".ui-dialog-titlebar").hide();
		
		$.tmpl( inviteGroupMembersWidget.template, {}).appendTo(layoutWidgetInstanceDOMObj);
		formValidationEngine("inviteGroupMembersWidgetForm");
		
		makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
 		 
		$('#inviteGroupMembersWidgetForm textarea').bind('focus', function() {
			if($(this).hasClass('inputHelpText')) {
				$(this).removeClass('inputHelpText').addClass('inputHelpTextClear').addClass('value_textbox_active').removeClass('value_textbox');
				$(this).css({'background-color':'white'});
			}	
		});
		$('#inviteGroupMembersWidgetForm textarea').bind('blur', function() {
			if($(this).hasClass('inputHelpTextClear')) {
				$(this).removeClass('inputHelpTextClear').addClass('inputHelpText');
				$(this).css({'background-color':'#ECEDED'});
			}
		});
		$('#inviteGroupMemberStatus').hide();
		var helpElem = $('#inviteGroupMemberEmailText');
		setHelpText(helpElem, widgetInstance.helpEmail);
		var inviteTextElem = $('#inviteGroupMemberInviteText');
		setHelpText(inviteTextElem, widgetInstance.helpInvite);
		widgetInstance.bindAddAction(viewObj);
		widgetInstance.bindCancelAction(viewObj, layoutWidgetInstanceDOMObj);
		if(this.emailId){
			$("#inviteGroupMemberEmailText").val(this.emailId);
		}
		widgetInstance.bindDoneAction(viewObj);
		$('#inviteTeamMemberCancelButton').focus(); //focus on button so help text focus works
	};
	
	widgetInstance.bindAddAction = function(viewObj) {
		$("#inviteGroupMemberAddButton").click(function() {
			var emailtext = $("#inviteGroupMemberEmailText").val();
			if(emailtext[emailtext.length - 1] == ',')	{
				emailtext = emailtext.substring(0,emailtext.length - 2);
			}
			var emails = new Array();  //hold values in suggestion box
			emails = emailtext.split(",");
			var message = $("#inviteGroupMemberInviteText").val(); //message will be the same for each invite
			for (var i=0;i<emails.length;i++) {
				emails[i] = emails[i].replace(/^\s+|\s+$/g, '');
			}
			for (var i=0;i<emails.length;i++) { //send 1 at a time to api, for insert
				widgetInstance.addMembers(emails[i], message);
			}
			$('#inviteGroupMembersContentHeader').hide();
			$('#inviteGroupMembersWidgetForm').hide();
			$('#inviteGroupMemberStatus').show();
			$('#inviteCancelButton').hide();
			$('#or').hide();
			return false;
		});
	};
	
	widgetInstance.bindCancelAction = function(viewObj, layoutWidgetInstanceDOMObj) {
		$("#inviteGroupMemberCancelButton").click(function(event) {
			event.preventDefault();
			layoutWidgetInstanceDOMObj.dialog("close");
			$("#InviteAPIGroupMembersWidget").remove();  //in case dialog box was closed
			renderLayout(null);
			return false;
 		});

	};
	
	widgetInstance.bindDoneAction = function(viewObj) {
		$("#inviteGroupMemberDoneButton").click(function(event) {
			event.preventDefault();
			$("#InviteAPIGroupMembersWidget").dialog("close");
			$("#InviteAPIGroupMembersWidget").remove();  //in case dialog box was closed
			renderLayout(null);
			return false;
		});
	};
	
	widgetInstance.addMembers = function(email, message) {
		console.log(this.guid);
		if (email == widgetInstance.helpEmail) {
			$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure:  No email addresses were entered." + "\n");
		} else if (isEmailValid(email)) {
			var options = { 
				type: "POST",
				url: atmometadata.getGroupAPIEndpoint(new FDN(this.guid)) +"/"+this.guid+"/members",
				dataType: "text", 
				async:false,
				contentType: 'application/json',
				data: JSON.stringify({"Email" : email, "Message" : message}),
				success: function (responseData, textStatus, jqXHR) {
				
					$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation successful for:  " + email + "\n");
				},
				error: function (data, textStatus, errorThrown) {
					if((data.responseText).indexOf('Already followed')>-1) {
						$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure for:  " + email + " (Already invited)\n");
					} else {
						$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure for:  " + email +" (" + data.responseText + ")\n");
					}
				}
			};
			$.ajax(options);
		} else {
			$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure for:  " + email + " (Invalid email)\n");
		}
	};
	 widgetInstance.setEmailId = function(email) {
		this.emailId = email;
	 };
	 widgetInstance.setGuid = function(guid) {
		 this.guid = guid;
	 };
	return widgetInstance;
};