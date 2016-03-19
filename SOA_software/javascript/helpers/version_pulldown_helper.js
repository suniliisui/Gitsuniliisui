/*globals $ Handlebars getUriParser jQuery makeDropdownDOM*/

Handlebars.registerHelper('version_dropdown', function (resource, versions, view) {

    var uri;
    
    var parser = getUriParser(view.objectType);
	
	var latestVersionId = (resource.LatestVersionID ? resource.LatestVersionID : resource.DefaultVersionID); //HACK until ATMO-1323 is fixed
    
    var selectedVersionId = (view.objectVersionId) ? view.objectVersionId : latestVersionId;
    
    var selectedVersion = jQuery.grep(versions, function (n, i) {
        return (n.guid.value == selectedVersionId);
    });
    
    var itemdata = [];
    $(versions).each(function () {
		var itemarr;
        uri = '#' +
        parser.constructUri({
            "objectType": view.objectType,
            "objectId": view.objectId,
            "objectVersionId": this.guid.value,
            "viewName": view.viewName
        });
        itemarr = {
			uri : uri
			, title : this.title
		};
        itemdata.push(itemarr);
    });
    //insert the currently selected version or the latest version
    var selectedVersionTitle = (selectedVersion == undefined || selectedVersion.length == 0) ? versions[0].title : selectedVersion[0].title;
    
    // generate the dropdowns	
	var div = $('<div id="versionRightBar"></div>');
	
	var selected = $('<span class="selected"></span>');
	selected.append(selectedVersionTitle);
	
	div.append(selected);
	
	var dropdown = makeDropdownDOM(itemdata);
	div.append(dropdown);

	// make a fake node so we can convert the entire
	// dom object to a string
	return $('<p></p>').append(div).html();
});
