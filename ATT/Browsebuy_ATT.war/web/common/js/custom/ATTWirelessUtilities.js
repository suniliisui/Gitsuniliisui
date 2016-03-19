var mappingFunctions = function()
{
	
	functions = this;

	this.highlightFields = function (section,obj1,obj2){
        var name = "nameText";
        var address = "addressLine3";   
        
        $.each(obj1,function(key,val){
        	
               if(functions.toLowerCase($.trim(obj1[key])) != functions.toLowerCase($.trim(obj2[key]))){
            	   lKey = functions.toLowerCase(key);
                   
                     if( lKey == "firstname" || lKey =="lastname"){

                    $("#"+section+"-"+name).addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');       
                     
                     }
                     else if ( lKey.indexOf('zipcode') >= 0 || lKey.indexOf('state') >= 0 || lKey.indexOf('city') >= 0 ){
                            $("#"+section+"-"+address).addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');
                            
                     }
                     else{
                    	 if(key == "address1"){
                           	$('#userInfoAddressLine1').addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000'); 
                           }else if(key == "address2"){
                           	$('#userInfoAddressLine2').addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');
                           }

                            //some places do not use the section in the id
                           else if(lKey == "billing_addressln1"){
                            	$('.billingInfoDetails-addressLine1').addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000'); 
                            }else if(lKey == "billing_addressln2"){
                            	$('.billingInfoDetails-addressLine2').addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');
                            }
                            else{
                            //some places use class to highlight the fields
                            $("#"+section+"-"+key).addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');
                            }
                     }
                     
               }
        });           
        setTimeout("functions.highlightTimeout()",5000);
        
	}

	this.highlightField = function(element) {
        $(element).addClass('highlightChangedFields').animate({backgroundColor: '#dff0d8'}, '3000');
        setTimeout("functions.highlightTimeout()",5000);
	}

	
	/**************************************************
	*		Handlebars Processing and Helpers
	**************************************************/

	Handlebars.registerHelper('forevery', function(context, limit, options) {
	    var ret = "";
	    if (context.length > 0) {
	        ret += "<div>";
	        for(var i=0, j=context.length; i<j; i++) {
	            ret = ret + options.fn(context[i]);
	            if ( (i+1) % limit === 0 ) {
	                ret += "</div><div>";
	            }
	        }
	        ret += "</div>";
	    }
	    return ret;
	});

	Handlebars.registerHelper("debug", function(optionalValue) {
		  console.log("Current Context");
		  console.log("====================");
		  console.log(this);
		 
		  if (optionalValue) {
		    console.log("Value");
		    console.log("====================");
		    console.log(optionalValue);
		  }
		});

	Handlebars.registerHelper("numberFormatting", function(type, number, options) {
		var formatNumber;
		switch(type)
		{
		case "imei":
			formatNumber = number.replace(/(\d{2})(\d{6})(\d{6})(\d{1})/, "$1 $2 $3 $4");
		  break;
		case "sim":
			formatNumber = number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4 $5");
			break;
		case "phone": 
			formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
			break;
		case "phoneNum": 
			formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
			break;
		case "removeSpaces":
			formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1$2$3");
			break;
		case "zipCode":
			formatNumber = number.replace(/(\d{5})(\d{4})/, "$1-$2");
			break;
		}
		return formatNumber;
	});
		
	Handlebars.registerHelper('everyNth', function(context, every, options) {
	  var fn = options.fn, inverse = options.inverse;
	  var ret = "";
	  if(context && context.length > 0) {
	    for(var i=0, j=context.length; i<j; i++) {
	      var modZero = i % every === 0;
	      ret = ret + fn(_.extend({}, context[i], {
	        isModZero: modZero,
	        isModZeroNotFirst: modZero && i > 0,
	        isLast: i === context.length - 1
	      }));
	    }
	    console.log(ret);
	  } else {
	    ret = inverse(this);
	  }
	  return ret;
	});
	
	Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	    if (arguments.length < 4) {
	        // Operator omitted, assuming "+"
	        options = rvalue;
	        rvalue = operator;
	        operator = "+";
	    }
	        
	    lvalue = parseFloat(lvalue);
	    rvalue = parseFloat(rvalue);
	        
	    return {
	        "+": lvalue + rvalue,
	        "-": lvalue - rvalue,
	        "*": lvalue * rvalue,
	        "/": lvalue / rvalue,
	        "%": lvalue % rvalue
	    }[operator];
	});

   Handlebars.registerHelper("truncNumber",function(rep) {
        var repString;
           if (rep < 1000)
	    {
	        repString = rep;
	    }
	    else if (rep < 10000)
	    {
	    	rep = String(rep);
	    	r = rep.charAt(0);
	    	s = rep.substring(1);
	        repString =  r + ',' + s;
	    }
	    else
	    {
	    	repDecimal = Math.round(rep / 100) / 10;
	        repString = repDecimal + "k";
	    }
           return repString.toString();
	   });
   
   Handlebars.registerHelper("foreach",function(arr,options) {
		if(options.inverse && !arr.length){
		return options.inverse(this);
		}

		return _.map(arr, function(item,index) {
		item.$index = index;
		item.$first = index === 0;
		item.$second = index === 1;
		item.$last = index === arr.length-1;
		return options.fn(item);
		}).join('');
		});

	Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

		var operators, result;

		if (arguments.length < 3) {
		throw new Error("Handlerbars Helper 'compare' needs 3 parameters");
		}

		if (options === undefined) {
		options = rvalue;
		rvalue = operator;
		operator = "===";
		}

		operators = {
		'==': function (l, r) { return l == r; },
		'===': function (l, r) { return l === r; },
		'!=': function (l, r) { return l != r; },
		'!==': function (l, r) { return l !== r; },
		'<': function (l, r) { return l < r; },
		'>': function (l, r) { return l > r; },
		'<=': function (l, r) { return l <= r; },
		'>=': function (l, r) { return l >= r; },
		'typeof': function (l, r) { return typeof l == r; }
		};

		if (!operators[operator]) {
		throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
		}

		result = operators[operator](lvalue, rvalue);

		if (result) {
		return options.fn(this);
		} else {
		return options.inverse(this);
		}
		});

	Handlebars.registerHelper('replace', function (value, toreplace, replacewith) {

		var result;

		if (arguments.length < 3) {
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		}

		result = value.split(toreplace).join(replacewith);

		return result;
	});
	
	Handlebars.registerHelper('insertSpace', function (value) {

		result = value.replace(/([a-z])([A-Z])/g, '$1 $2');

		return result;
	});
	
	Handlebars.registerHelper('changeCase', function(context, option) {
		var changedCase;
	    if(option == "upper"){
	    	changedCase = context.toUpperCase();
	    }
	    else if(option == "lower") {
	    	changedCase = context.toLowerCase();
	    }
	    return changedCase;

	});

	Handlebars.registerHelper('setIndex', function(value, addedValue){
		if (arguments.length == 1) {
			addedValue = 0;
		}
		
		value = parseFloat(value);
	    addedValue = parseFloat(addedValue);

	    this.index = Number(value + addedValue);
	});

	Handlebars.registerHelper('negNum', function(value, options){
		if (options === undefined) {
			options = value;
		}
		
		result = /^\-/.test(value);

		if (result) {
			return options.fn(this);
		}
		else {
			return options.inverse(this);
		}

	});
	
	Handlebars.registerHelper("convertNumToDateString", function(value, type){
		var dateReturn;
		dateValue = new Date(parseInt(value));
		
		switch(type){
		case "year":
			dateReturn = dateValue.getFullYear();
			break;
		case "month":
			month = dateValue.getMonth()+1;
			if(month < 10){
				month = "0"+ month;
			}
			dateReturn = month;
			break;
		case "date":	
			dateReturn = dateValue.getDate();
			break;
		case "fullDateString":	
			month = dateValue.getMonth()+1;
			if(month < 10){
				month = "0"+ month;
			}
			dateReturn = month+"/"+dateValue.getDate()+"/"+dateValue.getFullYear();
			break;	
	}
	
		return dateReturn;
	});
}

