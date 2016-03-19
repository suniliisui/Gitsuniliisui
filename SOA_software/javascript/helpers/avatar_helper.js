/*globals $ Handlebars atmometadata */

Handlebars.registerHelper('avatar', function (guid) {
	return atmometadata.getUserPictureEndpoint(guid);
});