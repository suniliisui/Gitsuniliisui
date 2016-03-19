/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var myAppsTeamMembersWidget = {};

myAppsTeamMembersWidget.name = 'widget.myapps.teammembers';

myAppsTeamMembersWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	var currentEnvironment = null;
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template === undefined) {
		this.template = jQuery.template(null, $("#" + instanceName + "Template"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.viewObj = null;
	widgetInstance.appName = null;
	widgetInstance.eMail = null;

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		widgetInstance.viewObj = viewObj;
		layoutWidgetInstanceDOMObj.empty();
		widgetInstance.getAppName(viewObj, layoutWidgetInstanceDOMObj);
		widgetInstance.fetchEmail();
		widgetInstance.bindResendInvitetoTeamMember(viewObj);
	};

	widgetInstance.fetchMembers = function() {
		$.ajax({
			type : "GET",
			url : atmometadata.getAppsAPIEndpoint(new FDN(widgetInstance.viewObj.objectId)) + "/" + widgetInstance.viewObj.objectId + "/members",
			dataType : "json",
			async:false,
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : widgetInstance.layoutWidgetInstanceDOMObj,
				"viewObj" : widgetInstance.viewObj
			},
			success : widgetInstance.processData,
			error : function(data, textStatus, errorThrown) {
				$.tmpl(widgetInstance.widgetInstanceTemplate).appendTo("#" + widgetInstance.widgetInstanceName);
			}
		});
	};

	widgetInstance.fetchEmail = function() {
		var userId = login.userFDN();
		$.ajax({
			type : "GET",
			url : atmometadata.getUsersAPIEndpoint(new FDN(userId)) + "/" + userId + "/settings",
			dataType : "json",
			async:false,
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : widgetInstance.layoutWidgetInstanceDOMObj,
				"viewObj" : widgetInstance.viewObj
			},
			success : function(data, textStatus, errorThrown) {
				widgetInstance.eMail = data.Email;
				widgetInstance.fetchMembers();
			}
		});
	};

	widgetInstance.processData = function(data, textStatus, jqXHR) {
		var json = {
			"rss" : data
		};
		if ((json.rss.channel) && (json.rss.channel.item)) {
			json.rss.channel.email = widgetInstance.eMail;
			json.rss.channel.appname = widgetInstance.appname;
			for ( var i = 0; i < json.rss.channel.item.length; i++) {
				// if (json.rss.channel.item[i].category.domain == "com.soa.status") {
				json.rss.channel.item[i].statusSrc = "/resources/static/images/spacer.gif"; // no image for approved status
				json.rss.channel.item[i].statusText = "";
				if (json.rss.channel.item[i].category[0].value == 'com.soa.group.membership.state.pending') {
					if (json.rss.channel.item[i].title == ' ') {
						json.rss.channel.item[i].statusText = 'Email sent';
						json.rss.channel.item[i].statusSrc = "/resources/style/images/mail_sent_icon.gif";
					} else {
						json.rss.channel.item[i].statusText = getDisplayValue(json.rss.channel.item[i].category[0].value);
						json.rss.channel.item[i].statusSrc = "/resources/style/images/pending_icon.gif";
					}
				} else if (json.rss.channel.item[i].category[0].value == 'com.soa.group.membership.state.disapproved') {
					json.rss.channel.item[i].statusText = getDisplayValue(json.rss.channel.item[i].category[0].value);
					json.rss.channel.item[i].statusSrc = "/resources/style/images/decline_icon.gif";
				} else if (json.rss.channel.item[i].category[0].value == 'com.soa.group.membership.state.approved') {
					if (json.rss.channel.item[i].description != widgetInstance.eMail) { // only set to approved for non-adminstrator
						json.rss.channel.item[i].statusText = getDisplayValue(json.rss.channel.item[i].category[0].value);
						json.rss.channel.item[i].statusSrc = "/resources/style/images/approved_icon.gif";
					}
				}
				json.rss.channel.item[i].status = getDisplayValue(json.rss.channel.item[i].category[0].value);
			}
			$.tmpl(widgetInstance.widgetInstanceTemplate, json.rss.channel).appendTo("#" + widgetInstance.widgetInstanceName);

			widgetInstance.bindRemoveMember();
			$("#myAppsTeamEmpty").remove();
		} else {
			$.tmpl(widgetInstance.widgetInstanceTemplate, {
				title : "test title"
			}).appendTo("#" + widgetInstance.widgetInstanceName);
		}
		widgetInstance.bindInviteMember();
	};

	widgetInstance.bindInviteMember = function() {
		$("#myAppsInviteButton").click(function() {
			showWidgetInstance('InviteTeamMembersWidget');
			return false;
		});
	};
	widgetInstance.bindResendInvitetoTeamMember = function(viewObj) {
		$(".resend_invite").click(function() {
			var email = $(this).attr('emailid');
			var options = {
					type : "POST",
					url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId + "/members",
					dataType : "text",
					contentType : 'application/json',
					data : JSON.stringify({
						"Email" : email
					}),
					success : function(responseData, textStatus, jqXHR) {
						soaAlert("Invitation successful for:  " + email);
					},
					error : function(data, textStatus, errorThrown) {
						if ((data.responseText).indexOf('Already followed') > -1) {
							soaAlert("Invitation failed for:  " + email + " User was already invited");
						} else {
							soaAlert("Invitation failed for:  " + email + " . Please try again later");
						}
					}
				};
				$.ajax(options);
		});
	};
	widgetInstance.resendInvitation = function(viewObj, email) {
		if (isEmailValid(email)) {
			var inviteMembers = getWidgetInstance("InviteTeamMembersWidget");
			inviteMembers.Email = email;
			showWidgetInstance('InviteTeamMembersWidget');
			return false;
		}
	};

	widgetInstance.bindRemoveMember = function() {
		$(".removeMember").click(function(event) {
			event.preventDefault();
			if ($(this).hasClass('disabled')) {
				return false;
			}
			var userId = $(this).attr("userId");
			var userName = $(this).attr("userName");
			new CollectCommentDialog({
				template : $("#RemoveTeammemberTemplate").template(),
				data : {
					title : $.i18n.prop('collectCommentDialog.remove.teammember.title'),
					message : $.i18n.prop('collectCommentDialog.remove.teammember.message', userName),
					optional : $.i18n.prop('collectCommentDialog.remove.teammember.optional')
				},
				callback : function() {
					var comment = encodeURIComponent($("#" + this.textareaId).val());
					action.closeDialog();
					$.ajax({
						type : "DELETE",
						url : atmometadata.getAppsAPIEndpoint(new FDN(widgetInstance.viewObj.objectId)) + "/" + widgetInstance.viewObj.objectId + "/members/" + userId + "?Comment=" + comment,
						cache : false,
						async:false,
						contentType : "application/json",
						accept : "text/plain",
						success : function(data, textStatus, jqXHR) {
							if (widgetInstance.viewObj.objectType != 'myapps') {
								updateView("app", widgetInstance.viewObj.objectId, "teammembers");
							} else {
								updateView("myapps", widgetInstance.viewObj.objectId, "teammembers");
							}
							return false;
						},
						error : function(data, textStatus, errorThrown) {
							return false;
						}
					});
					$("[id^=myAppsTeamRemove_]").addClass('disabled');
				}
			});
		});
	};

	widgetInstance.getAppName = function(viewObj, layoutWidgetInstanceDOMObj) {
		$.ajax({
			type : "GET",
			url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId)) + "/" + viewObj.objectId,
			contentType : "application/x-www-form-urlencoded",
			dataType : "json",
			async:false,
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj,
				"viewObj" : viewObj
			},
			success : function(data, textStatus, jqXHR) {
				if (data != null) {
					// widgetInstance.appname = data.Name;
					widgetInstance.appname = data.Name;
					function getSandboxStatus(versionId) {
						$.ajax({
							type : 'GET',
							async:false,
							url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId)) + "/versions/" + versionId,
							dataType : "json",
							success : function(data) {
								currentEnvironment = data.CurrentEnvironment;
							}
						});
					}

					if (viewObj.objectVersionId == null) {
						viewObj.objectVersionId = data.DefaultVersionID;
					}
					getSandboxStatus(viewObj.objectVersionId);
				}
			},
			error : function(data, textStatus, errorThrown) {
				alert(textStatus + " - error: " + errorThrown);
			}
		});
	};

	return widgetInstance;
};

registerWidgetObject(myAppsTeamMembersWidget);
