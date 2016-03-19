/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 * 
 * This software is the confidential and proprietary information of SOA Software, Inc. and is subject to copyright protection under laws of the United States of America and other countries. The use of
 * this software should be in accordance with the license agreement terms you entered into with SOA Software, Inc.
 */
var myAppsRequestAPIAccessWidget = {};
myAppsRequestAPIAccessWidget.isInitComplete = false;
myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true; // used in submit create contract callback
myAppsRequestAPIAccessWidget.totalLegalsCount = 0;
myAppsRequestAPIAccessWidget.processedLegalsCount = 0;
myAppsRequestAPIAccessWidget.getLegals = function(link, guidToLink) {
	$.ajax({
		type : "GET",
		url : link,
		async : true,
		dataType : "html",
		success : function(data) {
			$("#legalPrintSaveButtons").attr("link", link); // store link on the page so we can open it later
			$("#legalPrintSaveButtons").attr("documentGuid", guidToLink);
			$("#contentPageThree").empty(); // empty first, in case of multiples
			$("#myAppsRequestAPIAgreeButton").removeClass("button_disabled"); // make sure we start enabled
			$("#myAppsRequestAPIAgreeButton").attr("disabled", false);
			// $("#contentPageThree").prepend(data).scrollTop($("#contentPageThree").offset().top - 400); //make sure we start at the top every time
			$("#contentPageThree").prepend(data).scrollTop(0); // make sure we start at the top every time
			// if document goes beyond height of content div, then disable agree button and only enable
			// when they reach (scroll to) the bottom; otherwise, buttons are already enabled
			if ($('#contentPageThree').outerHeight() < $('#contentPageThree')[0].scrollHeight) {
				$("#contentPageThree").append('<div id="myAppsRequestAPIScrollcheck"></div>'); // add something to check against
				$("#myAppsRequestAPIAgreeButton").attr("disabled", true);
				$("#myAppsRequestAPIAgreeButton").addClass("button_disabled");
				$("#contentPageThree").scroll(
						function() {
							var yPos = ($("#myAppsRequestAPIScrollcheck").offset()).top + ($("#myAppsRequestAPIScrollcheck").outerHeight()), boxTop = ($(this).offset()).top, boxBottom = boxTop
									+ $(this).outerHeight() + 20 // pad it, or it won't get enabled
							;
							if (yPos < boxBottom) {// about the height for the agree button to come into view
								$("#myAppsRequestAPIAgreeButton").removeClass("button_disabled");
								$("#myAppsRequestAPIAgreeButton").attr("disabled", false);
							}
						});
			}
		},
		error : function(data) {
			alert('Error retrieving legal agreement: ' + data.responseText);
		}
	});
};

myAppsRequestAPIAccessWidget.getLegalsLinks = function() {
	var links = [];
	var guidToLinks = [];
	var apiArr = [];
	var processedApis = 0;
	var totalCheckedApis = 0;
	$("input[name=selectedList][state=modified]:checked").each(function() {
		totalCheckedApis = totalCheckedApis + 1;
	});

	$("input[name=selectedList][state=modified]:checked").each(function() {
		var selectedApi = $(this);
		$.ajax({
			type : "GET",
			url : atmometadata.getAPIsAPIEndpoint(new FDN($(this).attr('apiid'))) + "/versions/" + $(this).attr('value') + "/legals",
			dataType : "json",
			async : true,
			accept : "application/json",
			success : function(data) {
				processedApis++;
				var agreementDocs = [];
				for (i = 0; data.channel.item && i < data.channel.item.length; i++) {
					links[links.length] = atmometadata.getContentAPIEndpoint(new FDN(selectedApi.attr('apiid'))) + (data.channel.item[i].link.charAt(0) == '/' ? "" : "/") + data.channel.item[i].link;
					guidToLinks[links.length - 1] = data.channel.item[i].guid.value;
					agreementDocs[i] = data.channel.item[i].guid.value;
				}
				if (data.channel.item) {
					// console.log('data.channel.item.length='+data.channel.item.length);
					myAppsRequestAPIAccessWidget.totalLegalsCount = myAppsRequestAPIAccessWidget.totalLegalsCount + data.channel.item.length;
				}
				// console.log('selectedApi.attr='+selectedApi.attr('value'));
				$("div#pageThree").data("links", links);
				$("div#pageThree").data("guidToLinks", guidToLinks);
				$("div#pageThree").data(selectedApi.attr('value'), agreementDocs);
				apiArr[selectedApi.attr('value')] = 'checked';
				selectedApi.removeAttr('error');
				if (processedApis == totalCheckedApis) {
					// console.log('all are processed. set LegalsRetried to true now');
					myAppsRequestAPIAccessWidget.legalsLinksRetrieved = true;
					$("div#pageThree").data("selApiVersionsLegal", apiArr);
				}
			},
			error : function(data) {
				processedApis++;
				selectedApi.removeAttr('checked');
				selectedApi.removeAttr('state');
				selectedApi.attr('error', data.responseText);
				apiArr[selectedApi.attr('value')] = 'error';
				if (processedApis == totalCheckedApis) {
					// console.log('all are processed. set LegalsRetried to true now. error block');
					myAppsRequestAPIAccessWidget.legalsLinksRetrieved = true;
					$("div#pageThree").data("selApiVersionsLegal", apiArr);
				}
				$("div#contentPageThree").text('There is an error in retrieving legal agreements for the api. please try requesting access again.');
			}
		});
	});

};