mappingFunctions.prototype.status = function(type){
	switch(type)
	{
	case "S":
	  status = "Suspended";
	  break;
	case "A":
		status = "Active";
	  break;
	case "C":
		status = "Cancelled";
	  break;
	 default:
		 status = "Not Available"; 
	}
	return status;
}

mappingFunctions.prototype.numberFormatting = function(type,number){
	formatNumber = "";
	switch(type)
	{
	case "imei":
		formatNumber = number.replace(/(\d{2})(\d{6})(\d{6})(\d{1})/, "$1 $2 $3 $4");
	  break;
	case "sim":
		formatNumber = number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4 $5");
		break;
	case "phone": 
		formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
		break;
	case "phoneNum": 
		formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
		break;
	case "removeSpaces":
		formatNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1$2$3");
		break;
	case "zipCode":
		formatNumber = number.replace(/(\d{5})(\d{4})/, "$1-$2");
		break;
	}
	return formatNumber;
}

mappingFunctions.prototype.upgradeAvailibility = function(yesNo){
	switch (yesNo)
	{
	case true:
		available = "Discounted Upgrade Available";
		break;
	case false:
		available = "Upgrade is not Available";
		break;
	default:
		available = "Upgrade is not Available";
	}
	return available;
}

mappingFunctions.prototype.toLowerCase = function(stringToLower){
	stringToLower = new String(stringToLower);
	return $.trim(stringToLower.toLowerCase());
}

