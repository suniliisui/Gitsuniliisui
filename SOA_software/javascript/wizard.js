//
//	wizard UI widget
//
/**
 * constructor
 */
function wizard(info, data) {
	this.name = info.name; // string
	this.titles = info.titles; // array of strings
	this.parent = info.parent; // parent container
	this.tmplate = info.template; // template of form data AND associated HTML
	this.handler = info.handler; // method to override form.onSubmit()
	this.navhandler = info.navhandler;
	this.postCreateHandler = info.postCreateHandler;
	this.cancelText = info.cancelText; // msg to display when cancel is clicked
	this.cancelURL = info.cancelURL; // where to redirect the user to if they
										// cancel
	this.submitButtonText = "Save";
	this.buttons = [ {
		className : 'wizardCancelButton x',
		label : "Cancel",
		align : "left"
	}, {
		className : 'wizardTabBack back action_call',
		label : 'Back',
		align : "left"
	}, {
		className : 'wizardTabNext go action_call',
		align : "left",
		label : 'Next'
	}, {
		className : 'wizardSaveButton next action_call',
		align : "left",
		label : 'Save'
	} ];
	if (info.buttons) {
		this.buttons = info.buttons;
	}

	if (data === null)
		data = {};

	this.make(data); // inception

	this.updateName = function(name) {
		$(".headerPanel h1").text(name);
	};
}

/**
 * local statics
 */
var aHTML = "<div class='wizardHeadingAndTabs' />", // each wizard has TABs
bHTML = "<div class='wizardTab' />", // each TAB has an index number and a
										// title
eHTML = "<div class='wizardTabTitle' />", //	
gHTML = "<div class='divider3'/>", // separate tabs from content
cHTML = "<div id='wizardContent' class='wizardContentHolder' />", // each
																	// wizard
																	// has
																	// content
																	// PAGEs
dHTML = "<div class='wizardPageContent' />", // each PAGE has content
hHTML = "<div class='advancedOptionsSubheader' onclick='this.advancedOptions();'>" + "<img src='/resources/style/images/Icons/norm__arrow_rt.png'><div> Advanced Options </div></div>" + "<div class='advancedOptionsContent' />", 
jHTML = "<div class='headerPanel' />";

/**
 * 
 */
wizard.prototype._Template = "<div class='wizardContentPanel clearthis' />";

/**
 * make - create the DOM elements and add them
 */