myAppsRequestAPIAccessWidget.activateNextButton = function() {
	var links = $("div#pageThree").data("links");
	var currentIndex = $("div#pageThree").data("laCurrentIndex");

	if (links && (currentIndex + 1) >= links.length) {
		$("button[action=showNextLegal]").html('I AGREE');
		$("button[action=showNextLegal]").attr("page", "third");
	} else {
		$("button[action=showNextLegal]").html('I AGREE');
		$("button[action=showNextLegal]").removeAttr("page");
	}

};

myAppsRequestAPIAccessWidget.setLinks = function(prevLink) {
	var currentIndex = $("div#pageThree").data("laCurrentIndex");
	if (prevLink) {
		currentIndex--;
	} else if (currentIndex >= 0) {
		currentIndex++;
	} else {
		currentIndex = 0;
	}
	$("div#pageThree").data("laCurrentIndex", currentIndex);
	var links = $("div#pageThree").data("links");
	var guidToLinks = $("div#pageThree").data("guidToLinks");

	if (links && currentIndex < links.length) {
		myAppsRequestAPIAccessWidget.getLegals(links[currentIndex], guidToLinks[currentIndex]);
		myAppsRequestAPIAccessWidget.activateNextButton();
		myAppsRequestAPIAccessWidget.activateDiv('pageThree');
		var reviewText = 'Please review the License Agreement below (' + (currentIndex + 1) + ' of ' + links.length + ')';
		// $("div#legalAgreements b").html('<b>'+reviewText+'</b><span style="font-size: 68%"> The "I Agree" button will activate once you scroll to the bottom.</span>');
		$(".selectapistext").html('Please review the Legal Agreement below.<div> The I AGREE button will activate once you scroll to the bottom.</div>');
		if (currentIndex == 0) {
			$("div#legalAgreements a").hide();
		} else {
			$("div#legalAgreements a").show();
		}
	} else {
		var totalSelected = $("input[name=selectedList][state=modified], input[name=selectedList][error]").length;
		var retryCounter = 0;
		var currentArrayElementIndex = 0;
		myAppsRequestAPIAccessWidget.submitLegalAgreements(totalSelected, currentArrayElementIndex, retryCounter);
		// myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, retryCounter);
	}
};

myAppsRequestAPIAccessWidget.renderLegalsPage = function(retryCounter) {
	if (myAppsRequestAPIAccessWidget.legalsLinksRetrieved) {
		myAppsRequestAPIAccessWidget.legalsLinksRetrieved = false;
		myAppsRequestAPIAccessWidget.setLinks();
		var links = $("div#pageThree").data("links");

		// $("#selectAPIsHead").removeClass("activeTab").addClass("inactiveTab");
		if (links && links.length > 0) {
			$("#legalAgreements").show();
			$("#legalAgreementsHead").addClass("activeTab").removeClass("inactiveTab");
			$("#selectAPIsHead").removeClass("activeTab").addClass("inactiveTab");
			$("#legalsButtons").show();
			$("#statusDialog").hide();
			$("#legalAgreementsHead").removeAttr("disabled");
		}
	} else if (retryCounter < 10) {
		setTimeout(function() {
			myAppsRequestAPIAccessWidget.renderLegalsPage(++retryCounter);
		}, 500);
	} else {
		$("div#contentPageThree").text('Retrieve legals request did not respond within the anticipated time. ');
	}
};