mappingFunctions.prototype.queryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} 

mappingFunctions.prototype.highlightTimeout = function(){
	$(".highlightChangedFields").animate({backgroundColor: '#f2f2f2'}, 'slow');
}

mappingFunctions.prototype.states = function (statesId, json, newValueHidden){
		
		$('select#'+statesId).select2();
	
		var statesList = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE',
                       'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
                       'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
                       'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
                       'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA',
                       'WV', 'WI', 'WY' ];
    	 
    	 $.each(statesList, function(key, value) {   
	    	 if (json && json.address && json.address.state == value) {
	    	     $('select#'+statesId).append($('<option selected>', { value : value }).text(value));
	    	     $('select#'+statesId).append('placeholder', value).select2();
	    	 }
	    	 else {
    	     	$('select#'+statesId).append($('<option>', { value : value }).text(value)); 
	    	 }
    	 });  
    	
    	if (newValueHidden) {
    		 $('select#'+statesId).on("change", function() {
    		    var $this = $(this);
    		    $(newValueHidden).val($this.val());
    		 });
    	 }
} 

mappingFunctions.prototype.disableSection = function(id){
	var className = "." + $(id).attr('class') + " form";
	var buttonClass = "#" + $(className).attr('id') + " button";
	inputId = "."+$(id).attr('class') + " input";
	selectId = "."+$(id).attr('class') + " select";
	$(id).addClass('spinner-on');
	$(id).addClass('updating');
	   $(inputId).prop('readOnly', 'readOnly');
	   $(selectId).prop('disabled', 'disabled');
	 $(buttonClass).each(function(id,value){
		var classValue = $(value).attr('class').split(' ').join(' Inactive-');
		$(value).removeClass($(value).attr('class'));
		$(value).addClass(classValue);
		 $(value).prop('disabled', 'disabled');
		});
}

mappingFunctions.prototype.enableSection = function(id){
	$(id).removeClass('spinner-on');
	$(id).removeClass('updating');
	var className = "." + $(id).attr('class') + " form";
	var buttonClass = "#" + $(className).attr('id') + " button";
	inputId = "."+$(id).attr('class') + " input";
	selectId = "."+$(id).attr('class') + " select";
	$(inputId).prop('readOnly', '');
	$(selectId).prop('disabled', '');
	 $(buttonClass).each(function(id,value){
	  		var classValue = $(value).attr('class');
	  		var classEnable = classValue.replace("Inactive-", "")
	  		$(value).prop('disabled', '');
	  		$(value).removeClass(classValue);
	  		$(value).addClass(classEnable);
	  		});
}