wizard.prototype.make = function(dataTmp) {
	var parent = this.parent;
	wizobj = this;
	$("#Content-Widest").addClass("wizardCW");

	parent.append("<div class='headerPanel'><h1>" + this.name + "</h1></div>");
	parent.append(this._Template);

	// add main containers
	var wizardContentPanel = $(".wizardContentPanel", parent);
	if (this.titles && this.titles.length > 0) {
		wizardContentPanel.html(aHTML); // each wizard has TABs
	}
	wizardContentPanel.append(gHTML); // separate tabs from content
	wizardContentPanel.append(cHTML); // each wizard has content PAGEs

	var footer = "<div class='wizardFooter clearthis'>";
	var right_div = "<div class='ctr_buttons_right'>";
	var left_div = "<div class='ctr_buttons_left'>";
	for ( var i = 0; i < this.buttons.length; i++) {
		if (this.buttons[i].align === "right") {
			right_div += "<button class='" + this.buttons[i].className + "'>" + this.buttons[i].label + "</button>";
		} else {
			left_div += "<button class='" + this.buttons[i].className + "'>" + this.buttons[i].label + "</button>";
		}
	}

	right_div += "</div>";
	left_div += "&nbsp;</div>";
	footer += left_div;
	footer += right_div;
	footer += "</div>";

	wizardContentPanel.append(footer);
	var footerHtml = "<div class='wizardFooter'>";

	var wizardHeadingAndTabs = $(".wizardHeadingAndTabs", parent);

	for ( var i = 0; i < this.titles.length; i++) {
		// each wizard has TABs
		wizardHeadingAndTabs.append($('<div />', {
			'class' : 'wizardTab', // each TAB has an index number...
			'tabIndex' : i,
			'click' : function(e) {
				
				e.preventDefault();
				if (typeof wizobj.navhandler === 'function') {
					var rType = wizobj.navhandler();
					navigateWizardTabs(parent, this.tabIndex);
				} else {
					navigateWizardTabs(parent, this.tabIndex);
				}

			}
		}).text(i + 1));

		// each wizard has TABs (yes, the same tabs)
		wizardHeadingAndTabs.append($('<div />', {
			'class' : 'wizardTabTitle', // each TAB has an ... and a title
			'tabIndex' : i,
			'click' : function(e) {
				e.preventDefault();
				if (typeof wizobj.navhandler === 'function') {
					var rType = wizobj.navhandler();
					navigateWizardTabs(parent, this.tabIndex);
				} else {
					navigateWizardTabs(parent, this.tabIndex);
				}

			}
		}).text(this.titles[i])); // the tab's title
	}
	navigateWizardTabs(parent);

	// $.tmpl(this.tmplate,dataTmp).appendTo(".wizardContentHolder",
	// parent).last(); // each PAGE has content...
	parent.find(".wizardContentHolder").last().append($.tmpl(this.tmplate, dataTmp));

	if (typeof wizobj.postCreateHandler === 'function') {
		wizobj.postCreateHandler();
	}

	/*
	 * if(typeof wizobj.navhandler === 'function') { wizobj.navhandler(); }
	 */

	$(".wizardTabBack", parent).addClass('wizardTabBackOff');
	$(".wizardTabBack", parent).click(function() {
		$(parent).find(".wizardTabNext").data('clicked', false);
		$(parent).find(".wizardTabBack").data('clicked', true);

		if (typeof wizobj.navhandler === 'function') {
			var rType = wizobj.navhandler();
			navigateWizardTabs(parent, 'p');
		} else {
			navigateWizardTabs(parent, 'p');
		}
	});
	$(".wizardTabNext", parent).click(function() {
		$(parent).find(".wizardTabBack").data('clicked', false);
		$(parent).find(".wizardTabNext").data('clicked', true);

		if (typeof wizobj.navhandler === 'function') {
			var rType = wizobj.navhandler();
			navigateWizardTabs(parent, 'n');
		} else {
			navigateWizardTabs(parent, 'n');
		}
	});

	for ( var i = 0; i < this.titles.length; i++) // ...with optional views
	{
		$(".advancedOptionsSubheader[tabIndex=" + i + "]", parent).click(function() {
			var advancedOptionsContent = $(".advancedOptionsContent[tabIndex=" + $(this).attr("tabIndex") + "]", parent);
			var advancedOptionsSubheader = $(".advancedOptionsSubheader[tabIndex=" + $(this).attr("tabIndex") + "]", parent);

			if (advancedOptionsContent.is(":visible")) {
				advancedOptionsContent.hide();
				advancedOptionsSubheader.removeClass("advancedOptionsSubheaderON");
				$(this).find('.toggler', parent).html('Show');
			} else {
				advancedOptionsContent.show();
				advancedOptionsSubheader.addClass("advancedOptionsSubheaderON");
				$(this).find('.toggler', parent).html('Hide');
			}
		});
	}

	$(".wizardSaveButton", parent).click(this.handler);
	$(".wizardCancelButton", parent).click(function(e) {
		e.preventDefault();
		cancelmsg = (wizobj.cancelText === undefined || wizobj.cancelText === '') ? 'Cancel API Add Wizard?' : wizobj.cancelText;
		soaConfirm("Cancel Wizard", cancelmsg, function() {
			if (typeof (wizobj.cancelURL) == "undefined" || wizobj.cancelURL === '') {
				if (window.history.length > 1) {
					history.go(-1);
				} else {
					location.href = '#/home/dashboard';
				}
			} else {
				location.href = wizobj.cancelURL;
			}
		});
	});

	// final inits for the wizard
	$(".wizardPageContent[tabIndex=0]", parent).show();
	$(".wizardTab", parent).first().removeClass('wizardTabDone').addClass('wizardTabOn');
	$(".wizardTab", parent).first().next().removeClass('wizardTabDone');
	$(".wizardSaveButton", parent).hide();

	fixWizardTabs(parent);
};