myAppsRequestAPIAccessWidget.initBindings = function() {
	myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
	if (!this.isInitComplete) {
		this.isInitComplete = true;
		$("button[action=displayLegals]").live("click", function() {
			$("button[action=displayLegals]").closest("#footerlinks").addClass("hideFooterLinks").removeClass("showFooterLinks");
			// prepared selectedApiVersions list
			var selctedCheckboxes = $("input[name=selectedList][state=modified], input[name=selectedList][error]");
			$("input[name=selectedList][state=modified], input[name=selectedList][error]").each(function(idxId) {
				var apiVersionRssItem = apiVersionDNToApiVersion[$(this).attr('apiVersionID')];
				selectedApiVersionRssItems.push(apiVersionRssItem);
			});
			myAppsRequestAPIAccessWidget.getLegalsLinks();
			var retryCounter = 0;
			myAppsRequestAPIAccessWidget.renderLegalsPage(retryCounter);
		});

		$("#selectAPIsHead").live("click", function() {
			myAppsRequestAPIAccessWidget.activateDiv('pageOne');
			$("#legalAgreementsHead").removeClass("activeTab").addClass("inactiveTab");
			$("#selectAPIsHead").removeClass("inactiveTab").addClass("activeTab");
			$("#legalsButtons").hide();
			$("#legalAgreements").hide();
			$("#legalAgreementsHead").attr("disabled", "disabled");
			$("div#pageThree").data("laCurrentIndex", -1);
			$("button[action=displayLegals]").closest("#footerlinks").addClass("showFooterLinks").removeClass("hideFooterLinks");

		});
		$("#legalAgreementsHead").live("click", function(event) {
			event.preventDefault();
			var totalCheckedApis = 0;
			$("input[name=selectedList][state=modified]:checked").each(function() {
				totalCheckedApis = totalCheckedApis + 1;
			});
			if (totalCheckedApis > 0) {
				myAppsRequestAPIAccessWidget.activateDiv('pageThree');
				$("#legalAgreementsHead").addClass("activeTab").removeClass("inactiveTab");
				$("#selectAPIsHead").removeClass("activeTab").addClass("inactiveTab");
			} else {
				return false;
			}
		});

		$("#cancelRequestAPINL").live("click", function() {
			$("#RequestAPIAccessWidget").dialog("close");
			$("#RequestAPIAccessWidget").remove();
			renderLayout(null);
		});
		$("#cancelRequestAPIDL").live("click", function() {
			$("#RequestAPIAccessWidget").dialog("close");
			$("#RequestAPIAccessWidget").remove();
			renderLayout(null);
		});

		$("input[action=createContract]").live("click", function() {
			var totalSelected = $("input[name=selectedList][state=modified], input[name=selectedList][error]").length;
			var retryCounter = 0;
			var currentArrayElementIndex = 0;
			myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, retryCounter);
		});

		$("ul#statusButtons button[action=closeDialog]").live("click", function() {
			$("#RequestAPIAccessWidget").dialog("close");
			$("#RequestAPIAccessWidget").remove();
			var objectId = $(this).attr('appId');
			var objectVersionId = $(this).attr('versionId');
			var obj = {};
			obj.objectType = "myapps";
			obj.objectId = objectId;
			obj.viewName = "versiondetails";
			obj.objectVersionId = objectVersionId;
			updatePageLayout(obj);
		});

		$("#legalsButtons > a").live("click", function() {
			myAppsRequestAPIAccessWidget.closeDialog();
		});

		$("#showHideDesc").live("click", function() {
			var trClass = $(this).closest('tr').next('tr').next('tr').attr('class');
			var dividerRow = $(this).closest('tr').next('tr').attr('class');
			if (trClass === "hideDesc") {
				$(this).closest('tr').next('tr').next('tr').removeClass('hideDesc').addClass("showDesc");
				$(this).closest('tr').next('tr').removeClass('hideapidivider').addClass("showapidivider");
				$(this).html('<img src="/resources/style/images/requestapi_expanded_icon.png">');
			} else {
				$(this).closest('tr').next('tr').next('tr').removeClass('showDesc').addClass("hideDesc");
				$(this).closest('tr').next('tr').removeClass('showapidivider').addClass("hideapidivider");
				$(this).html('<img src="/resources/style/images/requestapi_collapsed_icon.png">');
			}
		});

		$("#footerlinks > a").live("click", function() {
			$("#RequestAPIAccessWidget").dialog("close");
			event.preventDefault();
		});

		$("input[name=selectedList]").live("change", function() {
			if ($(this).attr('state')) {
				$(this).removeAttr('state');
			} else {
				$(this).attr('state', 'modified');
			}

			// if($("input[name=selectedList]:checked").length == 0) {
			if ($("input[name=selectedList][state=modified]").length == 0) {
				$("button[action=displayLegals]").attr("disabled", true);
				$("button[action=displayLegals]").addClass("button_basic_inactive");
				$("#myAppsRequestAPINextDL").attr("src", "/resources/style/images/arrow_right_999999.gif");
			} else {
				$("button[action=displayLegals]").removeAttr("disabled");
				$("button[action=displayLegals]").removeClass("button_basic_inactive");
				$("#myAppsRequestAPINextDL").attr("src", "/resources/style/images/arrow-right.png");
			}
		});

		$("button[action=showNextLegal]").live("click", function() {
			if ($(this).attr("page")) {
				$(this).hide();
				$("#legalsButtons").hide();
				$("#legalAgreementsHead").addClass("inactiveTab").removeClass("activeTab");
			}
			$("button[action=showNextLegal]").attr("disabled", true);
			$("button[action=showNextLegal]").addClass("button_inactive");
			$("#selectAPIsHead").removeClass("activeTab").addClass("inactiveTab");
			$("#selectAPIsHead").attr("disabled", true);
			myAppsRequestAPIAccessWidget.setLinks(false);
		});
		$("div#legalAgreements a").live("click", function(event) {
			event.preventDefault();
			myAppsRequestAPIAccessWidget.setLinks(true);
		});

		$("#myAppsRequestAPISave").live("click", function(event) {
			event.preventDefault();
			var link = $("#legalPrintSaveButtons").attr("link");
			var guidToLink = $("#legalPrintSaveButtons").attr("documentGuid");
			myAppsRequestAPIAccessWidget.printOrSave(guidToLink, 'save');
		});

		$("#myAppsRequestAPIPrint").live("click", function(event) {
			event.preventDefault();	
			var link = $("#legalPrintSaveButtons").attr("link");
			var guidToLink = $("#legalPrintSaveButtons").attr("documentGuid");
			window.open("#/home/printlegals?" + guidToLink);
			//myAppsRequestAPIAccessWidget.printOrSave(guidToLink, 'print');
			//window.open(link);
		});
	}
};