mappingFunctions.prototype.validateButtons = function(className){
	var buttonValue ="";
	var buttonArray = [];
	var buttonClass = "#" + $(className).attr('id') + " button";
	
	 $(buttonClass).each(function(id,value){
		 if ( $(value).hasClass( "update-pill-button" ) ){
				buttonValue = "update-pill-button";
				
			}
			if ( $(value).hasClass( "save-pill-button" ) ){
				buttonValue = "save-pill-button";
				
			}
	  		});
	 
	buttonArray.push(buttonValue);
	return buttonArray;
}


mappingFunctions.prototype.displayErrorMessages = function(messages){
	if(messages){
		$('#messages').html('');
		if(messages.length > 1){
			$('.bold-status').html('ERRORS.');
		}
		if(messages.length >= 1){
			$.each(messages,function(){
				var item = new String(this);
					$('#messages').append(item +' ');
			});
		}else{
			$('#messages').append(' Service Not Available.');
		}
	}
}

mappingFunctions.prototype.displaySuccessSectionUpdated = function(section){
	$('#successStatus').html(' '+section+' Information Updated. You will receive an email detailing the changes.');
}

mappingFunctions.prototype.serializeForm = function(p,object,type){
		var name;
		if(type == "old"){
			 name = object.name.replace('-old','');
		}
		else{
			name = object.name;
		}
	   if (p[name]) {
           if (!p[name].push) {
               p[name] = [p[name]];
           }
           p[name].push(object.value || '');
       } else {
           p[name] = object.value || '';
       }
	
	   return p;
}
	
mappingFunctions.prototype.restrictNumbers = function(id){
	$('#'+id).keydown(function(event) {
		if(event.ctrlKey == true) {
        	//ctrl+c and ctrl+v
        	if(event.keyCode == 67 || event.keyCode == 86) {
        		return;
        	}
        }
        // Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
}

mappingFunctions.prototype.restrictAlphabet = function(id){
	$('#'+id).keydown(function(event) {
		if(event.ctrlKey == true) {
        	//ctrl+c and ctrl+v
        	if(event.keyCode == 67 || event.keyCode == 86) {
        		return;
        	}
        }
		 // Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A & Space
            (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode == 32) ||
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39))  {
                 // let it happen, don't do anything
                 return;
        }else{
		
			if(event.keyCode < 65 || event.keyCode > 90){
				event.preventDefault(); 
			}
        }	
	});
}

mappingFunctions.prototype.restrictZipCode = function(id) {	
	$('#'+id).keydown(function(event) {
		var charCode = event.keyCode;	    
        if(event.ctrlKey == true)
        {
        	//ctrl+c and ctrl+v and ctrl+a
        	if(charCode == 67 || charCode == 86 || event.keyCode == 65)
        	{
        		return;
        	}
        }
        if (charCode == 8 || //backspace
                charCode == 46 || //delete
                charCode == 13 || //enter key
                event.keyCode == 9 || // tab key
                event.keyCode == 27)   //escape key
        {
        	return;
        }
        else if (charCode >= 37 && charCode <= 40) //arrow keys
        {
        	return;
        }	        
        else if (charCode >= 48 && charCode <= 57) //0-9 on key pad
        {
        	if (event.shiftKey == true)
        		event.preventDefault();

        	return;
        }
        else if (charCode >= 96 && charCode <= 105) //0-9 on num pad
        {
        	if (event.shiftKey == true)
        		event.preventDefault();
        	return;
        }
        else if (charCode == 32 || charCode == 189) // space is allowed, minus is also allowed
        	return;
        else if (navigator.appCodeName == 'Mozilla' && charCode == 173) // minus on firefox is different ?
        	return;
        else
        	event.preventDefault();
		}
	);
}

mappingFunctions.prototype.formatPhone = function(id){
	$('#'+id).keydown(function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
             // Allow: Ctrl+A
            ((event.keyCode == 65 || event.keyCode == 67 || event.keyCode == 86)&& event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }else {
            // Ensure that it is a number and stop the keypress
           if (event.keyCode>=65 && event.keyCode<=90) {
                event.preventDefault(); 
            }   
        }
    });
}

