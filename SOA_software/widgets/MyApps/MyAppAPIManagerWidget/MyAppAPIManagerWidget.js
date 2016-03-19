/*globals $ jQuery registerWidgetObject atmometadata atmoconsolehomemetadata FDN showWidgetInstance redrawWidgetInstance currentView myAppsRequestAPIAccessWidget renderLayout login*/
/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var myAppsAPIManagerWidget = {};
myAppsAPIManagerWidget.name = 'widget.myapps.apimanager';

myAppsAPIManagerWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template == null) {
		this.template = jQuery.template(null, $("#MyAppAPIManagerTemplate"));
		this.template2 = jQuery.template(null, $("#MyAppAPIManagerTemplateDet"));
		// this.template3 = jQuery.template(null, $("#MyAppAPIManagerTemplateDetSingleItem"));
		this.template4 = jQuery.template(null, $("#MyAppAPIManagerTemplateCell"));
		this.template5 = jQuery.template(null, $("#MyAppAPIManagerTemplateEmpty"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.widgetInstanceTemplate2 = this.template2;
	// widgetInstance.widgetInstanceTemplate3 = this.template3;
	widgetInstance.widgetInstanceTemplate4 = this.template4;
	widgetInstance.widgetInstanceTemplate5 = this.template5;
	var currentEnvironment;

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		if (viewObj.objectVersionId == undefined) {
			viewObj.objectVersionId = getAppVersionId(viewObj);
		}
		layoutWidgetInstanceDOMObj.empty();
		widgetInstance.el = layoutWidgetInstanceDOMObj;
		
		var template = this.template; // template needs to be local to draw.
		// widgetInstance.changeMenu(viewObj);
		widgetInstance.contracts = {};
		widgetInstance.getStateOfApp(viewObj, function(appVersion) {
			if (appVersion == null) {
				return;
			}
			widgetInstance.state = appVersion.State;
			if (appVersion.CurrentEnvironment.match(/sandbox/i)) {
				widgetInstance.contracts.statusClass = 'inSandbox';
			}
			widgetInstance.contracts.state = widgetInstance.state;
			$.tmpl(widgetInstance.widgetInstanceTemplate, widgetInstance.contracts).appendTo("#" + widgetInstance.widgetInstanceName);

			widgetInstance.getAppVersionContracts(viewObj, appVersion);

			

		}); // pass callback

	};

	widgetInstance.getAppVersionContracts = function(viewObj, appVersion) {
		widgetInstance.el.find("#requestAPIAccess").click(function() {
			showWidgetInstance("RequestAPIAccessWidget",false);
			myAppsRequestAPIAccessWidget.activateDiv('pageOne');
		});
		// var template = this.template;
		$.ajax({
			type : 'GET',
			url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId)) + "/versions/" + viewObj.objectVersionId + "/contracts",
			dataType : "json",
			async : true,
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : widgetInstance.el,
				"viewObj" : viewObj
			},
			success : function(data) {
				widgetInstance.processApiManagerData(data, viewObj.objectVersionId, viewObj, true);
				widgetInstance.checkAdmin(viewObj);
				widgetInstance.initBindings(widgetInstance.el, instanceName);
				
				if (!login.isUserLoggedIn() || appVersion.CurrentEnvironment == 'Production') {
					widgetInstance.el.find("#switchToProduction").hide();
				}
				widgetInstance.el.find("#MyAppAPIManagerDiv").attr("objectId", viewObj.objectId);
				widgetInstance.el.find("#MyAppAPIManagerDiv").attr("objectVersionId", viewObj.objectVersionId);
			},
			error : function(data, textStatus, errorThrown) {
				alert("api returned the error [" + errorThrown + "], status [" + textStatus + "]");
				if (this.errorcallback != null) {
					this.errorcallback(data, textStatus, errorResponse);
				}
				return false;
			}
		});
	};

	widgetInstance.changeMenu = function(viewObj) {
		$("a[id^=resource_menu_][id*=default][id$=details]").each(function(i) {
			var currentId = $(this).attr('id');
			currentId = currentId.replace(/details/gi, 'apimanager');
			$(this).attr("id", currentId);
		});

	};

	widgetInstance.processApiManagerData = function(data, appVersionId, viewObj, syncWithApiHomeData) {
		widgetInstance.contracts.appId = appVersionId;
		widgetInstance.contracts.items = data;

		var appVersionFDN = new FDN(appVersionId);
		var rdn = appVersionFDN.getRDN();
		var federationMemberId = appVersionFDN.getFederationMemberId();

		$('#apimanager_appid').html(federationMemberId + "-" + rdn);

		// loop through the result to form the new objects the way we need to give to the templates
		var versionKeyArr = {};
		if (data && data.channel && data.channel.item) {
			for ( var i = 0; i < data.channel.item.length; i++) {
				var item = data.channel.item[i];
				var apiVersion = getReferenceAPIVersionDN(item);
				if (versionKeyArr[apiVersion] == null) {
					versionKeyArr[apiVersion] = item;

				}

				if (getAppContractEnvironment(item) == 'Production') {
					versionKeyArr[apiVersion].productionContract = item;
				} else {
					versionKeyArr[apiVersion].sandboxContract = item;
				}

				item.hasProdEndpoint = hasProductionEndpoint(item);
				item.hasSandboxEndpoint = hasSandboxEndpoint(item);

				// item.hasProdEndpoint = false;
				// item.hasSandboxEndpoint = false;				// For some or other reason we are returning either an array or an object
				// if (item.Endpoint) {
					// if (item.Endpoint.length === undefined) {
						// var endpoints = [];
						// endpoints.push(item.Endpoint);
						// item.Endpoint = endpoints;
					// }
					// $.each(item.Endpoint, function(idx, val) {
						// if (val.Category == 'Sandbox') {
							// item.hasSandboxEndpoint = true;
						// } else if (val.Category == 'Production') {
							// item.hasProdEndpoint = true;
						// }
					// })
				// }			}
		} else {
			widgetInstance.el.find("#apilist").append($.tmpl(widgetInstance.widgetInstanceTemplate5, null));
		}
		i = 0;
		for (apiVersion in versionKeyArr) {
			var item = versionKeyArr[apiVersion];
			item.odd = i % 2;
			var apiVersionDiv = widgetInstance.el.find("div[apiversion='" + apiVersion + "']");
			if (apiVersionDiv.length == 0) {
				widgetInstance.el.find("#apilist").append("<div apiversion='" + apiVersion + "' class='apitable'></div>");
				apiVersionDiv = widgetInstance.el.find("div[apiversion='" + apiVersion + "']");
			}
			item.is_private = isAPIAccessWithPrivateAPI(item);
			// widgetInstance.getStateOfApp(viewObj);
			item.state = widgetInstance.state;
			item.apiid = getReferenceAPIVersionDN(item);
			 
			item.apiname = getReferenceApiName(item);
			item.legals = (getEntityReference(item, 'agreement') !== null);
			item.legalslink = '#/api/' + getReferenceApiDN(item) + '/versions/' + item.apiid + '/legal';
			item.link = '#/api/' + getReferenceApiDN(item) + '/versions/' + item.apiid + '/details';
			item.guid = currentView.objectId;
			item.guidVersion = currentView.objectVersionId;
			var html = $.tmpl(widgetInstance.widgetInstanceTemplate2, item);
			$(apiVersionDiv).empty();
			html.appendTo(apiVersionDiv);
			i++;
		}
		if (syncWithApiHomeData) {
			// now lets try getting the contract status for the remote APIs this App has contract with and update the table cells asynchronously
			var processedFedmembers = [];
			for (apiVersion in versionKeyArr) {
				if (new FDN(apiVersion).getFederationMemberId() != atmoconsolehomemetadata.getFederationMemberId() && processedFedmembers[new FDN(apiVersion).getFederationMemberId()] == null) {
					widgetInstance.getAppVersionContractsForRemoteAPIs(apiVersion, viewObj);
					processedFedmembers[new FDN(apiVersion).getFederationMemberId()] = 'Processed';
				}
			}
		}

	};
	widgetInstance.getStateOfApp = function(viewObj, successCallback) {
		$.ajax({
			type : 'GET',
			url : atmometadata.getAppsAPIEndpoint(new FDN(viewObj.objectId).getFederationMemberId()) + "/versions/" + viewObj.objectVersionId,
			dataType : "json",
			async : true,
			context : {
				"widgetInstance" : widgetInstance,
				"viewObj" : viewObj,
				"layoutWidgetInstanceDOMObj" : widgetInstance.el
			},
			success : successCallback,
			error : function(data, textStatus, errorThrown) {
				// alert('Error in retrieving the Version Details: ' + data.responseText);
			}
		});
	};

	widgetInstance.checkAdmin = function(viewObj) {
		var isAdmin = false;
		var isfollower = false;
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
							isAdmin = true;
						}
					}
				}
				if (isAdmin) {
					$('.adminonly').show();
				}

			},
			error : function(data) {
				logger.error('Error retrieving user roles: ' + data.responseText);
			}
		});

		return isAdmin;
	};

	widgetInstance.getAppVersionContractsForRemoteAPIs = function(apiVersionId, viewObj) {
		$.ajax({
			type : 'GET',
			url : atmometadata.getAppsAPIEndpoint(new FDN(apiVersionId)) + "/versions/" + viewObj.objectVersionId + "/contracts",
			accept : "application/json",
			dataType : "json",
			async : false,
			// context: {"widgetInstance" : widgetInstance, "viewObj" : viewObj, "apiVersionId":apiVersionId},
			success : function(data) {
				widgetInstance.processApiManagerData(data, viewObj.objectVersionId, viewObj, false);
				// widgetInstance.populteRemoteApiContracts(data, apiVersionId, viewObj.objectVersionId);
				widgetInstance.checkAdmin(viewObj);
			},
			error : function(data, textStatus, errorThrown) {
				alert('Error in retrieving the Contracts: ' + data.responseText);
			}
		});
	};

	widgetInstance.populteRemoteApiContracts = function(data, apiVersionId, appVersionId) {
		// loop through the result to form the new objects the way we need to give to the templates
		if (data && data.channel && data.channel.item) {
			for ( var i = 0; i < data.channel.item.length; i++) {
				var item = data.channel.item[i];
				var environment = getAppContractEnvironment(item);
				var apiVersion = getReferenceAPIVersionDN(item);
				// construct the ID for the TD where this data has to go in
				var tableCellId = environment + "cell_" + apiVersion.replace(/\./gi, '_');
				// var subItems = [];
				// subItems.push(item);
				// widgetInstance.contracts.subItems = subItems;
				$("#" + tableCellId).empty();
				$.tmpl(widgetInstance.widgetInstanceTemplate4, item).appendTo("#" + tableCellId);

			}
		}
	};
	
	widgetInstance.initBindings = function(layoutWidgetInstanceDOMObj) {
		$(".executeWorkflowAction",widgetInstance.el).on("click",function(event) {
			event.preventDefault();
			widgetInstance.executeWorkflowAction($(this).attr('contractid'), $(this).attr('actionName'), $(this).attr("environment"));
		});

		widgetInstance.el.find('.requestAccess').click(function(event) {
			event.preventDefault();
			widgetInstance.requestProductionAccessForAPI($(this).attr('apiId'));
		});

		widgetInstance.el.find('.requestProdAccess').click(function(event) {
			event.preventDefault();
			widgetInstance.requestProductionAccessForAPI($(this).attr('apiId'));
		});

		widgetInstance.el.find('.requestSandboxAccess').click(function(event) {
			event.preventDefault();
			widgetInstance.requestSandboxAccessForAPI($(this).attr('apiId'));
		});

		widgetInstance.el.find('#switchToProduction').click(function(event) {
			event.preventDefault();
			widgetInstance.switchToProduction();
		});

		widgetInstance.el.find('#requestPA').click(function(event) {
			alert('1');
			event.preventDefault();
			myAppsAPIManagerWidget.requestProductionAccess();
		});

		widgetInstance.el.find('#appAddKeyInfoButton').click(function(event) {
			event.preventDefault();
			showWidgetInstance("EditAppCertificatePopup");
		});
		
 		layoutWidgetInstanceDOMObj.on('click',".showHideEndPoints" ,function(event) {
			event.preventDefault();
			var div = $(this).closest('div.appAPI');
			if (div.find('#sandBoxEndPoint').is(':visible')) {
				div.find('#sandBoxEndPoint').hide();
				div.find('#productionEndPoint').hide();
				div.find('#hRow').hide();
				$(this).find('span').text('VIEW ENDPOINTS');
				div.find('#ShowHideEpArrow').attr('src', '/resources/style/images/DevEx_ShowEndpointArrow.png');
			} else {
				div.find('#sandBoxEndPoint').show();
				div.find('#productionEndPoint').show();
				div.find('#hRow').show();
				$(this).find('span').text('HIDE ENDPOINTS');
				div.find('#ShowHideEpArrow').attr('src', '/resources/style/images/DevEx_HideEndpointArrow.png');
			}

		});

	};
	
	widgetInstance.executeWorkflowAction = function(contractDN, actionName, environment) {
		new CollectCommentDialog({
			template : $("#WorkflowActionTemplate").template(),
			data : {
				title : $.i18n.prop('collectCommentDialog.' + actionName + '.name', environment),
				message : $.i18n.prop('collectCommentDialog.' + actionName + '.message', environment),
				optional : $.i18n.prop("collectCommentDialog." + actionName + '.message.optional', environment)
			},
			callback : function() {
				var data = {};
				data.ActionName = actionName;
				data.Comments = $("#" + this.textareaId).val();
				data = JSON.stringify(data);
				var url = atmometadata.getContractsAPIEndpoint(new FDN(currentView.objectId)) + "/" + contractDN + "/actions";

				$.ajax({
					url : url,
					type : "POST",
					data : data,
					accept : "text/plain",
					contentType : "application/json",
					async : true,
					success : function(data) {
						action.closeDialog();
						renderLayout(null);
					},
					error : function(data, textStatus, errorThrown) {
						alert("Error : " + url + " - " + textStatus + " - " + errorThrown);
					}
				});
			}
		});
	};

	widgetInstance.requestProductionAccessForAPI = function(apiId) {
		var objectId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectId");
		var objectVersionId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectVersionId");
		$.ajax({
			type : "POST",
			url : atmometadata.getContractsAPIEndpoint(new FDN(objectVersionId)),
			async : true,
			dataType : "text",
			data : JSON.stringify({
				"APIVersionID" : apiId,
				"RuntimeID" : objectVersionId,
				"Environment" : "Production"
			}),
			accept : "text",
			contentType : "application/json",
			success : function(data) {
				redrawWidgetInstance(widgetInstance.widgetInstanceName);
			},
			error : function(data, status, error) {
				var message = "<li><font color=red>API Access request failed. (ERROR: " + data.responseText + " )</font></li>";
				myAppsRequestAPIAccessWidget.refreshProgressBar(index, totalSelected, message);
				myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
			}
		});
	};

	widgetInstance.requestSandboxAccessForAPI = function(apiId) {
		var objectId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectId");
		var objectVersionId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectVersionId");
		$.ajax({
			type : "POST",
			url : atmometadata.getContractsAPIEndpoint(new FDN(objectVersionId)),
			async : true,
			dataType : "text",
			data : JSON.stringify({
				"APIVersionID" : apiId,
				"RuntimeID" : objectVersionId,
				"Environment" : "Sandbox"
			}),
			accept : "text",
			contentType : "application/json",
			success : function(data) {
				redrawWidgetInstance(widgetInstance.widgetInstanceName);
			},
			error : function(data, status, error) {
				var message = "<li><font color=red>API Access request failed. (ERROR: " + data.responseText + " )</font></li>";
				myAppsRequestAPIAccessWidget.refreshProgressBar(index, totalSelected, message);
				myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
			}
		});
	};

	widgetInstance.requestProductionAccess = function() {
		var objectId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectId");
		var objectVersionId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectVersionId");
		$.ajax({
			type : 'POST',
			async: false,
			url : atmometadata.getAppsAPIEndpoint(new FDN(objectId).getFederationMemberId()) + '/versions/' + objectVersionId + '/request_production_access',
			dataType : "text",
			cache : false,
			success : function(data) {
				alert('Production access request successful.');
				renderLayout();
			},
			error : function(data) {
				alert('Error in requesting production access: ' + data.responseText);
			}
		});
	};

	widgetInstance.switchToProduction = function() {
		var objectId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectId");
		var objectVersionId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectVersionId");
		new CollectCommentDialog({
			template : $("#WorkflowActionTemplate").template(),
			data : {
				title : $.i18n.prop('com.soa.app.switchproduction.title'),
				message : $.i18n.prop('com.soa.app.switchproduction.message'),
				optional : $.i18n.prop('com.soa.app.switchproduction.optional')
			},
			callback : function() {
				$.ajax({
					type : 'POST',
					url : atmometadata.getAppsAPIEndpoint(new FDN(objectId).getFederationMemberId()) + '/versions/' + objectVersionId + '/switch_to_production',
					async:false,
					accept : "text/plain",
					contentType : "application/x-www-form-urlencoded",
					data : {
						"Comment" : $("#" + this.textareaId).val()
					},
					cache : false,
					success : function(data) {
						action.closeDialog();
						renderLayout();
					},
					error : function(data) {
						alert('Error in requesting switch to production: ' + data.responseText);
					}
				});
				
			}
		});
		/*var objectId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectId");
		var objectVersionId = widgetInstance.el.find('#MyAppAPIManagerDiv').attr("objectVersionId");
		$.ajax({
			type : 'POST',
			url : atmometadata.getAppsAPIEndpoint(new FDN(objectId).getFederationMemberId()) + '/versions/' + objectVersionId + '/switch_to_production',
			async:false,
			accept : "text",
			dataType : "text",
			contentType : "application/x-www-form-urlencoded",
			data : {
				"Comment" : "App switched to Production"
			},
			cache : false,
			success : function(data) {
				alert('Switch to production request successful.');
				renderLayout();
			},
			error : function(data) {
				alert('Error in requesting switch to production: ' + data.responseText);
			}
		});*/
	};


	return widgetInstance;
};

registerWidgetObject(myAppsAPIManagerWidget);