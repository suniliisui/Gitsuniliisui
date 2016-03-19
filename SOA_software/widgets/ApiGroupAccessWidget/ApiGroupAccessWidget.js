/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var apiGroupAccessWidgets = {};

apiGroupAccessWidgets.name = 'widget.api.groupaccess';
registerWidgetObject(apiGroupAccessWidgets);
apiGroupAccessWidgets.isInitComplete = false;
apiGroupAccessWidgets.initBindings = function(instanceName) {
	if (!this.isInitComplete) {
		this.isInitComplete = true;
		$("#createagroup").live("click", function(e) {
			e.preventDefault();
			// TODO call renderLayout with viewObj set
			// $("#apiGroupAccess").hide();
			window.location = '#/api/' + currentView.objectId + '/versions/' + currentView.objectVersionId + '/addmodifygroup';
		});

		$('#apigroupaccessdiv_group button[id="toggleRole"]').live("click", function(event) {
			event.preventDefault();
			apiGroupAccessWidgets.executeToggleRole($(this).attr('groupId'), $(this).attr('userId'), $(this).attr('currentRole'), $(this).attr('userName'), $(this).attr('emailId'));
		});

		$("#inviteGroupMemberBtn").live("click", function(event) {
			event.preventDefault();
			var inviteGroupMembersWidget = getWidgetInstance("InviteAPIGroupMembersWidget");
			inviteGroupMembersWidget.setEmailId(null);
			inviteGroupMembersWidget.setGuid($(this).attr('guid'));
			showWidgetInstance('InviteAPIGroupMembersWidget');
		});
		$("#editGroupInfo").live("click", function(event) {
			event.preventDefault();
			var editGroupWidgetInstance = getWidgetInstance("EditGroupInfo");
			editGroupWidgetInstance.setObjectID($(this).attr('groupId'));
			showWidgetInstance("EditGroupInfo");
		});
		$("#apigroupaccessdiv_group .resend_invite").live("click", function(event) {
			event.preventDefault();
			var inviteGroupMembersWidget = getWidgetInstance("InviteAPIGroupMembersWidget");
			inviteGroupMembersWidget.setEmailId($(this).attr('emailId'));
			inviteGroupMembersWidget.setGuid($(this).attr('groupId'));
			showWidgetInstance("InviteAPIGroupMembersWidget");
		});
		$("#apigroupaccessdiv_group .remove_api_member").live("click", function(event) {
			event.preventDefault();
			var groupid = $(this).attr('groupId');
			var userid = $(this).attr('userId');
			var currentrole = $(this).attr('currentRole');
			var username = $(this).attr('userName');
			apiGroupAccessWidgets.executeRemoveMember(groupid, userid, currentrole, username);
		});
	}
};