myAppsRequestAPIAccessWidget.printOrSave = function(documentID, printOrSave) {
	$.ajax({
		type : 'GET',
		url : atmometadata.getLegalsAPIEndpoint(new FDN(documentID)) + "/" + documentID,
		async : true,
		dataType : 'json',
		success : function(data, responseText, jqXHR) {
			var printSaveLink = data.PrintContentPath;
			if (printOrSave == 'print') {
				window.open(atmometadata.getContentAPIEndpoint(new FDN(documentID)) +"/" + printSaveLink);
			} else {
				if (printSaveLink.indexOf("?") == -1) {
					window.open(atmometadata.getContentAPIEndpoint(new FDN(documentID)) +"/" + printSaveLink + "?download=true");
				} else {
					window.open(atmometadata.getContentAPIEndpoint(new FDN(documentID))+"/" + printSaveLink + "&download=true");
				}
			}
		},
		error : function(data, textStatus, errorThrown) {
			alert('Error retrieving the agreement document for printing/saving');
		}
	});
};

myAppsRequestAPIAccessWidget.submitLegalAgreements = function(totalSelected, currentArrayElementIndex, retryCounter) {
	setTimeout(function() {
		if (myAppsRequestAPIAccessWidget.processedLegalsCount >= myAppsRequestAPIAccessWidget.totalLegalsCount || myAppsRequestAPIAccessWidget.noOfTries > 10) {
			myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, retryCounter);
			myAppsRequestAPIAccessWidget.processedLegalsCount = 0;
			myAppsRequestAPIAccessWidget.totalLegalsCount = 0;
			myAppsRequestAPIAccessWidget.postAgreementStatus = 'NONE';
			myAppsRequestAPIAccessWidget.noOfTries = 0;
		} else if (myAppsRequestAPIAccessWidget.postAgreementStatus != 'STARTED') {
			myAppsRequestAPIAccessWidget.noOfTries = 0;
			myAppsRequestAPIAccessWidget.postAgreementStatus = 'STARTED';
			myAppsRequestAPIAccessWidget.postLegalAgreements();
			myAppsRequestAPIAccessWidget.submitLegalAgreements(totalSelected, currentArrayElementIndex, retryCounter);
		} else {
			myAppsRequestAPIAccessWidget.noOfTries = myAppsRequestAPIAccessWidget.noOfTries + 1;
			myAppsRequestAPIAccessWidget.submitLegalAgreements(totalSelected, currentArrayElementIndex, retryCounter);
		}
	}, 500);
};

myAppsRequestAPIAccessWidget.drawStatusTemplate = function(totalSelected, currentArrayElementIndex, retryCounter) {
	// var templateHtml = jQuery.tmpl(widgetInstance.statusTemplate, {"selectedApiVersionRssItems":selectedApiVersionRssItems});
	// templateHtml.appendTo("tbody[key=statusDialogTable]");
	var tmplte = jQuery.tmpl($.template(null, $("#MyAppRequestAPIStatusTemplate")), null);
	tmplte.appendTo("#statusDialog");
	myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, retryCounter);

};

