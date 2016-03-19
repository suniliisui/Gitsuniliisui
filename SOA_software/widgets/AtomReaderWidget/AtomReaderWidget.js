/**
 *  SOA Software, Inc. Copyright (C) 2000-2012, All rights reserved
 *
 *  This  software is the confidential and proprietary information of SOA Software, Inc.
 *  and is subject to copyright protection under laws of the United States of America and
 *  other countries. The  use of this software should be in accordance with the license
 *  agreement terms you entered into with SOA Software, Inc.
 */
var atomReaderWidget = {};

atomReaderWidget.name = 'widget.atom.reader';

registerWidgetObject(atomReaderWidget);

atomReaderWidget.createWidgetInstance = function(instanceName, props) {
	var widgetInstance = {};
	widgetInstance.widgetObject = this;
	widgetInstance.widgetInstanceName = instanceName;
	if (props && props.feedURL) {
		widgetInstance.feedURL = props.feedURL;
	}
	
	if (props && props.title) {
		widgetInstance.title = $.i18n.prop(props.title);
	}
	
		
	widgetInstance.draw = function(viewObj, childWidgetInstances, layoutWidgetInstanceDOMObj, renderer){
		
		var feedUrl = widgetInstance.feedURL; // The feed url for news
		var maxFeed = 3; // Number of maximum feed; default is set to 3 news
		var sendUrl = '/forwardproxy?format=xml'; // Forward proxy
		dataType = 'xml'; // The data type to be received
		contentType = 'application/xml'; // The content type to be received
		
		// Get the news data from feed
		$.ajax({
			global : false,
			url : sendUrl,
			async : true,
			cache : false,
			type: 'GET',
			dataType: dataType,
			contentType: contentType,
			beforeSend: function(xhr, settings) {
				// Create the custom request header
			    xhr.setRequestHeader("Atmo-Forward-To", feedUrl);
			},
			success: function(xml) {
				var results = [];
				// Looping inside the parsed XML nodes				
				$('item',xml).each(function(i) {
					// Limits the number of news feed to be viewed
					if (i + 1 > maxFeed) return false;
					var item = {};
					item.title = $(this).find('title').text(); // The news title
					var dateEl = $(this).find('dc\\:date');
					if (dateEl.text() === '') {
						dateEl = $(this).find('date');
					}
					item.pubDate = getOnlyDate(dateEl.text()); // The published date
					item.content = truncate(stripHtml($(this).find('description').text())); // The content of the news
					item.link = $(this).find('link').text(); // The link to the news post
					results.push(item);
				});
				
				renderer.render({
					'title': widgetInstance.title,
					'results': results
				},{
					'view': "/AtomReader"
				});
				
			}
		});
    };
	
	return widgetInstance;
};