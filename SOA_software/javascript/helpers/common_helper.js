Handlebars.registerHelper('inputWithHelperText', function(id, name, value, styleClass, helperText) {
	var html = '<input id="{id}" name="{name}" class="{styleClass}" type="text" value="{value}" autocomplete="off">';
	if (!value) {
		styleClass = styleClass + " helperText";
	}
	return html.supplant({
		id : id,
		name : name,
		value : value || helperText,
		styleClass : styleClass
	});
});

Handlebars.registerHelper('textAreaWithHelperText', function(id, name, value, styleClass, helperText) {
	var html = '<textarea id="{id}" name="{name}" class="{styleClass}" type="text">{value}</textarea>';
	
	if (!value) {
		styleClass = styleClass + " helperText";
	}
	return html.supplant({
		id : id,
		name : name,
		value : value || helperText,
		styleClass : styleClass
	});
});