myAppsRequestAPIAccessWidget.postLegalAgreements = function() {
	myAppsRequestAPIAccessWidget.postAgreementStatus = 'STARTED';
	var selectedApiVersions = $("div#pageThree").data("selApiVersionsLegal");
	for (var selApiVersionID in selectedApiVersions) {
		if (selectedApiVersions[selApiVersionID] != 'checked') {
			continue;
		}
		agreementDocs = $("div#pageThree").data(selApiVersionID);
		for ( var j = 0; agreementDocs && j < agreementDocs.length; j++) {
			var jsonObj = {};
			jsonObj.DocumentID = agreementDocs[j];
			// jsonObj["UserID"] = login.userFDN();
			jsonObj.AgreementScopeID = currentView.objectVersionId;
			$.ajax({
				type : "POST",
				url : atmometadata.getLegalsAPIEndpoint(new FDN(selApiVersionID)) + "/agreements",
				dataType : "text",
				async : true,
				contentType : 'application/json',
				data : JSON.stringify(jsonObj),
				success : function(response, textStatus, jqXHR) {
					myAppsRequestAPIAccessWidget.processedLegalsCount = myAppsRequestAPIAccessWidget.processedLegalsCount + 1;
				},
				error : function(data, textStatus, errorThrown) {
					myAppsRequestAPIAccessWidget.processedLegalsCount = myAppsRequestAPIAccessWidget.processedLegalsCount + 1;
					alert('error posting acceptance agreement');
				}
			});
		}
	}
};

myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest = function(totalSelected, currentArrayElementIndex, retryCounter) {
	if (myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted) {
		if ($("input[name=selectedList][state=modified], input[name=selectedList][error]").length > 0) {
			var item = $("input[name=selectedList][state=modified], input[name=selectedList][error]").eq(0);
			currentArrayElementIndex++;
			var APIName = item.parent().parent().find('td:first #serviceName').text();
			var version = item.closest('tr').find('select option:selected').text();
			if (version == "") {
				version = item.attr('title');
			}
			if (item.attr('checked')) {
				myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = false;
				myAppsRequestAPIAccessWidget.submitCreateContractRequest(currentArrayElementIndex, totalSelected, item.attr('appid'), item.val(), APIName, version, item.attr('environment'));
			} else {
				myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
				myAppsRequestAPIAccessWidget.refreshProgressBar(currentArrayElementIndex, totalSelected, "<li><font color=red>Contract request failed for " + APIName + " (ERROR: "
						+ item.attr('error') + " )</font></li>");
			}
			item.remove();
			myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, 0);
		}
	} else if (retryCounter < 10) {
		setTimeout(function() {
			myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, ++retryCounter);
		}, 500);
	} else {
		$("div#messages").text('One or more requests might be taking longer to respond.');
		// continue processing other contract requests
		myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
		myAppsRequestAPIAccessWidget.prepareSubmitCreateContractRequest(totalSelected, currentArrayElementIndex, 0);
	}
};

myAppsRequestAPIAccessWidget.submitCreateContractRequest = function(index, totalSelected, appId, apiId, apiName, version, environment) {
	var message;
	$.ajax({
		type : "POST",
		url : atmometadata.getContractsAPIEndpoint(new FDN(appId)),
		async : true,
		dataType : "json",
		data : JSON.stringify({
			"APIVersionID" : apiId,
			"RuntimeID" : appId,
			"Environment": environment
		}),
		accept : "text",
		contentType : "application/json",
		success : function(data) {
			message = "<tr>";
			message = message + "<td style='width:55%' class='apilist'> <div class='statusapinamewrap'>   <span> " + apiName + "</span><br/>Version: " + version
					+ " <br/>   </div></td>";
			message = message + "<td class='apiaccessstatus'>API Access Request: <span class='status'>Successful</span></td>";
			message = message + "</tr>";
			if (index != totalSelected) {
				message = message + "<tr>   <td colspan='2'><hr class='statushorizontalRow'></td>  </tr>";
			}
			$("div#legalAgreements b").hide();
			$("div#legalAgreements a").hide();
			$("#legalsButtons").hide();
			$("#statusDialog").show();
 			if (index == totalSelected) {
				$("#statusButtons #closeDialog").removeAttr('disabled');
			}
			myAppsRequestAPIAccessWidget.refreshProgressBar(index, totalSelected, message);
			myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
		},
		error : function(data, status, error) {
			// message = "<li><font color=red>Contract request failed for " + apiName + " (ERROR: " + data.responseText + " )</font></li>";
			message = "<tr>";
			message = message + "<td style='width:55%' class='apilist'> <div class='statusapinamewrap'>   <span> " + apiName + "</span><br/>Version: " + version
					+ " <br/>   </div></td>";
			message = message + "<td style='width:45%;'>API Access Request:" + "Falied: (" + data.responseText + ")</td>";
			message = message + "</tr>";
			if (index != totalSelected) {
				message = message + "<tr>   <td colspan='2'><hr class='statushorizontalRow'></td>  </tr>";
			}else{
				$("#statusButtons #closeDialog").removeAttr('disabled');
			}
			$("#statusDialog").show();
			myAppsRequestAPIAccessWidget.refreshProgressBar(index, totalSelected, message);
			myAppsRequestAPIAccessWidget.isPreviousContractRequestCompleted = true;
		}
	});
	// myAppsRequestAPIAccessWidget.refreshProgressBar(index, totalSelected, message);
};