apiGroupAccessWidgets.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	var role;

	// DRAW WIDGET
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		widgetInstance.isAdmin = false;
		widgetInstance.layout = layoutWidgetInstanceDOMObj;
		widgetInstance.viewObj = viewObj;

		$.ajax({
			type : "GET",
			url : atmometadata.getUsersAPIEndpoint(new FDN(viewObj.objectId)) + "/" + login.userFDN() + "/roles",
			data : {
				"ResourceID" : viewObj.objectVersionId
			},
			async : true,
			success : function(data) {
				if (data.RoleName && data.RoleName.length > 0) {
					for ( var i = 0; i < data.RoleName.length; i++) {
						if (data.RoleName[i] == 'Admin') {
							widgetInstance.isAdmin = true;
						}
					}
				}
				widgetInstance.getViewersForResource();
				apiGroupAccessWidgets.initBindings(instanceName);
			},
			error : function(data) {
				soaError('Error retrieving user roles: ' + data.responseText, "Error");
			}
		});

		// widgetInstance.finalize(viewObj);
	};

	widgetInstance.getViewersForResource = function() {
		// get groups
		var get_groups_url = atmometadata.getAPIsAPIEndpoint(new FDN(widgetInstance.viewObj.objectVersionId)) + '/versions/' + widgetInstance.viewObj.objectVersionId + '/viewers';
		$.ajax({
			url : get_groups_url,
			type : "GET",
			dataType : 'json',
			async:false,
			error : function(data, textStatus, errorThrown) {
				soaError('Error retrieving app details. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown, "Error");
			},
			success : function(data, textStatus, jqXHR) {
				var groupItems = [];
				var groupIDs = [];
				if (data.channel.item && data.channel.item.length > 0) {
					for ( var i = 0; i < data.channel.item.length; i++) {
						// assign grp data
						if (getResourceTypeCategoryValue(data.channel.item[i]) == 'group') {
							groupIDs.push(data.channel.item[i].guid.value);
							groupItems.push(data.channel.item[i]);
						}
					}
				}
				// get api details (populate title)
				// widgetInstance.getAPIDetails(viewObj, widgetInstance.layoutWidgetInstanceDOMObj);

				widgetInstance.checkAndAddGroups(groupItems);
			}
		});
	};

	widgetInstance.getAPIDetails = function() {
		$.ajax({
			url : atmometadata.getAPIsAPIEndpoint(new FDN(widgetInstance.viewObj.objectId)) + "/" + widgetInstance.viewObj.objectId,
			async : true,
			type : "GET",
			dataType : "json",
			error : function(data, textStatus, errorThrown) {
				soaError('Error retrieving app details. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown, "Error");
			},
			success : function(data, textStatus, jqXHR) {
				$('#apiTitleDiv').html(data.Name);
			}
		});
	};

	widgetInstance.checkAndAddGroups = function(groupItems) {
		if (widgetInstance.isAdmin) {
			$("#ApiGroupAccessListWidgetTemplate").tmpl({
				groups : groupItems,
				isAdmin : widgetInstance.isAdmin
			}).appendTo(widgetInstance.layout);
			for ( var i = 0; i < groupItems.length; i++) {
				widgetInstance.populateGroupMemberList(groupItems[i].guid.value);
			}
		} else {
			if (groupItems && groupItems.length > 0) {
				for ( var i = 0; i < groupItems.length; i++) {
					var grpItem = groupItems[i];
					widgetInstance.drawGroup(grpItem);
				}
			}
		}
	};

	widgetInstance.drawGroup = function(grpItem) {
		var isLeader;
		$.ajax({
			type : "GET",
			url : atmometadata.getUsersAPIEndpoint(new FDN(grpItem.guid.value)) + "/" + login.userFDN() + "/roles",
			data : {
				"ResourceID" : grpItem.guid.value
			},
			async : true,
			success : function(data) {
				if (data.RoleName && data.RoleName.length > 0) {
					for ( var j = 0; j < data.RoleName.length; j++) {
						if (data.RoleName[j] == 'Leader') {
							isLeader = true;
						}
					}
					if (isLeader) {
						role = 'Leader';
						$("#ApiGroupAccessWidgetTemplate").tmpl(grpItem).appendTo("#" + instanceName);
						widgetInstance.populateGroupMemberList(grpItem.guid.value);
					} else {
						role = 'Member';
						$("#ApiGroupViewWidgetTemplate").tmpl(grpItem).appendTo("#" + instanceName);
						widgetInstance.populateGroupMemberList(grpItem.guid.value);
					}

				}
			},
			error : function(data) {
				// alert('Error retrieving user roles: ' + data.responseText);
			}
		});
	};

	widgetInstance.populateGroupMemberList = function(groupID, drawDivOnly) {
		var groupMemberDivId = "group_" + groupID.replace(/\./gi, '_');
		get_group_members_url = atmometadata.getGroupAPIEndpoint(new FDN(groupID)) + '/' + groupID + '/members';
		$.ajax({
			url : get_group_members_url,
			type : "GET",
			dataType : 'json',
			async:false,
			error : function(data, textStatus, errorThrown) {
				soaError('Error retrieving app details. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown, "Error");
			},
			success : function(data, textStatus, jqXHR) {
				var groupNameId = "groupname_" + groupID.replace(/\./gi, '_');
				$("#" + groupNameId).html(data.channel.title);
				var groupDescId = "groupdesc_" + groupID.replace(/\./gi, '_');
				$("#" + groupDescId).html(data.channel.description);
				tmpldata = {};
				tmpldata.members = [];
				if (data.channel.item && data.channel.item.length > 0) {
					for ( var i = 0; i < data.channel.item.length; i++) {
						thismember = {};
						thismember.name = data.channel.item[i].title;
						thismember.email = data.channel.item[i].description;
						thismember.Image = data.channel.item[i].Image;
						thismember.userId = data.channel.item[i].guid.value;
						thismember.Image.Url = atmometadata.getUserPictureEndpoint(thismember.userId);
						thismember.groupId = groupID;
						$(data.channel.item[i].category).each(function() {
							if (this.domain == 'uddi:soa.com:status') {
								thismember.status = this.value;
							}
							if (this.domain == 'uddi:soa.com:role') {
								thismember.role = this.value;
							}
						});
						if (thismember.role == 'com.soa.group.membership.role.admin') {
							continue;
						}

						tmpldata.members.push(thismember);
					}
				}
				if (drawDivOnly) {
					$("#" + groupMemberDivId).empty();
				}
				if (role == 'Member') {
					$("#ApiGroupViewWidgetMembersTemplate").tmpl(tmpldata).appendTo("#" + groupMemberDivId);
				} else {
					$("#ApiGroupAccessWidgetMembersTemplate").tmpl(tmpldata).appendTo("#" + groupMemberDivId);
				}
			}
		});
	};

	apiGroupAccessWidgets.executeToggleRole = function(groupId, userId, currentRole, userName, email) {
		var userNameText = userName;
		if (!widgetInstance.isAdmin && currentRole == 'com.soa.group.membership.role.leader') {
			soaError("You are not authorized to perform this task", "Authorization Error");
			return false;
		}

		if (userNameText == null || userNameText.trim() == '') {
			userNameText = email;
		}
		dialog_msg = getDisplayValue(currentRole + ".togglerole", userNameText);
		if (currentRole == 'com.soa.group.membership.role.leader') {
			currentRole = 'com.soa.group.membership.role.member';
		} else {
			currentRole = 'com.soa.group.membership.role.leader';
		}

		soaConfirm("Access Permissions", dialog_msg, function() {
			apiGroupAccessWidgets.setMemberRole(currentRole, groupId, userId);
		});
		return false;
	};
	apiGroupAccessWidgets.setMemberRole = function(currentRole, groupId, userId) {
		$.ajax({
			type : 'PUT',
			url : atmometadata.getGroupAPIEndpoint(new FDN(groupId)) + '/' + groupId + '/members/' + userId + '/role',
			data : currentRole,
			dataType : 'text',
			contentType : 'application/json',
			async:false,
			success : function(data, textStatus, jqXHR) {
				// alert('success');
			},
			error : function(xhrObj, textStatus, errorThrown) {
				if (xhrObj.responseText == 'Not Authorized') {
					soaError('Error: You may not have authorization to perform this task.', 'Authorization Error');
				} else {
					soaError('Error updating member role. ' + xhrObj.responseText + '...' + errorThrown, 'Error');
				}
			}

		});
		widgetInstance.populateGroupMemberList(groupId, true);
	};
	apiGroupAccessWidgets.executeResendInvite = function(groupId, emailtext) {
		if (emailtext[emailtext.length - 1] == ',') {
			emailtext = emailtext.substring(0, emailtext.length - 2);
		}
		var emails = []; // hold values in suggestion box
		emails = emailtext.split(",");
		for ( var i = 0; i < emails.length; i++) {
			emails[i] = emails[i].replace(/^\s+|\s+$/g, '');
		}
		for ( var i = 0; i < emails.length; i++) { // send 1 at a time to api, for insert
			var email = emails[i];
			soaConfirm("Resend Invitation", "Do you want to resend the invitation to " + email + " ?", function() {
				apiGroupAccessWidgets.resendInvitation(groupId, email);
			});
		}
	};
	apiGroupAccessWidgets.resendInvitation = function(groupId, email) {
		var options = {
			type : "POST",
			url : atmometadata.getGroupAPIEndpoint(new FDN(groupId)) + "/" + groupId + "/members",
			dataType : "text",
			contentType : 'application/json',
			async:false,
			data : JSON.stringify({
				"Email" : email,
				"Message" : ""
			}),
			success : function(responseData, textStatus, jqXHR) {

			},
			error : function(data, textStatus, errorThrown) {
				alert('error:::::');
				if ((data.responseText).indexOf('Already followed') > -1) {
					$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure for:  " + email + " (Already invited)\n");
				} else {
					$('#inviteGroupMemberStatusText').val($('#inviteGroupMemberStatusText').val() + "-- Invitation failure for:  " + email + " (" + data.responseText + ")\n");
				}
			}
		};
		$.ajax(options);
	};

	apiGroupAccessWidgets.executeRemoveMember = function(groupId, userId, currentRole, userName) {
		if (!widgetInstance.isAdmin && currentRole == 'com.soa.group.membership.role.leader') {
			soaError("You are not authorized to perform this task", "Authorization Error");
			return false;
		}

		apiGroupAccessWidgets.removeMember(groupId, userId, userName);
		return false;
	};

	apiGroupAccessWidgets.removeMember = function(groupId, userId, userName) {
		new CollectCommentDialog({
			template : $("#RemoveTeammemberTemplate").template(),
			data : {
				title : $.i18n.prop('collectCommentDialog.remove.' + widgetInstance.viewObj.objectType + '.' + widgetInstance.viewObj.viewName + '.title'),
				message : $.i18n.prop('collectCommentDialog.remove.' + widgetInstance.viewObj.objectType + '.' + widgetInstance.viewObj.viewName + '.message', userName),
				optional : $.i18n.prop('collectCommentDialog.remove.' + widgetInstance.viewObj.objectType + '.' + widgetInstance.viewObj.viewName + '.optional')
			},
			callback : function() {
				var comment = encodeURIComponent($("#" + this.textareaId).val());
				action.closeDialog();
				$.ajax({
					type : 'DELETE',
					url : atmometadata.getGroupAPIEndpoint(new FDN(groupId)) + '/' + groupId + '/members/' + userId + "?Comment=" + comment,
					dataType : 'text',
					async:false,
					success : function(data, textStatus, jqXHR) {
						alert("Member is successfully deleted");
					},
					error : function(data, textStatus, jqXHR) {
						soaError('Error removing member. ' + textStatus, "Error");
					}
				});

				widgetInstance.populateGroupMemberList(groupId, true);
			}
		});
	};

	return widgetInstance;
};