navigateWizardTabs = function(parent, dir) {
	wiztabs = $('.wizardTab', parent);
	totaltabs = wiztabs.length;
	currtab = parseInt($('.wizardTabOn', parent).attr('tabIndex'), 10);

	if (dir == 'n') {
		gototab = currtab + 1;
	} else if (dir == 'p') {
		gototab = currtab - 1;
	} else if (!isNaN(parseInt(dir * 1, 10))) {
		gototab = dir;
	} else {
		gototab = 0;
	}
	if ($('.wizardTab[tabIndex=' + gototab + ']', parent).hasClass('wizardTabDisabled')) {
		return false;
	}

	$('.wizardPageContent', parent).hide();
	$('.wizardTabOn', parent).removeClass('wizardTabOn');
	$('.wizardTab[tabIndex=' + gototab + ']', parent).removeClass('wizardTabDone').addClass('wizardTabOn');
	$('.wizardTab[tabIndex=' + gototab + ']', parent).next().removeClass('wizardTabDone');
	$('.wizardPageContent[tabIndex=' + gototab + ']', parent).show();

	if (gototab === 0) {
		$('.wizardTabBack', parent).hide();
	} else {
		$('.wizardTabBack', parent).show();
	}
	// alert(gototab);
	// alert(totaltabs-1);
	if (gototab == (totaltabs - 1)) {
		$('.wizardSaveButton', parent).show();
		$('.wizardTabNext', parent).hide();
	} else {
		$('.wizardSaveButton', parent).hide();
		$('.wizardTabNext', parent).show();
	}

	/*
	 * var a = $('.wizardTabOn'); if($(a).attr('tabIndex') == 1) {
	 * $(".wizardSaveButton").css("visibility","hidden");
	 * $(".wizardPageContent").each(function(i){$(this).hide();});
	 * $('.wizardTabOn').removeClass('wizardTabOn');
	 * $('.wizardTab[tabIndex=2]').addClass('wizardTabOn');
	 * $(".wizardTabNext").addClass('wizardTabBackOff');
	 * $(".wizardPageContent[tabIndex=2]").show(); } else
	 * if($(a).attr('tabIndex') == 0) {
	 * $(".wizardSaveButton").css("visibility","hidden");
	 * $(".wizardPageContent").each(function(i){$(this).hide();});
	 * $('.wizardTabOn').removeClass('wizardTabOn');
	 * $('.wizardTab[tabIndex=1]').addClass('wizardTabOn');
	 * $(".wizardTabBack").removeClass('wizardTabBackOff');
	 * $(".wizardPageContent[tabIndex=1]").show(); } else {
	 * //$(".wizardPageContent[tabIndex=0]").show();
	 * $(".wizardSaveButton").css("visibility","visible"); }
	 */
};

/**
 * 
 */
wizard.prototype.advancedOptions = function() {
	var advancedOptionsContent = $(".advancedOptionsContent", this.parent);

	if (advancedOptionsContent.is(":visible")) {
		advancedOptionsContent.hide();
	} else {
		advancedOptionsContent.show();
	}
};

wizard.prototype.updateWizardTab = function(status, tab) {
	if (status) {
		$(tab).removeClass("wizardTabError");
		$(tab).addClass("wizardTabDone");
	} else {
		$(tab).addClass("wizardTabError");
		$(tab).removeClass("wizardTabDone");
	}
};

var fixWizardTabs = function(parent) {
	$('.wizardHeadingAndTabs div.wizardTab', parent).each(function() {
		if ($(this).hasClass('wizardTabOn')) {
			return false;
		} else {
			$(this).addClass('wizardTabDone');
			$(this).next().addClass('wizardTitleDone');
		}
	});
};

var showWizardLoader = function() {
	$('.wizardFooter span').hide();
	$('.wizardFooter').append('<span class="loading">Loading</span>');
};
var hideWizardLoader = function() {
	$('.wizardFooter span').show();
	$('.wizardFooter span.loading').remove();
};

var toggleWizardTab = function(tabId, onoff) {
	if (onoff === true) {
		$('.wizardTab[tabindex="' + tabId + '"]').removeClass('wizardTabDisabled');
		$('.wizardTabTitle[tabindex="' + tabId + '"]').removeClass('wizardTabDisabled');
	} else {
		$('.wizardTab[tabindex="' + tabId + '"]').addClass('wizardTabDisabled');
		$('.wizardTabTitle[tabindex="' + tabId + '"]').addClass('wizardTabDisabled');
	}
};