myAppsRequestAPIAccessWidget.refreshProgressBar = function(index, totalSelected, message) {
	// var val = (index / totalSelected) * 100;
	// $("#progressBar").progressbar({value: val});
	$("tbody[key=statusDialogTable]").append(message);
	$(".selectapistext").text('Request Status');

	myAppsRequestAPIAccessWidget.activateDiv('pageFour', message);
};

myAppsRequestAPIAccessWidget.closeDialog = function() {
	$("#RequestAPIAccessWidget").dialog("close");
	$("#RequestAPIAccessWidget").remove();
	renderLayout(null);
};

myAppsRequestAPIAccessWidget.activateDiv = function(divsection) {
	if ($("#progressBar").attr("class")) {
		$("#statusDialog").show();
	}
	$("div#tabs form > div").hide();
	$("div#" + divsection).parent().show();
	if (divsection === "pageFour") {
		$("#statusButtons").removeClass("hidestatusbtns").addClass("showstatusbtns");
		$("#legalAgreementsHead").addClass("inactiveTab").removeClass("activeTab").attr("disabled", true);
		$("#selectAPIsHead").removeClass("activeTab").addClass("inactiveTab").attr("disabled", true);
	}
};

myAppsRequestAPIAccessWidget.name = 'widget.myapps.requestAPIAccess';

