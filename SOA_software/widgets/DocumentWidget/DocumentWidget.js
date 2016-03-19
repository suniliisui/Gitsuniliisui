/*globals $ jQuery registerWidgetObject */
/**
 * SOA Software, Inc. Copyright (C) 2000-2011, All rights reserved
 *
 * This software is the confidential and proprietary information of SOA Software,
 * Inc. and is subject to copyright protection under laws of the United States of
 * America and other countries. The use of
 * this software should be in accordance with the license agreement terms you
 * entered into with SOA Software, Inc.
 */
var documentWidget = {};

documentWidget.name = 'widget.document';

registerWidgetObject(documentWidget);

var noEdit = false;

documentWidget.createWidgetInstance = function(instanceName, props) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	widgetInstance.addBorder = false;
	widgetInstance.defaultDocument = 'index.htm';
	if (props && props.addBorder) {
		widgetInstance.addBorder = (props.addBorder == 'true');
	}

	if (props && props.defaultDocument) {
		widgetInstance.defaultDocument = props.defaultDocument;
	}

	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj, renderer) {
		layoutWidgetInstanceDOMObj.empty();
		widgetInstance.layoutWidgetInstanceDOMObj = layoutWidgetInstanceDOMObj;

		// no edit mode for this document widget
		noEdit = true;
		renderer.render({
			border : widgetInstance.addBorder
		}, {
			view : "/Document",
			callback : function() {
				widgetInstance.displayDocument(viewObj);
			}
		});

		// widgetInstance.displayDocument(viewObj);
	};

	widgetInstance.displayDocument = function(viewObj) {
		// create iframe
		var doc_iframe = document.createElement("iframe"), docUrl = cdnRoot + cms.getDocumentLoadURL(viewObj, widgetInstance.defaultDocument), dIframeObj;

		$(doc_iframe).addClass('document_iframe').attr({
			id : "document_" + widgetInstance.widgetInstanceName + "_iframe",
			scrolling : 'no',
			frameborder : 0
		}).appendTo($('#' + widgetInstance.widgetInstanceName + ' #docframe'));

		dIframeObj = $('#document_' + widgetInstance.widgetInstanceName + '_iframe');
		widgetInstance.iframeOnLoad(dIframeObj, viewObj);

		dIframeObj.attr("src", docUrl);
	};

	widgetInstance.iframeOnLoad = function(dIframeObj, viewObj) {
		$(dIframeObj).bind('load', function() {
			try {
				// process links
				widgetInstance.processLinks(this, viewObj);

				// adjust iframe height
				widgetInstance.frameheight = 0;
				/*if ($(this).contents().children().children().html().length < 1) // If the file
				 * is empty.
				 {
				 $(this).remove();
				 return;
				 }*/
				var fileType = "";
				frameUrl = $(this).attr('src');
				if (frameUrl.endsWith(".xml")) {
					frameheight = $(this).height() + 'px';
					fileType = "XML";
				} else {
					frameheight = $(this).contents().height() + 'px';
				}
				if (widgetInstance.frameheight != frameheight) {
					widgetInstance.frameheight = frameheight;
					$(this).css('height', frameheight);
				}

				// check if has anchor
				frameUrl = $(this).attr('src');
				frameAnchor = frameUrl.indexOf('#');
				if (frameAnchor > -1) {
					frameAnchor = frameUrl.substring(frameAnchor + 1, frameUrl.length);
					framedoc = $(this).contents();
					frameOffsetTop = $(this).offset().top;
					widgetInstance.scrollToAnchor(framedoc, frameOffsetTop, frameAnchor);
				}
				if (fileType !== "XML") {
					$(this)[0].contentWindow.document.body.onclick = function() {
						closeHeaderPopdowns();
					};
				} else {
					$(this).css('height', "500px");
					$(this).attr('scrolling', "auto");
				}
			} catch (e) {
				logger.error(e);
			}
		});
	};

	widgetInstance.processLinks = function(el, viewObj) {
		function goToSignup() {
			updateView("home", null, "signup");
		}

		var baseUrl = widgetInstance.getBaseUrl(), iframeBaseUrl = widgetInstance.getIframeBaseUrl(el), framedoc = $(el).contents(), docLinks = framedoc.find('a'), frameOffsetTop = $(el).offset().top, frameParentDoc = $(el).parents("html");
		docLinks.each(function() {
			// all links target parent so it can be bookmarked
			var thishref = $(this).attr('href');
			if (thishref) {
				if ($(this).hasClass('atmo') || thishref.startsWith('#/')) {
					// atmosphere views defined in spring xml files
					newhref = baseUrl + thishref;
					$(this).attr('target', '_parent');
					$(this).attr('href', newhref);
				} else if (thishref.startsWith('#')) {
					// anchor jump links within same document
					$(this).attr('target', '_parent');
					$(this).click(function() {
						thishref = $(this).attr('href');
						scrollto = thishref.substr(thishref.lastIndexOf('#') + 1, thishref.length);
						widgetInstance.scrollToAnchor(framedoc, frameOffsetTop, scrollto);
						return false;
					});
				} else if (!(thishref.startsWith('http') || thishref.startsWith('mail'))) {
					// anchor links to other documents
					// if it starts with / then it is the absolute path and we need not add the base
					// url to it
					newhref = baseUrl + cms.getCorrectedDocumentURL(viewObj, thishref);
					console.warn(newhref);
					$(this).attr('href', newhref);
					$(this).attr('target', '_parent');
				}
			}
		});
	};

	widgetInstance.scrollToAnchor = function(framedoc, frameOffsetTop, scrollto) {
		scrolltoEl = $(framedoc).find('[name="' + scrollto + '"]');
		if (scrolltoEl.length === 0) {
			scrolltoEl = $(framedoc).find('#' + scrollto);
		}
		if (scrolltoEl.length === 0) {
			scrolltoEl = $(framedoc).find('[id^="' + scrollto + '"]');
		}
		if (scrolltoEl.length === 0) {
			// alert('Error locating element: ' + scrollto);
			return false;
		}
		offset = scrolltoEl.offset();
		$(window).scrollTop(offset.top + frameOffsetTop);
	};

	widgetInstance.getBaseUrl = function() {
		fullUrl = location.href;
		baseUrl = fullUrl.split('#')[0];
		return baseUrl;
	};

	widgetInstance.getIframeBaseUrl = function(el) {
		iframeSrc = $(el).attr('src');
		return iframeSrc;
	};

	return widgetInstance;
};
