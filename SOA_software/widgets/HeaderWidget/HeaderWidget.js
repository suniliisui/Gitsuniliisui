/**
 *  SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var headerWidget = {};

headerWidget.name = 'widget.header';
var headerWidgetInstance = null;
var headerDirty = true;
var loggedIn = false;

headerWidget.createWidgetInstance = function (instanceName) {//alert("instanceName[" + instanceName + "]");
	var widgetInstance = {};
	var headerWidgetInstance = this;
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (this.anonymousViewTemplate === undefined) {
		this.anonymousViewTemplate = $.template(null, $("#HeaderTemplate"));
	}
	if (this.loggedInUserViewTemplate === undefined) {
		this.loggedInUserViewTemplate = $.template(null, $("#HeaderTemplate"));
	}
	this.notificationsInterval = null;
	this.notifications = 0;
	widgetInstance.anonymousViewTemplate = this.anonymousViewTemplate;
	widgetInstance.loggedInUserViewTemplate = this.loggedInUserViewTemplate;
	widgetInstance.helpSearch=getDisplayValue('com.soa.atmosphere.search.help');
	widgetInstance.donotDestroy = function(){
		return true;
	};
	widgetInstance.draw = function (viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj) {
		//Check to see if the loggedin status has changed
		if ((login.isUserLoggedIn() && loggedIn !== true) || (!login.isUserLoggedIn() && loggedIn === true)){
			headerDirty = true;
		}
		if (headerDirty) {
			layoutWidgetInstanceDOMObj.empty();
			fetchData();
		} else {
			finishDraw();
		}
		
		isSupported = (function(){
			var browserIsSupported = false
				, supportedBrowsers = [
					{ browser: $.browser.mozilla, minversion: 5 },
					{ browser: $.browser.msie, minversion: 8 },
					{ browser: $.browser.safari, minversion: 530 },
					{ browser: $.browser.chrome, minversion: 13}
				], sbl = supportedBrowsers.length
				, currentVersion = Number(($.browser.version).split(".")[0])
			;
			for (var i = 0; i < sbl; i++){
				if (supportedBrowsers[i].browser){
					browserIsSupported = currentVersion >= supportedBrowsers[i].minversion;
					break;
				}
			}
			return browserIsSupported;
		})();
		if (!isSupported) {
			if (!$("#unsupportedBrowser").length){
				$("<div id=\"unsupportedBrowser\"></div>")
					.prependTo("#body_content")
					.csHelp({ csHelpName: "unsupportedBrowser", csHelpTxt : "<span class=\"warning\"><span>CAUTION:</span> The browser you are currently using is not supported. <a href=\"#/home/support?getting_started.htm#What_browser_versions_does_devexchange_support\">Click here</a> for supported browsers.</span>"});
				if (localStorage["unsupportedBrowser.helpClosed"] !== "closed") $("body").addClass("withWarning");
				$("#unsupportedBrowser .closeBtn").click(function(){
					$("body").removeClass("withWarning");
				});
			}
		}
	};
	function finishDraw(){
		function postFetch(fCount){
			var items = 0;
			if (fCount== null || fCount==0 ) {
				items = 0;
			} else {
				items = fCount;
			}
			if (items==0) {
				if ($("#menu_notifications").is(":visible")) {
					$("#menu_notifications").hide();
				}
			} else {
				if (!$("#menu_notifications").is(":visible")) {
					$("#menu_notifications").show();
				}
			}
			updateNotificationCount(items);
			this.notifications = items;
			loggedIn=true;
		}
		if (login.isUserLoggedIn()) {
			this.notifications = 0;
			fetchNotificationCount(postFetch);
		} else {
			loggedIn=false;
		}
		var dominstance = this;
		if (this.notificationsInterval!=null) {
			clearInterval(this.notificationsInterval);
		}
		this.notificationsInterval = setInterval(showNotifications, 3000);
		headerDirty=false;
		$("#menu_myinfo").mouseover(function(){
			$(this).addClass("active");
		});
		$("#menu_myinfo_dd").bind("hidden",function(){
			$("#menu_myinfo").removeClass("active");
		});
	}
	function showNotifications() {
		function postFetch(fCount){
			var itemscount = 0;
			if (fCount==null || fCount==0 ) {
				itemscount = 0;
			} else {
				itemscount = fCount;
			}
			if (itemscount==0) {
				if ($("#menu_notifications").is(":visible")) {
					$("#menu_notifications").hide();
				}
			} else {
				if (!$("#menu_notifications").is(":visible")) {
					$("#menu_notifications").show();
				}
			}
			if (widgetInstance.notifications<itemscount) {
				var item_diff = itemscount-widgetInstance.notifications;
				widgetInstance.notifications = itemscount;
				updateNotificationCount(itemscount);
			} else if (widgetInstance.notifications!=itemscount) {
				widgetInstance.notifications = itemscount;
				updateNotificationCount(itemscount);
			}
		}
		var widgetInstance = this;
		clearInterval(widgetInstance.notificationsInterval);
		if (login.isUserLoggedIn()) {
			if (widgetInstance != null) {
				fetchNotificationCount(postFetch);
			}
		}
		this.notificationsInterval = setInterval(showNotifications, 3000);
	}
	function fetchData() {
		$.ajax({
			type: "GET",
			url: atmoconsolehomemetadata.getAtmosphereContextRoot() + "/widgets/HeaderWidget/headerMenuItems.json",
			async: true,
			cache: false,
			dataType: "json",
			context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : widgetInstance.layoutWidgetInstanceDOMObj, "viewObj" : widgetInstance.viewObj },
			success:processData,
			error: function (data, textStatus, errorThrown) {
				alert('Error retrieving data. data= ' + '; textStatus= '  + textStatus + '; errorThrown= '  + errorThrown);
			}
		});
	}
	function fetchNotificationCount(callback) {
		var notificationurl = atmometadata.getUsersAPIEndpoint(login.homeFederationMemberId()) + "/" + login.userFDN() + "/notifications/count";
		$.ajax({
			type: "GET",
			url: notificationurl,
			async: true,
			context: {"widgetInstance" : widgetInstance, "layoutWidgetInstanceDOMObj" : widgetInstance.layoutWidgetInstanceDOMObj, "viewObj" : widgetInstance.viewObj },
			dataType:"text",
			success:function(data, textStatus, jqXHR) {
				callback(data);
			},
			error: function (data, textStatus, errorThrown) {
				logger.error('Error retrieving data.');
				logger.error('textStatus:');
				logger.error(textStatus);
				logger.error('errorThrown:');
				logger.error(errorThrown);
			},
			statusCode:{
				401: function(jqXHR, textStatus, errorThrown) {
					login.setupAndRenewAuthToken(true);
				}
			}
		});
	}
	function updateNotificationCount(items) {
		$(".menu_notifications").html(items);
	}
	function processData(data, textStatus, jqXHR) {
		var templateOutput;
		if (login.isUserLoggedIn()) {
			templateOutput = $.tmpl(widgetInstance.loggedInUserViewTemplate, data.loginViewLinks);
			templateOutput.appendTo("#"+widgetInstance.widgetInstanceName);
			$('#menu_logout').bind('click',function(e) {
				e.preventDefault();
				headerDirty = true;
				login.logoutFromAllFederationMembers();
				updateView('home', null, 'landing');
				return false;
			});
			$("#menu_status").click(function(e){  //remove the block while implementing
				e.preventDefault();
				alert("Coming soon... this feature isn't implemented yet but we're working on it.");
			});
		} else {
			templateOutput = $.tmpl(widgetInstance.anonymousViewTemplate, data.anonymousViewLinks);
			templateOutput.appendTo("#"+widgetInstance.widgetInstanceName);
		}
		setHelpText($('#searchInput'), widgetInstance.helpSearch, true); //initial search help text
		$('#formSearch').submit(function(e) {
			e.preventDefault();
			var  obj = {};
			obj.objectType = "search";
			obj.viewName = "results";
			obj.viewExt =  'q='+$.trim(encodeURIComponent($('#searchInput').val()));
			updatePageLayout(obj);
			return  false;
		});
		// todo: highlight the current menu
		finishDraw();
	}
	return widgetInstance;
};

registerWidgetObject(headerWidget);