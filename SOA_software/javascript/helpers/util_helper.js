Handlebars.registerHelper('toLowerCase', function(value) {
    if(object) {
        return new Handlebars.SafeString(value.toLowerCase());
    } else {
        return '';
    }
});
