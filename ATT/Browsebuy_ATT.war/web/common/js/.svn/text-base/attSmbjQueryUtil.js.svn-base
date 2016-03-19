(function ( $ ) {

	// jQuery doOnce plug-in
    $.fn.doOnce = function ( func ) {
        this.length && func.apply( this );
        return this;
    };

    // jQuery handlebars plug-in
    var compiled = {};
    $.fn.handlebars = function ( template, data ) {
        if ( template instanceof jQuery ) {
            template = $( template ).html();
        }

        compiled[template] = Handlebars.compile( template );
        this.html( compiled[template]( data ) );
    };

    // jQuery plug-in to get URL param
    $.getUrlVar = function ( key ) {
        var result = new RegExp( key + "=([^&]*)", "i" ).exec( window.location.search );
        return result && unescape( result[1] ) || "";
    };

	/*
	 *  "$.isTablet" function tests to see if the client device is a tablet or not. 
	 *  @Param: Callback function is optional.
	 *  @Return: Boolean.
	 *  
	 *  NOTE: Please make sure that your callback function is returning true ALWAYS!
	 */
	$.isTablet = function(callback){
		
		var deviceAgent = navigator.userAgent.toLowerCase();
    	var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|chrome|safari)/);
    	
    	if(agentID != null && (agentID.indexOf("ipad")>=0 || agentID.indexOf("android")>=0)){
    		
    		if(callback != undefined){
    			//console.log("'isTablet' callback executed successfully");
    			
    			//'callback' function should always return true..
    			return callback(); //Executing the call back function at this step..
    		}
    		else{
    			return true;
    		}
    	}
    	else{
    		//do nothing..
    	}
    	
    	return false;
	};
	
//	Returns the browser details
/*	$.getBrowser = function() {
		var N=navigator.appName, ua=navigator.userAgent, tem;
		var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return M[0];
	};
	// returns the browser versions
	$.getBrowserVersion = function() {
		var N=navigator.appName, ua=navigator.userAgent, tem;
		var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return M[1];
	};*/
	
	/*
	 *  "$.fn.animatefromTop" function is used to animate object from top. 
	 *  @Object: object which needs to be animated
	 *  xTop: top of the object to be transitioned
	 *  @Param: Callback function.
	 *  
	 */
	$.fn.slideFromTop = function(xTop, timeBound, callback){
		$(this).animate({top:xTop}, timeBound, function() {
		    //callback
			if(callback){
				callback();
			}
		});
	}
	
	/*
	 *  "$.fn.onKeyboardEsc" function is perform action when ESC is pressed. 
	 *  @Param: Callback function.
	 *  
	 */
	$.onKeyboardEsc = function(callback){
		
		$(document.body).on('keyup', function(evt) {
			if(evt && evt.keyCode == 27){
				if(callback)
					callback();
				else
					return true;
			}
		});
	}

    })( jQuery );

	/*
	 * A generic method to call an ajax call 
	 * @RequiredParam: $configParams  - An object of ajax call options
	 */
	ATTSMB.Util.ajaxCall = function($configParams){
        if ( $configParams.spinner ) {
            var spinner = new $.spinner({
                image: ATTSMB.Global.contextPath + '/web/common/images/common/loader-spinner.gif',
                spinner: $configParams.spinner ? $configParams.spinner : false,
                spinnerPosition: $configParams.spinnerPosition ? $configParams.spinnerPosition : 'body'
            });
        }
	    jQuery.ajax({
	        type: $configParams.type || 'GET',
	        url: ATTSMB.Global.contextPath + $configParams.url,
	        dataType: $configParams.dataType || 'json',
	        async: $configParams.async || false,
	        scriptCharset: $configParams.scriptCharset || "utf-8",
	        data: $configParams.data || {},
	        success: $configParams.onSuccess || function() {
	            console.log(" ajax call default success ");
	        },
	        error: $configParams.onError || function(jqXHR, textStatus, errorThrown ) {
	        	
	            console.log(" Ajax call error - jqXHR:  "+jqXHR+" textStatus: "+textStatus+" errorThrown: "+errorThrown);
	        },
	        beforeSend: function (xhr) {
	            	xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
	        },
	        complete: $configParams.onComplete || function(){
	          console.log(" ajax call default complete ");
	        }
	    });
	}

/*
 * A generic method to call an ajax call
 * @RequiredParam: $configParams  - An object of ajax call options
 */
