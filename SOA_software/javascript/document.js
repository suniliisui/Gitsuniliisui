var cms = {};

cms.getDocBase = function(defaultDocbase) {
	var uri;
	var currLocPath = isHashUsed ? document.location.href.split('#')[1] : getCurrentLocationPath();
	currLocPath = currLocPath.split("?")[0];

	var viewName = currentView.viewName;
	if (defaultDocbase && defaultDocbase != '') {
		return defaultDocbase;
	} else if (currentView.objectType == 'api' && currLocPath.indexOf("/versions") > -1 && viewName != 'versiondetails') {
		if (viewName == 'downloads' || viewName == 'legal') {
		} else {
			viewName = "documents";
		}
		return currLocPath.split("/versions")[0] + "/" + viewName;
	} else if (currentView.objectType == "signupconfirm") {
		return "/home/signup/confirm";
	} else if (viewName === 'style') {
		return "/";
	} else if (viewName === 'supportform') {
		return currLocPath;
	} else {
		return currLocPath.split("/" + viewName)[0] + "/" + viewName;
	}
};

cms.getTOCData = function(widgetInstance, viewType, docroot, isAsync, callback) {

	var rtn = null;
	var url = atmometadata.getContentAPIEndpoint(new FDN(currentView.objectId)) + docroot.replace(/content\//gi, '') + "/" + viewType + "/toc.";
	if (currentView.objectVersionId === undefined) {
		url += "json";
	} else {
		url += currentView.objectVersionId + ".json";
	}

	$.ajax({
		type : "GET",
		url : url,
		cache : false,
		dataType : 'html',
		async : isAsync ? true : false,
		success : function(data) {
			try {
				var len = data.length;
				if (data.length != null) {
					data = $.parseJSON(data);
					if ($.isFunction(callback)) {
						callback.apply(widgetInstance, [data]);
					}
				}
			} catch (e) {
				// alert('exception = ' + e);
			}
		},
		error : function(data, textStatus, errorThrown) {
			alert('Error retrieving data. data= ' + '; textStatus= ' + textStatus + '; errorThrown= ' + errorThrown);

		}
	});
};

cms.getDocRoot = function() {
	var uri = null;
	var version = null;
	var currLocPath = getCurrentLocationPath();
	if (currentView.objectType == 'api' && currLocPath.indexOf("/versions") > -1) {
		version = currLocPath.split("versions")[1].split("/")[1];
		uri = currLocPath.replace(/\#/i, '/content').split("/versions")[0];
	} else {
		uri = currLocPath.replace(/\#/i, '/content').split("/" + currentView.viewName)[0];
	}
	var dirs = uri.split("/");
	var docuri = "";
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i] != '') {
			docuri += "/" + dirs[i];
		}
	}

	return docuri;
};
cms.getDocumentLoadURL = function(viewObj, defaultFileName) {
	var url = [], path = defaultFileName, pathParts, i = 0, fileName;
	// adding /content
	url.push(atmometadata.getContentAPIEndpoint(new FDN(currentView.objectId)))

	if (viewObj.viewExt && viewObj.viewExt.length) {
		path = viewObj.viewExt;
	} else if (viewObj.querystring && viewObj.querystring.length) {
		path = viewObj.querystring;
	}

	if (path && !path.startsWith("/")) {
		if (viewObj.objectType) {
			url.push(viewObj.objectType);
		}
		if (viewObj.objectId) {
			url.push(viewObj.objectId);
		}
		if (viewObj.viewName) {
			if (viewObj.viewName === 'supportform') {
				url.push("support");
			} else {
				url.push(viewObj.viewName);
			}
		}
	}

	if (path) {
		if (path && path.lastIndexOf("/") !== -1) {
			url.push(path.substring(0, path.lastIndexOf("/")));
		}
		fileName = path.substring(path.lastIndexOf("/") + 1);
	}
	url.push(fileName || defaultFileName);
	return url.join('/');
};
cms.getCorrectedDocumentURL = function(viewObj, fileName) {
	var url = [];
	url.push('#');
	if (viewObj.objectType) {
		url.push(viewObj.objectType);
	}
	if (viewObj.objectId) {
		url.push(viewObj.objectId);
	}
	if (viewObj.objectVersionId) {
		url.push("versions");
		url.push(viewObj.objectVersionId);
	}
	if (viewObj.viewName) {
		if (viewObj.viewName === 'supportform') {
			url.push("support");
		} else {
			url.push(viewObj.viewName);
		}
	}
	if (fileName && !fileName.startsWith("/")) {
		if (viewObj.querystring && viewObj.querystring.lastIndexOf("/") !== -1) {
			url.push("?" + viewObj.querystring.substring(0, viewObj.querystring.lastIndexOf("/")) + "/" + fileName);
		} else {
			url.push("?" + fileName);
		}
	} else if (fileName) {
		url.push("?" + fileName);
	}
	return url.join('/');
};
//note: this is used to get doc url for iframe
//and also to build relative links (with filepath param)
cms.getDocUrl = function(viewObj, filepath, defaultDocument) {
	var contentUrl = [];
	// build base url base on view object
	if (viewObj.objectType) {
		contentUrl.push(viewObj.objectType);
	}
	if (viewObj.objectId) {
		contentUrl.push(viewObj.objectId);
	}
	if (viewObj.viewName) {
		if (viewObj.viewName === 'supportform') {
			contentUrl.push("support");
		} else {
			contentUrl.push(viewObj.viewName);
		}
	}

	var fileName;
	if (viewObj.viewExt) {
		// enumerate through each part until we reach a file extension. Ignore everything
		// after that
		var pathParts = viewObj.viewExt.split('/');
		for (var x in pathParts) {
			var part = pathParts[x];
			if (part.indexOf('.') > 0) {
				fileName = part;
				break;
			}
			contentUrl.push(part);
		}
	}
	if (!filepath && !fileName) {
		loadFile = viewObj.querystring ? viewObj.querystring : defaultDocument;
		contentUrl.push(loadFile);
	} else {
		contentUrl.push( filepath ? filepath : fileName);
	}

	if (filepath) {
		// build proper link url
		contentUrl.unshift('#');
	} else {
		// prepend '/content' to load content into iframe
		contentUrl.unshift(atmometadata.getContentAPIEndpoint(new FDN(currentView.objectId)));
	}
	return contentUrl.join('/');
};
//note: this is used to get doc url for iframe
//and also to build relative links (with filepath param)
cms.getFileName = function(viewObj) {
	var fileName = null;
	var filePath = (viewObj.viewExt) ? viewObj.viewExt : viewObj.querystring;
	if (filePath !== undefined) {
		// check each part, the last one first, to see if it ends with file extension
		var pathParts = filePath.split('/');
		pathParts.reverse();
		_.each(pathParts, function(part) {
			if (part.indexOf('.') > 0) {
				fileName = part;
			}
		});
	}
	return fileName;
};
