/*
 * This method is used to initialize form validation using jQuery validation engine
 *  @RequiredParam: formId
 */
ATTSMB.Util.initFormValidation = function(formId, customErrorMessages){
		
		//FormId is required to initialize
		if(!formId){
			console.log("ATTSMB.Util.initFormValidation - Form Id is missing");
			return;
		}
		
		var _customErrorMessages = customErrorMessages || {};
		
		$(formId).validationEngine('attach',{
            prettySelect : true,
            useSuffix: "_chosen",
			showOneMessage: false,
			maxErrorsPerField:1,
		    scroll: false,
			promptPosition : "bottomLeft",
			addSuccessCssClassToField: "validIcon", 
			addFailureCssClassToField: "errorIcon",
			calculatePromptCssInline:true,
			addSuccessCssClassAfterCorrect:true,
			custom_error_messages : _customErrorMessages

	});
}

/* 
 * Initialize plug-ins - Chosen, Radio buttons, check boxes & placeholder support
 * @RequiredParam $viewObj - Any element Id, form, div etc.
 */
ATTSMB.Util.prettifyFormFields = function($viewObj){
	
	if(!$viewObj){
		console.log("ATTSMB.Util.prettifyFormFields - Form Id is missing");
		return;
	}
	
	/* Initialize Select Boxes */
	//No prettifying for Tablets.
	if($.isTablet() != true){
				
		$viewObj.find("select").chosen({
	        disable_search_threshold: 10,
	        enable_split_word_search:false,
	        active_field: true,
	        mouse_on_container: true,
	        width: "100%"
	    } ).change( function() {
	                $(this).validationEngine('validate');
	            });
	}else{
		//This is a fix for tablets, Native select box will be shown for tablets
		$viewObj.find("select").each(function(i, item){
			$("option:first", item).text("Select");
		});
	}

	var radioBtnList = $viewObj.find("input[type='radio']")
	if(radioBtnList.length > 0){
		radioBtnList.attradio();
	
	//CATO requirements fix
	radioBtnList.on("focus", function(e){
	$(this).parent().css("outline","1px dotted");
	});

	radioBtnList.on("blur", function(e){
	$(this).parent().css("outline","none");
	});
	}
    
    //Stylize check boxes
	var checkBoxCollection = $viewObj.find("input[type='checkbox']");
	if(checkBoxCollection.length > 0)
		checkBoxCollection.attcheckbox();
    
    //Placeholder support
    if(!Modernizr.input.placeholder) {
        //Calling the placeholder plugin..
    	$viewObj.find('input[placeholder], textarea[placeholder]').filter(":visible").placeHolder();
    }
	
}

/*
 * This method is to collect all field data(id & value) to post backend info
 * @RequiredParam: formId 
 * @return: formData object
 */

ATTSMB.Util.collectFormData = function(formId){
	
	//Return if form is missing
	if(!formId) return;
	
    var formData = {};

    $("input, select", formId).each( function( index, element ) {

        if ( element.type === "radio" && $(element).is(":checked") ) {
            formData[element.name] = $(element).val();
            console.log(" id = " +  element.name + " value = " + $(element).val());
        } else if ( element.type === "checkbox" ) {
            formData[element.id] = $(element).is(":checked");
            console.log(" id = " +  element.id + " value = " + $(element).is(":checked"));
        }

        else if ( element.id ) {
            formData[element.id] = $(element).val();
            console.log(" id = " +  element.id + " value = " + $(element).val());
        }
    });

    return formData;
}

/*
 * This method is to collect all field data(name & value) to post backend info
 * @RequiredParam: formId 
 * @return: formData object
 * Notes: All form inputs should have "id" and "name" attributes defined..
 */

ATTSMB.Util.collectFormDataByName = function(formId){
	
	//Return if form is missing
	if(!formId) return;
	
    var formData = {};

    $("input:enabled, select:enabled", formId).each( function( index, element ) {

        if ( element.type === "radio" ) {
            //formData[element.name] = $(element.name).is(":checked").val();
        	
        	if($(element).is(":checked")){
        		formData[element.name] = $(element).val();
                console.log(" Radio button: name = " +  element.name + " value = " + $(element).val());
        	}
        	
        } else if ( element.type === "checkbox" ) {
            formData[element.id] = $(element).is(":checked");
            console.log(" Checkbox: id = " +  element.id + " value = " + $(element).is(":checked"));
        }

        else if ( element.id ) {
        	
        	if($("#" + element.id).length == 1){
        		formData[element.name] = $(element).val();
        		console.log(" Other element: id = " +  element.id + ". name = " + element.name + " value = " + $(element).val());
        	}else{
        		console.log("#" + element.id + " is probably duplicated..");
        	}
        }
    });

    return formData;
}

/*
 * This method is to validate all form fields
 * @RequiredParam: formId 
 * @return: boolean
 */

ATTSMB.Util.isFormDataValid = function(formId){
	//return true;
	return $( formId ).validationEngine('validate');
}


/*
 * This method is to apply mask to all eligible form fields
 * @RequiredParam: formId 
 * @return: 
 */

ATTSMB.Util.applyInputMasking = function(formId){

	$('input[data-mask-pattern]', formId).each(function( index, element ) {
		var $this = $(this), autocompleteValue;
		
		//Default autocomplete is on for all HTML input fields
		autocompleteValue = $this.attr("autocomplete") || "on";
		//Initialize masking - Plugin turns off auto complete to a field
		$this.mask($this.attr("data-mask-pattern"));
		
		//Restore autocomplete as Plugin turns off autocomplete
		$this.attr("autocomplete", autocompleteValue);
	});

}