mappingFunctions.prototype.ipadPositionFixEnable = function(){
  var deviceAgent = navigator.userAgent.toLowerCase();
	  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|chrome|safari)/);
	  if(agentID != null && agentID.indexOf("ipad")>=0){
		  $('#sticky').css('position','relative');
		 }
}

mappingFunctions.prototype.ipadPositionFixDisable = function(){
	 $('#sticky').css('position','fixed');
	}

mappingFunctions.prototype.maskSmartChipNumber = function(id,value){
	var innerText = value;
	var innerTextLength = innerText.length;
	var startLength = innerTextLength -4;
	var smartChipLastDigits = innerText.substr(startLength,innerTextLength-1);
	var maskedSmartChip = this.numberFormatting('sim',innerText);
	maskedSmartChip = this.numberFormatting('sim',maskedSmartChip);
	$("."+id).html(maskedSmartChip);
}


mappingFunctions.prototype.iePlaceHolder = function(){
	
	if(navigator.appName == "Microsoft Internet Explorer" ) { 
		var active = document.activeElement;
		$(':text').focus(function () {
			if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
				$(this).val('').removeClass('textPlaceholder');
			}
		}).blur(function () {
			if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
				$(this).val($(this).attr('placeholder')).addClass('textPlaceholder');
			}
		});
		
		//$(active).focus();
		$(':text').blur();
		$('form').submit(function () {
			$(this).find('.textPlaceholder').each(function() { $(this).val(''); });
		});
	}
}

mappingFunctions.prototype.removeiePlaceHolder = function(){
	
	if(navigator.appName == "Microsoft Internet Explorer") { 
		$(':text').blur(function () {
			if ( $(this).val() == $(this).attr('placeholder')) {
				$(this).attr('placeholder', "");
				$(this).val("").removeClass('textPlaceholder');
			}
		});
		$(':text').blur();
		
	}
}


mappingFunctions.prototype.checkMobileDevice = function(){
	isMobile = false;
	if(navigator.userAgent.indexOf('Mobile') >= 0 || navigator.userAgent.indexOf('X11') >=0 || navigator.userAgent.indexOf('Android') >=0){
		isMobile = true;
	}
	return isMobile;
}


mappingFunctions.prototype.formatSmartChipNumber = function(event,id) {
	var formatFlag = false;
	if(event == ''){
		formatFlag = true;
	}
	else if(event.type == 'keyup') {
		if (event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 16 && event.keyCode != 32) {
			formatFlag = true;
		}
	}else if(event.type == 'keydown'){
		var input = document.getElementById("smartChipId");
		var caretPosition = this.getCaretPosition(input);
		
		if(event.keyCode == 37) { // left arrow 
			if(input.value.charAt(caretPosition-1) == ' ' || input.value.charAt(caretPosition-2) == ' ') {
				this.setCaretPosition(input, caretPosition-2);
				event.preventDefault();
			}						
		}
		else if(event.keyCode == 39) { // right arrow 
			if(input.value.charAt(caretPosition) == ' ' || input.value.charAt(caretPosition+1) == ' ') {
				this.setCaretPosition(input, caretPosition+2);
				event.preventDefault();
			}
		}
		else if(event.keyCode == 8) { // back space 
			var innerText = input.value;
			var stringBefore = innerText.substring(0, caretPosition);
			var stringAfter = innerText.substring(caretPosition, innerText.length);
			
			if (stringBefore.charAt(stringBefore.length-2) == ' ') { //deleting a character before a space
				stringBefore = stringBefore.substring(0, stringBefore.length-2) + ' ';
				input.value = (stringBefore + stringAfter).replace('  ', ' ');
				this.setCaretPosition(input, caretPosition-2);
				event.preventDefault(); 
			}
			else if (stringBefore.charAt(stringBefore.length-1) == ' ') {
				input.value = (stringBefore + stringAfter).replace('  ', ' ');
				this.setCaretPosition(input, caretPosition-1); 
			}
			 
		}
		else if(event.keyCode == 46) { // delete button 
			var innerText = input.value;
			var stringBefore = innerText.substring(0, caretPosition);
			var stringAfter = innerText.substring(caretPosition, innerText.length);
			
			if (stringAfter.charAt(1) == ' ' && stringAfter.length > 2) { //deleting a character before a space
				stringAfter = stringAfter.substring(1, stringAfter.length);
				input.value = (stringBefore + stringAfter).replace('  ', ' ');
				this.setCaretPosition(input, caretPosition);
				event.preventDefault(); 
			}
			else if (stringAfter.charAt(0) == ' ' && stringAfter.length > 1) {
				input.value = (stringBefore + stringAfter).replace('  ', ' ');
				this.setCaretPosition(input, caretPosition+1); 
			}
		}
	}
	
	if(formatFlag){
		var smartField = document.getElementById(id);
		var caretPosition = this.getCaretPosition(smartField);
		var beforeText = smartField.value.substring(0, caretPosition).replace(/ /gi, '');
		var afterText = smartField.value.substring(caretPosition, smartField.value.length).replace(/ /gi, '');		
			
		var newText = (beforeText + afterText).replace(/(\d{4})/g, function(match){
        	return match + " ";
        });
		newText = $.trim(newText);
		
		var beforeTextWithSpaces = beforeText.replace(/(\d{4})/g, function(match){
        	return match + " ";
        });
		
		beforeTextWithSpaces = $.trim(beforeTextWithSpaces);
		if (beforeTextWithSpaces.length > 24) { //5 blocks of 4 with 4 spaces
			beforeTextWithSpaces = beforeTextWithSpaces.substring(0,24);
		}
		
		if (newText.length > 24) { //5 blocks of 4 with 4 spaces
			newText = newText.substring(0,24);
		}
		smartField.value = newText;
		
		this.setCaretPosition(smartField, beforeTextWithSpaces.length);
	}
	
	
}