ATTSMB.Util.ajaxCallWithUrl = function($configParams){

    if ( $configParams.spinner ) {
        var spinner = new $.spinner({
            image: ATTSMB.Global.contextPath + '/web/common/images/common/loader-spinner.gif',
            spinner: $configParams.spinner ? $configParams.spinner : false,
            spinnerPosition: $configParams.spinnerPosition ? $configParams.spinnerPosition : 'body'
        });
    }
    
    var queryString = $configParams.data || {};
    queryString.dataIns = (new Date()).getTime();
    
    jQuery.ajax({
        type: $configParams.type || 'GET',
        url: $configParams.url,
        dataType: $configParams.dataType || 'json',
        async: $configParams.async || false,
        scriptCharset: $configParams.scriptCharset || "utf-8",
        data: queryString,
        success: $configParams.onSuccess || function() {
            console.log(" ajax call default success ");
        },
        error: $configParams.onError || function(jqXHR, textStatus, errorThrown ) {

            console.log(" Ajax call error - jqXHR:  "+jqXHR+" textStatus: "+textStatus+" errorThrown: "+errorThrown);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
        },
        complete: $configParams.onComplete || function(){
          console.log(" ajax call default complete ");
        }
    });
}

/*
 * This method is to convert memory string to memory number.
 * @Param: JSON Array
 * @Key: Key to sort data
 */
ATTSMB.Util.convertMemoryNumber = function(key){
    var a=1024, memoryOrder = [];
      memoryOrder["MB"] = a;
      memoryOrder["GB"] = a*a;
      memoryOrder["TB"] = a*a*a;
      
    var size = key.substring(0, key.length-2);
    var unit = key.substring(key.length-2, key.length).toUpperCase();
    
    return size*memoryOrder[unit]; 
}

/*
 * This method is to sort json array by Key.
 * @Param: JSON Array
 * @Key: Key to sort data
 */
ATTSMB.Util.sortJSONByKey = function(data, obj, key) {
	
	return data.sort(function(a, b) {
		var x,y;
		if(obj){
			  x = a[obj].dataIncluded; y = b[obj].dataIncluded;
		}else{
			x = a[key]; y = b[key];
		}

		x = ATTSMB.Util.convertMemoryNumber(x);
        y = ATTSMB.Util.convertMemoryNumber(y);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/*
 * A generic method to get URL params as array.
 */
ATTSMB.Util.urlParamsAsArray = function(){
	var vars = [], hash;
	var q = document.URL.split('#')[0];
	q = q.split('?')[1];
	
	if(q != undefined){
	    q = q.split('&');
	    for(var i = 0; i < q.length; i++){
	        hash = q[i].split('=');
	        vars.push(hash[1]);
	        vars[hash[0]] = hash[1];
	    }
	}
	
	return vars;
}

/* Ajax spinner
*
*
* */

 ;(function($) {
	 
	 

    $.spinner = function(options) {

        var plugin = this;
        plugin.settings = {};
        plugin.spinner = null;

        var defaults = {
            autoSpinner: true,
            spinnerPosition: 'body',
            html: '<div class="loading-spinner" style="z-index: 9999;position: fixed;top: 0px; width:##winWidth##px;height:##winHeight##px;background:url(##image##) center 30% ##bgcolor## no-repeat;-moz-opacity:##opacity##;filter:alpha(opacity=##opacityIE##);opacity:##opacity##;"></div>',
            image: '',
            opacity: 0.5,
            bgcolor: '#000000',
            delay: 0
        };

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);

            $(document).ajaxStart(function() {
                plugin.start();
            });

            $(document).ajaxStop(function() {
                plugin.stop();

            });

            var imgPath = plugin.settings.image;
            plugin.settings.image = new Image();
            plugin.settings.image.src = imgPath;

            $(window).resize(function() {
                resizeScroll();
            });

            $(window).scroll(function() {
                resizeScroll();
            });
        };

        plugin.start = function(options) {
            if (!plugin.spinner) {
                plugin.spinner = $(spinnerHtml()).appendTo(plugin.settings.spinnerPosition);
            }
        };

        plugin.stop = function() {
            if (plugin.spinner) {
                $(plugin.spinner).remove();
                plugin.spinner = null;
            }
        };

        var spinnerHtml = function() {
            var html = plugin.settings.html,
                    marginTop = - ( $(plugin.settings.spinnerPosition).height());

            html = html.replace(/\#\#opacity\#\#/g, plugin.settings.opacity);
            html = html.replace(/\#\#opacityIE\#\#/g, plugin.settings.opacity * 100);
            html = html.replace(/\#\#bgcolor\#\#/g, plugin.settings.bgcolor);
            html = html.replace(/\#\#image\#\#/g, plugin.settings.image.src);
/*            html = html.replace(/\#\#winHeight\#\#/g, $(plugin.settings.spinnerPosition).height());
            html = html.replace(/\#\#winWidth\#\#/g, $(plugin.settings.spinnerPosition).width());*/
            
            html = html.replace(/\#\#winHeight\#\#/g, $(window).height());
            html = html.replace(/\#\#winWidth\#\#/g, $(window).width());            
            //html = html.replace(/\#\#marginTop\#\#/g, marginTop);

            return html;
        };

        var resizeScroll = function() {
            if (plugin.spinner) {
                $(plugin.spinner).css("height", $(window).height());
            }
        };

        init();

    };

})(jQuery);
