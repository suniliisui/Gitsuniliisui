function soaError() {
	$('<div />').html("<p>" + arguments[0] + "</p>").dialog({
		title: arguments[1],
		modal : true,
		buttons: [{
			id:"errorConfirm",
			text: "OK",
			click: function() {
				$(this).dialog("close");
			},
			"class": "action_call" // "class" must be in quotes or IE8 errors out
		}],
		open:function(){
			$("#errorConfirm").focus();
		},
		dialogClass : "errorDialog" 
	});
}

$("#errorConfirm").focus();