/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var addAlert = {};
addAlert.name = "widget.add.alert";
registerWidgetObject(addAlert);
addAlert.createWidgetInstance = function(instanceName,properties) {
	var widgetInstance = {}
		, widgetInstanceName = instanceName
		, formTemplate = $.template(null, $("#AddAlertFormTmpl"))
		, startTemplate = $.template(null,$("#AddAlertStartTmpl"))
		, signupTemplate = $.template(null,$("#AddAlertSignupTmpl"))
		, optionTemplate = $.template(null,$("#AddAlertSelectOptionTemplate"))
		, widgetErrorPlacement = (function (){
			if (!properties || !window[properties.errorPlacementMethod]) return null;
			return window[properties.errorPlacementMethod];
		})()
	;
	widgetInstance.widgetInstanceName = instanceName;
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		function reRender(){
			$("#SubmitTicket, #StartDiscussion, #AddAlert").appendTo("#Content-Wide");
			$("#DiscussionForm_" + safeGUID + ", #addAlertForm_" + safeGUID + ", #submitTicketForm_" + safeGUID).hide();
			renderLayout(null);
		}
		function openFullForm(){
			function cancelEntry(){
				hideFullForm();
				openStartPanel();
			}
			function hideFullForm(){
				$("#addAlertForm_"+safeGUID).hide();
			}
			function hideStartPanel(){
				$("#addAlertInput_"+ safeGUID).hide();
			}
			function buildDropDowns(bddCallback){
				function retrieveList(url,callback){
					$.ajax({
						type: 'GET',
						url: url,
						dataType: 'json',
						async:false,
						success: callback
					});
				}
				function populateSelect(data){
					function apiVersionArray(){
						function extractApiInfo(infoLine){
							function extractInfoBit(val,bitName){
								var infoLineDetails = infoLine.category
									, ildl = infoLineDetails.length
								;
								for (var x = 0; x < ildl; y++){
									infoLineDetail = infoLineDetails[x];
									if (infoLineDetail.value === val){
										bitInfo = infoLine[bitName];
										break;
									}
								}
								return bitInfo;
							}
							var apiVersionName = extractInfoBit("apiversion","title")
								, apiGuid = extractInfoBit("apiversion","guid")
								, api = {
									assocVersionGuid : apiGuid.value,
									assocName : apiVersionName
								}
							return api;
						}
						var infoArray = data.channel.item || []
							, ial = infoArray.length
							, apiArray = []
							, api
						;
						for(var x = 0; x < ial; x++){
							api = extractApiInfo(infoArray[x]);
							apiArray.push(api);
						}
						return apiArray;
					}
					var $apiSelect = $("select#alertApiVersionList_"+safeGUID), assocList;
					if ($apiSelect.length){
						assocList = apiVersionArray();
 						$.tmpl(optionTemplate,assocList).appendTo($apiSelect);
					}
					bddCallback();
				}
				var versionId = viewObj.objectVersionId || null
					, url = atmometadata.getAPIsAPIEndpoint(new FDN(subjId)) + '/' + subjId + '/versions'
				;
				retrieveList(url,populateSelect);
			}
			function submitHandler(form){
				var selectedApiVersion = $("select#alertApiVersionList_"+safeGUID).val();
				if(selectedApiVersion){
					guid = selectedApiVersion;
				}
				var submitData = {
					"APIID" :  guid,
					"Title" : $("#alertTitleInput_" + safeGUID).val(),
					"Description" :  $("#alertArea_" + safeGUID).val(),
					"Type": type,
					"Priority" :  $("#alertPriorityList_" + safeGUID).val(),
					"Environment": $("#alertEnvironmentList_" + safeGUID).val(),
					"UserID" : userId,
					"Tag" : 
						($("#alertTagsInput_" + safeGUID).hasClass("helperText")) ?
							[] :
							getJSONArray($("#alertTagsInput_"+safeGUID).val())
					}
				;
				$.ajax({
					type: "POST",
					url: atmometadata.getAlertsAPIEndpoint(new FDN(subjId)),
					contentType: 'application/json',
					async:false,
					data: JSON.stringify(submitData),
					dataType: "text",
					success: reRender,
					error: function (d, textStatus, errorThrown) {
						alert('Error retrieving data. data= ' + '; textStatus= '  + textStatus + '; errorThrown= '  + errorThrown);
					}
				});
			}
			function configFormValidator(){
				$("#addAlertForm_"+safeGUID).validate({
					rules: {
						alertArea : "stillHasHelperText",
						alertTitleInput: "stillHasHelperText"
					},
					errorPlacement: widgetErrorPlacement,
					submitHandler : submitHandler
				});
			}
			var props = {
					subjId : subjId,
					guid : guid,
					displayPriority: getDisplayValue('com.soa.atmosphere.talkbox.priority'),
					displayAdd: getDisplayValue('com.soa.atmosphere.talkbox.shorttitle.add'),
					displayTagsHelp: getDisplayValue('com.soa.atmosphere.tags.help'),
					displayAddTags: getDisplayValue('com.soa.atmosphere.talkbox.addtags'),
					displayRemoveTags: getDisplayValue('com.soa.atmosphere.talkbox.removetags')
				}, type="Manual"
			;
			hideStartPanel();
			if ($("#addAlertForm_" + safeGUID).length) return; //in IE, the form appears twice for no reason; this will cancel anything else out if it's already been built
			$.tmpl(formTemplate, props).appendTo(layoutWidgetInstanceDOMObj);
			bindAutoCompleteForTags($("#alertTagsInput_" + safeGUID), true);
			initHelperTextBehavior(layoutWidgetInstanceDOMObj);
			buildDropDowns(configFormValidator);
			$("select",layoutWidgetInstanceDOMObj).styledSelect();
			$("#alertCancelLink_" + safeGUID).on("click",cancelEntry);
		}
		function openStartPanel(){
			$("#addAlertForm_" + safeGUID).remove();
			if ($("#addAlertInput_"+safeGUID).length) {
				$("#addAlertInput_"+safeGUID).show();
				return;
			}
			$.tmpl(startTemplate,{guid : guid}).appendTo(layoutWidgetInstanceDOMObj);
			$("#addAlertInput_" + safeGUID).on("focus click",openFullForm);
		}
		function openSignUp(){
			$.tmpl($("#signUpTicketPanel"),null).appendTo(layoutWidgetInstanceDOMObj);
		}
		var subjId = viewObj.objectId || viewObj.viewName
			, guid = (viewObj.objectVersionId || viewObj.objectId || viewObj.viewName)
			, safeGUID = guid.safeForJQ()
			, userId = login.userFDN()
			, props = {
				guid : guid,
				userId : userId
			}
		;
		$(layoutWidgetInstanceDOMObj).empty();
		if(!login.isUserLoggedIn()){
			openSignUp();
			return;
		}
		openStartPanel();
	}
	widgetInstance.hide = function(){ $("#"+instanceName).empty(); }
	return widgetInstance;
};