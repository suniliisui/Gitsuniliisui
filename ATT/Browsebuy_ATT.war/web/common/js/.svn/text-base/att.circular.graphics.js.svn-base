/* -------------------------------------------------------------------

	att.circular.graphics.js
	AT&T Style Guide
	Created by Alexandre Norberto on 17/10/13.
	Copyright (c) 2013 Gen. All rights reserved.

------------------------------------------------------------------- */

App.circularGraphics = boot(function() {

	function setGraphics(circular, percent) {

	    var angle = 58;
	    var radius = 60;

	    var path = "M130,115";
	    
	    for(var i = 0; i <= percent; i++) {
	        angle -=3.6;  
	        angle %= 360;
	        var radians= (angle/180) * Math.PI;
	        
	        var x = 65 + Math.cos(radians) * -1 * radius;
	        var y = 65 + Math.sin(radians) * radius;
	        
	        if(i==0) {
	            path += ' M ' + x + ' ' + y;
	        }
	        else {
	            path += ' L ' + x + ' ' + y;
	        }
	    }

	    circular.setAttribute('d', path);
	}

	function fillGraphics() {
		var voiceBack 			= $('.main-voice-container > svg > path:first')[0],
			voiceFill 			= $('.main-voice-container > svg > path:last')[0],
			dataBack 			= $('.main-data-container > svg > path:first')[0],
			dataFill 			= $('.main-data-container > svg > path:last')[0],
			messagingBack 		= $('.main-messaging-container > svg > path:first')[0],
			messagingFill 		= $('.main-messaging-container > svg > path:last')[0],
			voiceOverLimit 		= $('.main-voice').find('.over-limit'),
			dataOverLimit 		= $('.main-data').find('.over-limit'),
			messagingOverLimit 	= $('.main-messaging').find('.over-limit'),
			voiceOver 			= parseInt(voiceOverLimit.find('.over').text()),
			dataOver 			= parseInt(dataOverLimit.find('.over').text()),
			messagingOver 		= parseInt(messagingOverLimit.find('.over').text()),

			voiceTitle 			= parseInt($('.main-voice-container').find('[data-role=title-info]').text()),
			dataTitle 			= parseInt($('.main-data-container').find('[data-role=title-info]').text()),
			messagingTitle 		= parseInt($('.main-messaging-container').find('[data-role=title-info]').text())
		;

		setGraphics(voiceBack, 80)
		setGraphics(voiceFill, 0)
		setGraphics(dataBack, 80)
		setGraphics(dataFill, 0)
		setGraphics(messagingBack, 80)
		setGraphics(messagingFill, 0)

		newVoiceOver= 660;
		$(document)
			.on('keydown', function(e) {
			console.log("Change");
				if (newVoiceOver > 800) {
					voiceOverLimit.css('opacity', 1);
					newVoiceOver = (newVoiceOver - 800);
					parseInt(voiceOverLimit.find('.over').text(newVoiceOver))
					$('.main-voice-container > svg > path:last').css('stroke', '#f33434');
				} else {
					voiceOverLimit.css('opacity', 0);
					$('.main-voice-container > svg > path:last').css('stroke', '#0678b0');
				}

				if ($('#data-val').val() > 3.00) {
					dataOverLimit.css('opacity', 1);
					newDataOver = ($('#data-val').val() - 3.00).toFixed(1);
					parseInt(dataOverLimit.find('.over').text(newDataOver))
					$('.main-data-container > svg > path:last').css('stroke', '#f33434');
				} else {
					dataOverLimit.css('opacity', 0);
					$('.main-data-container > svg > path:last').css('stroke', '#0678b0');
				}

				if ($('#messaging-val').val() > 1000) {
					messagingOverLimit.css('opacity', 1);
					newMessagingOver = ($('#messaging-val').val() - 1000).toFixed(0);
					parseInt(messagingOverLimit.find('.over').text(newMessagingOver))
					$('.main-messaging-container > svg > path:last').css('stroke', '#f33434');
				} else {
					messagingOverLimit.css('opacity', 0);
					$('.main-messaging-container > svg > path:last').css('stroke', '#0678b0');
				}
			})
			.on('keyup', function(e) {
				if (newVoiceOver > 800) {
					setGraphics(voiceFill, 80);
					newVoiceTitle = parseInt(newVoiceOver);
					$('.main-voice-container').find('[data-role=title-info]').text(newVoiceTitle);
				} else {
					setGraphics(voiceFill, parseInt(newVoiceOver) / 800.00 * 80, e.keyCode == 13);
					newVoiceTitle = parseInt(newVoiceOver);
					$('.main-voice-container').find('[data-role=title-info]').text(newVoiceTitle);
				}

				if ($('#data-val').val() > 3.00) {
					setGraphics(dataFill, 80);
					newDataTitle = parseFloat($('#data-val').val());
					$('.main-data-container').find('[data-role=title-info]').text(newDataTitle);
				} else {
					setGraphics(dataFill, parseInt($('#data-val').val()) / 3.00 * 80, e.keyCode == 13);
					newDataTitle = parseFloat($('#data-val').val());
					$('.main-data-container').find('[data-role=title-info]').text(newDataTitle);
				}

				if ($('#messaging-val').val() > 1000) {
					setGraphics(messagingFill, 80);
					newMessagingTitle = parseInt($('#messaging-val').val());
					$('.main-messaging-container').find('[data-role=title-info]').text(newMessagingTitle);
				} else {
					setGraphics(messagingFill, parseInt($('#messaging-val').val()) / 1000.00 * 80, e.keyCode == 13);
					newMessagingTitle = parseInt($('#messaging-val').val());
					$('.main-messaging-container').find('[data-role=title-info]').text(newMessagingTitle);
				}
			});
	}

	return {
        init: function() {
            fillGraphics();
        }
    }
}());