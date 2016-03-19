/*globals $ jQuery registerWidgetObject atmometadata atmoconsolehomemetadata FDN redrawWidgetInstance currentView getReferenceAppVersionDN getApiContractEnvironment login getReferenceAPPVersionDN*/
/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var APIAppManagerWidget = {};
APIAppManagerWidget.instanceName = 'APIAppManager';
APIAppManagerWidget.name = 'widget.api.appmanager';
APIAppManagerWidget.isInitComplete = false;

APIAppManagerWidget.postActions = function(url, data, syncApp, instanceName) {
	$.ajax({
		url : url,
		type : "POST",
		data : data,
		accept : "text/plain",
		contentType : "application/json",
		success : function(data) {
			if(syncApp){
				soaAlert("Sync App", "The App sync is successful");
			}else{
				action.closeDialog();
				// renderLayout(null);
				redrawWidgetInstance(instanceName);
			}
		},
		error : function(data, textStatus, errorThrown) {
			alert("Error : " + url + " - " + textStatus + " - " + errorThrown);
		}
	});
};

APIAppManagerWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.template == null) {
		this.template = jQuery.template(null, $("#APIAppManagerTemplate"));
		this.template2 = jQuery.template(null, $("#APIAppManagerTemplateDet"));
		// this.template3 = jQuery.template(null, $("#APIAppManagerTemplateDetSingleItem"));
		this.template4 = jQuery.template(null, $("#APIAppManagerTemplateCell"));
		this.template5 = jQuery.template(null, $("#APIAppManagerTemplateEmpty"));
	}
	widgetInstance.widgetInstanceTemplate = this.template;
	widgetInstance.widgetInstanceTemplate2 = this.template2;
	// widgetInstance.widgetInstanceTemplate3 = this.template3;
	widgetInstance.widgetInstanceTemplate4 = this.template4;
	widgetInstance.widgetInstanceTemplate5 = this.template5;
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		layoutWidgetInstanceDOMObj.empty();
		var template = this.template; // template needs to be local to draw.
		widgetInstance.changeMenu(viewObj);
		var currentEnvironment;
		widgetInstance.contracts = {};
		var api = new Api({
			APIID : viewObj.objectId
		});
		api.deepFetch({
			async : false,
			success : function(api, response) {
				widgetInstance.contracts.apiName = api.get('Name');
				widgetInstance.contracts.versionName = api.get('APIVersion').version;
				// currentEnvironment = data.CurrentEnvironment;
				widgetInstance.getApiVersionContracts(api, viewObj, layoutWidgetInstanceDOMObj);
			},
			error : function(api, response) {
				alert("Error: Api could not be retrieved " + response);
				return "";
			}
		});

	};

	widgetInstance.getApiVersionContracts = function(api, viewObj, layoutWidgetInstanceDOMObj) {
		var template = this.template;
		$.ajax({
			type : 'GET',
			url : atmometadata.getAPIsAPIEndpoint(new FDN(viewObj.objectVersionId)) + "/versions/" + viewObj.objectVersionId + "/contracts",
			accept : "application/json",
			async:false,
			dataType : "json",
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj,
				"viewObj" : viewObj
			},
			success : function(data) {
				widgetInstance.processApiContracts(layoutWidgetInstanceDOMObj, data, viewObj.objectVersionId, viewObj);
				widgetInstance.initBindings(instanceName);
				APIAppManagerWidget.instanceName = instanceName;
				$("#" + instanceName + " #applist").attr("objectId", viewObj.objectId);
				$("#" + instanceName + " #applist").attr("objectVersionId", viewObj.objectVersionId);
			},
			error : function(data, textStatus, errorThrown) {
				alert("apiversion contracts api returned the error [" + errorThrown + "], status [" + textStatus + "]");
				if (this.errorcallback != null) {
					this.errorcallback(data, textStatus, errorThrown);
				}
				return false;
			},
			contentType : "application/x-www-form-urlencoded"
		});
	};

	
	widgetInstance.initBindings = function(instanceName) {
		if (!this.isInitComplete) {
			this.isInitComplete = true;
			$('#' + instanceName + ' [id="executeWorkflowAction"]').live('click', function(event) {
				event.preventDefault();
				var contractID = $(this).attr('contractid');
				var actionName = $(this).attr('actionname');
				var environment = $(this).attr("environment");
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
						var url = atmometadata.getContractsAPIEndpoint(new FDN(currentView.objectId)) + "/" + contractID + "/actions";

						APIAppManagerWidget.postActions(url, data, false, instanceName);

					}
				});
			});
			
			$('#' + instanceName + ' [id="executeSyncAppWorkflowAction"]').on('click', function(event) {
				event.preventDefault();
				var contractID = $(this).attr('contractid');
				var actionName = $(this).attr('actionname');
				var environment = $(this).attr("environment");
				var data = {};
				data.ActionName = actionName;
				data = JSON.stringify(data);
				var url = atmometadata.getContractsAPIEndpoint(new FDN(currentView.objectId)) + "/" + contractID + "/actions";
				APIAppManagerWidget.postActions(url, data, true, instanceName);
			});
		}
	};
	
	widgetInstance.changeMenu = function(viewObj) {
		$("a[id^=resource_menu_][id*=default][id$=details]").each(function(i) {
			var currentId = $(this).attr('id');
			currentId = currentId.replace(/details/gi, 'appmanager');
			$(this).attr("id", currentId);
		});

	};
	
	widgetInstance.processApiContracts = function(domObj, data, apiVersionId, viewObj) {
		widgetInstance.contracts.apiId = apiVersionId;
		widgetInstance.contracts.items = data;
		$.tmpl(widgetInstance.widgetInstanceTemplate, widgetInstance.contracts).appendTo("#" + widgetInstance.widgetInstanceName);
		// loop through the result to form the new objects the way we need to give to the templates
		var versionKeyArr = {};
		if (data && data.channel && data.channel.item) {
			for ( var i = 0; i < data.channel.item.length; i++) {
				var item = data.channel.item[i];
				var appVersion = getReferenceAppVersionDN(item);
				if (versionKeyArr[appVersion] == null) {
					versionKeyArr[appVersion] = item;
				}

				if (getApiContractEnvironment(item) == 'Production') {
					versionKeyArr[appVersion].productionContract = item;
				} else {
					versionKeyArr[appVersion].sandboxContract = item;
				}

				item.hasProdEndpoint = hasProductionEndpoint(item);
				item.hasSandboxEndpoint = hasSandboxEndpoint(item);
			} // end for
		} else {
			$("#applist", domObj).append($.tmpl(widgetInstance.widgetInstanceTemplate5, null));
		}

		i = 0;
		for (appVersion in versionKeyArr) {
			var item = versionKeyArr[appVersion];
			item.odd = i % 2;
			item.appid = getReferenceAppVersionDN(item);
			item.appname = getReferenceAppName(item);
			item.link = '#/app/' + getReferenceAppDN(item) + '/versions/' + item.appid + '/details';
			item.legals = (getEntityReference(item, 'agreement') !== null);
			item.legalslink = '#/api/' + getReferenceApiDN(item) + '/versions/' + getReferenceAPIVersionDN(item) + '/legal';
			$("#appListTable", domObj).append($.tmpl(widgetInstance.widgetInstanceTemplate2, item));
			i++;
		}
	}

	return widgetInstance;
};

registerWidgetObject(APIAppManagerWidget);