mappingFunctions.prototype.getCaretPosition = function(oField) {
		var iCaretPos = 0;
		// IE Support
		if (document.selection) {
		var oSel = document.selection.createRange();
		oSel.moveStart ('character', -oField.value.length);
		iCaretPos = oSel.text.length;
		}
		else if (oField.selectionStart || oField.selectionStart == '0')
		iCaretPos = oField.selectionStart;

		return (iCaretPos);
}

mappingFunctions.prototype.setCaretPosition = function(oField, iCaretPos) {

 	// IE Support
 	if (document.selection) { 
		var range = oField.createTextRange();
		range.move('character', iCaretPos);
		range.select();
 	}
 	else if (oField.selectionStart || oField.selectionStart == '0') {
   		oField.selectionStart = iCaretPos;
   		oField.selectionEnd = iCaretPos;
   		oField.focus();
 	}
	}
 
mappingFunctions.prototype.getInternetExplorerVersion = function(){    
	 var rv = -1; // Return value assumes failure.    
	 if (navigator.appName == 'Microsoft Internet Explorer') {        
		 var ua = navigator.userAgent;        
		 var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
		 if (re.exec(ua) != null) {           
			 rv = parseFloat(RegExp.$1);    
		 }  	 	
	 } 
 	return rv;
 } 

mappingFunctions.prototype.processHandleBar = function(json,view,templateSource,hbTemplate){
	var hb_template;
	 if(jQuery.isEmptyObject(json)){
    		if(view.model.get(templateSource) !=''){
    			hb_template = view.model.get(templateSource);
    		
    		}else{
    			hb_source = $(hbTemplate).html();	
    			if(hb_source)
    			hb_template = Handlebars.compile(hb_source);	
    			else
    				$(view.el).html();
    		}
    	}
    	else{
 	    		if(view.model && view.model.get(templateSource) !=''){
 	    			hb_template = view.model.get(templateSource);
 	    		}
 	    		else{
 	    			hb_source = $(hbTemplate).html();
 	    			if(hb_source){
 	    				hb_template = Handlebars.compile(hb_source);
	 	    			view.model.set(templateSource,hb_template);
	 	    			
 	    			}
 			}
    	}
	 
	 if(hb_template){
			hb_result = hb_template(json);
			$(view.el).html(hb_result);
			$(view.el).removeClass('spinner-on');
		}
}