myAppsRequestAPIAccessWidget.createWidgetInstance = function(instanceName) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;

	if (this.template === undefined) {
		this.template = jQuery.template(null, $("#MyAppRequestAPITemplate"));
	}

	widgetInstance.widgetInstanceTemplate = this.template;

	if (this.statusTemplate === undefined) {
		this.statusTemplate = jQuery.template(null, $("#MyAppRequestAPIStatusTemplate"));
	}
	widgetInstance.statusTemplate = this.statusTemplate;

	if (this.availableApiListTemplate === undefined) {
		this.availableApiListTemplate = jQuery.template(null, $("#MyAppRequestAPIAvailableListTemplate"));
	}
	widgetInstance.availableApiListTemplate = this.availableApiListTemplate;

	widgetInstance.datar = {};
	widgetInstance.apiVersionDNToApiVersion = [];
	widgetInstance.selectedApiVersionRssItems = [];
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		apiVersionDNToApiVersion = []; // initialize to empty list
		selectedApiVersionRssItems = [];
		myAppsRequestAPIAccessWidget.initBindings();
		layoutWidgetInstanceDOMObj.empty();
		layoutWidgetInstanceDOMObj.css({
			"width" : "100%",
			"overflow" : "visible"
		});
		var dial = layoutWidgetInstanceDOMObj.dialog({
			"width" : "610",
			"modal" : "true"
		});
		$(dial).hide();
		$(".ui-dialog-titlebar").hide();
		var appName = $("#myAppAPIMangerAppName").text();
		if (appName.length == 0) {
			appName = this.appName;
		}
		widgetInstance.datar.jqAppName = appName;
		widgetInstance.datar.jqAppVersionName = $("#MyAppAPIManagerDiv #myAppAPIManagerVersionName").text();
		$.tmpl(widgetInstance.widgetInstanceTemplate, widgetInstance.datar).appendTo("#" + widgetInstance.widgetInstanceName);
		$("#legalAgreements").hide();
		$("#legalsButtons").hide();
		$("#statusDialog").hide();
		$("#legalAgreementsHead").removeClass("activeTab");
		var objectId = viewObj.objectId;
		var objectVersionId = viewObj.objectVersionId;
		if (objectId == null) {
			objectId = this.objectId;
			viewObj.objectId = objectId;
		}
		if (objectVersionId == null) {
			objectVersionId = this.versionId;
			viewObj.objectVersionId = objectVersionId;
		}

		
		$("#legalAgreementsHead").attr("disabled", "disabled");

		// get existing contracts list
		$.ajax({
			type : "GET",
			url : atmometadata.getAppsAPIEndpoint(new FDN(objectId)) + "/versions/" + objectVersionId + "/contracts",
			context : {
				"widgetInstance" : widgetInstance,
				"layoutWidgetInstanceDOMObj" : layoutWidgetInstanceDOMObj,
				"viewObj" : viewObj
			},
			dataType : "json",
			async : true,
			accept : "application/json",
			success : function(data) {
				widgetInstance.saveData(data, true, objectVersionId);
				widgetInstance.selectedListRetrieved = true;
				widgetInstance.drawSelectedAndAvailableItems(objectVersionId, data, objectId);
				$(dial).show();
				makeDialogCenterAlign(layoutWidgetInstanceDOMObj);
				
			},
			error : function(data) {
				alert('Error retrieving data: ' + data.responseText);
			}
		});

	};

	widgetInstance.drawSelectedAndAvailableItems = function(objectVersionId, contractsRss, objectId) {
		// get all available api list
		$.ajax({
			type : "GET",
			url : atmoconsolehomemetadata.getAPIsAPIEndpoint() + "/versions",
			data : {
				"State" : "com.soa.api.state.open"
			},
			dataType : "json",
			async : true,
			accept : "application/json",
			success : function(data) {
				widgetInstance.saveData(data, false, objectVersionId);
				widgetInstance.dataRetrieved = true;
				// widgetInstance.retryCounter = 0;
				// widgetInstance.removeSelectedItemsFromAvailableList();
				var availableApis = [];
				var selectedApis = [];
				var availableAndSelectedApis = [];
				var apiversionToApiDetailMap = [];
				var apiDetailByApiDNMap = [];
				if (data && data.channel && data.channel.item && data.channel.item.length > 0) {
					for ( var i = 0; i < data.channel.item.length; i++) {
						var apiVersionItem = data.channel.item[i];
						var apiVersionId = apiVersionItem.guid.value;
						var apiDN = getReferenceApiDN(apiVersionItem);
						var apiDetail = apiDetailByApiDNMap[apiDN];
						var visibility = data.channel.item[i].category[2].value;
						var environment = hasSandboxEndpoint(data.channel.item[i]) ? "Sandbox" : "Production";
						if (apiDetail == null) {
							apiDetail = {
								"apiDN" : apiDN,
								"name" : getReferenceApiName(apiVersionItem),
								"availableForNewContracts" : true,
								"visibility" : visibility,
								"environment": environment
							};
							apiDetail.apiVersions = [];
							availableAndSelectedApis.push(apiDetail);
							availableApis.push(apiDetail);
							apiDetailByApiDNMap[apiDN] = apiDetail;
						}
						apiversionToApiDetailMap[apiVersionId] = apiDetail;
						apiDetail.apiVersions.push(apiVersionItem);
						apiVersionDNToApiVersion[apiVersionId] = apiVersionItem;
					}

					// build selected List using contract list and available list
					if (contractsRss && contractsRss.channel && contractsRss.channel.item && contractsRss.channel.item.length > 0) {
						for ( var i = 0; i < contractsRss.channel.item.length; i++) {
							var contractItem = contractsRss.channel.item[i];
							var apiVersionIdForContract = getReferenceAPIVersionDN(contractItem);
							var apiDN = getReferenceApiDN(contractItem);
							var apiDetailForSelectedApiVersion = apiDetailByApiDNMap[apiDN];
							if (apiDetailForSelectedApiVersion == null) {
								apiDetailForSelectedApiVersion = {
									"apiDN" : apiDN,
									"name" : getReferenceApiName(contractItem),
									"availableForNewContracts" : false
								};
								availableAndSelectedApis.push(apiDetailForSelectedApiVersion);
								apiDetailByApiDNMap[apiDN] = apiDetailForSelectedApiVersion;
							}
							apiDetailForSelectedApiVersion.selectedApiVersionDN = apiVersionIdForContract;
							apiDetailForSelectedApiVersion.contractRssItem = contractItem;
							selectedApis.push(apiDetailForSelectedApiVersion);

						}
					}
					var templateHtml = jQuery.tmpl(widgetInstance.availableApiListTemplate, {
						"selectedApis" : selectedApis,
						"availableAndSelectedApis" : availableAndSelectedApis,
						"appVersionId" : objectVersionId
					});
					templateHtml.appendTo("tbody[key=myAppsRequestAPIList]");
					$("#closeDialog").attr('appId', objectId).attr('versionId', objectVersionId);
				
					for(var i=0; i< availableAndSelectedApis.length; i++){
						var api =  availableAndSelectedApis[i];
						if(api.apiVersions.length > 1){
							var safeObjId = availableAndSelectedApis[i].apiDN.safeForJQ();
							$("#apiversionsDropdown_"+safeObjId).styledSelect({width:100});
						}
						
					}
  					
 					
 					widgetInstance.bindEvents(selectedApis, objectVersionId);
				}
			},
			error : function(data) {
				alert('Error retrieving data: ' + data.responseText);
			}
		});
	};
	widgetInstance.bindEvents = function(selectedApis, objectVersionId) {
		$('select[id^=apiversionsDropdown]').bind("change", function(event) {
			// var trClass = $(this).closest('tr').next('tr:second').attr('class');
			var row = $(this).closest('tr').next('tr');
			var descRow = $(this).closest('tr').next('tr').next('tr');
			var checkBox = $(this).closest('td').next('td').find('input');
			checkBox.val($(this).val());
			var desc = $("option:selected", this).attr('desc');
			var a = $(this).closest('tr').find('a');
			a.html('<img src="/resources/style/images/requestapi_expanded_icon.png">');
			descRow.removeClass('hideDesc').addClass("showDesc");
			row.removeClass('hideapidivider').addClass("showapidivider");
			descRow.find('td:first span#desc').text(desc);
		});

		$(".apiversionsDropdown option").each(function() {
			for ( var i = 0; i < selectedApis.length; i++) {
				// console.log('selectedApi='+selectedApis[i].selectedApiVersionDN);
				if ($(this).val() == selectedApis[i].selectedApiVersionDN && $(this).attr('appversionid') == objectVersionId) {
					// console.log('disbale. parent ID='+$(this).parent(".apiversionsDropdown").attr('id'));
					var selectBox = $("select[apiid='" + selectedApis[i].apiDN + "']");
					selectBox.val(selectedApis[i].selectedApiVersionDN);
					selectBox.attr('disabled', 'disabled');
					// soaUnselect(document.getElementById($(this).parent(".apiversionsDropdown").attr('id')));
					$(this).attr("selected", 'selected');
					$("select").styledSelect();
					// soaSelect(document.getElementById($(this).parent(".apiversionsDropdown").attr('id')));
					var desc = $(this).attr('desc');
					var descRow = $(this).closest('tr').next('tr');
					descRow.find('td:first span#desc').text(desc);
					break;
				}
			}
		});

		$.each($("input[type=checkbox]"), function(ind) {
			if (!$(this).attr('value')) {
				var version = $(this).closest('tr').find('select').val();
				$(this).attr('value', version);
			}
			for ( var i = 0; i < selectedApis.length; i++) {
				if (selectedApis[i].selectedApiVersionDN == $(this).attr('value')) {
					$(this).attr('checked', 'checked');
					$(this).attr('disabled', 'disabled');
				}
				if (!$(this).attr('value')) {
					var versionDDIsDisabled = $(this).closest('tr').find('select').attr('disabled');
					if (versionDDIsDisabled) {
						$(this).attr('checked', 'checked');
						$(this).attr('disabled', 'disabled');
					}
				}
			}
		});
	};

	widgetInstance.removeSelectedItemsFromAvailableList = function() {
		if (widgetInstance.selectedListRetrieved && widgetInstance.dataRetrieved) {
			widgetInstance.selectedListRetrieved = widgetInstance.dataRetrieved = false;
			if (widgetInstance.datar.selected.channel.item) {
				if (!(widgetInstance.datar.selected.channel.item instanceof Array)) {
					widgetInstance.datar.selected.channel.item = [ widgetInstance.datar.selected.channel.item ];
				}
			} else {
				widgetInstance.datar.selected.channel.item = [];
			}
			if (!widgetInstance.datar.notselected.channel.item) {
				widgetInstance.datar.notselected.channel.item = [];
			}
			for (i = 0; i < widgetInstance.datar.selected.channel.item.length; i++) {
				var selectedGuid = widgetInstance.datar.selected.channel.item[i].EntityReferences.EntityReference[0].Guid;
				for (k = 0; k < widgetInstance.datar.notselected.channel.item.length; k++) {
					for ( var j = 0; j < widgetInstance.datar.notselected.channel.item[k].EntityReferences.length; j++) {
						if (widgetInstance.datar.notselected.channel.item[k].EntityReferences[j].EntityReference.Guid == selectedGuid) {
							widgetInstance.datar.selected.channel.item[i].description = widgetInstance.datar.notselected.channel.item[k].description;
							widgetInstance.datar.notselected.channel.item.splice(k, 1);
							k--;
						}
					}
				}
			}
		} else {
			setTimeout(function() {
				if (widgetInstance.retryCounter < 100) {
					widgetInstance.retryCounter++;
					widgetInstance.removeSelectedItemsFromAvailableList();
				} else {
					alert('There was a problem retrieving API list.');
				}

			}, 500);
		}
	};

	widgetInstance.saveData = function(rssjson, isSelectedApiList, appId) {
		if (rssjson) {
			// widgetInstance.datar.appId = appId;
			if (isSelectedApiList) {
				widgetInstance.datar.selected = rssjson;
				// widgetInstance.removeDuplicateSelectedApiNames();
			} else {
				widgetInstance.datar.notselected = rssjson;
			}
		}
	};

	widgetInstance.removeDuplicateSelectedApiNames = function() {
		for ( var i = 0; widgetInstance.datar.selected.channel.item && i < widgetInstance.datar.selected.channel.item.length; i++) {
			var selectedGuid = widgetInstance.datar.selected.channel.item[i].EntityReferences.EntityReference[0].Guid;

			for ( var k = i + 1; k < widgetInstance.datar.selected.channel.item.length; k++) {
				if (widgetInstance.datar.selected.channel.item[k].EntityReferences.EntityReference[0].Guid == selectedGuid) {
					widgetInstance.datar.selected.channel.item.splice(k, 1);
					k--;
				}
			}
		}
	};
	widgetInstance.setObjectID = function(objectId) {
		this.objectId = objectId;
	};
	widgetInstance.setVersionID = function(versionId) {
		this.versionId = versionId;
	};
	widgetInstance.setAppName = function(appName) {
		this.appName = appName;
	};

	return widgetInstance;
};

registerWidgetObject(myAppsRequestAPIAccessWidget);