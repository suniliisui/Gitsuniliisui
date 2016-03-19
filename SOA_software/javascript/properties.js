function Properties(settings) {

	this.map = {};
	
	
	// set up settings
	var defaults = {
		name : 'Messages',
		language : '',
		path : '',
		mode : 'vars',
		cache : false,
		encoding : 'UTF-8',
		callback : null
	};
	settings = $.extend(defaults, settings);
	if (settings.language === null || settings.language === '') {
		settings.language = $.i18n.browserLang();
	}
	if (settings.language === null) {
		settings.language = '';
	}
	this.settings = settings;
	
	// 1. load base (eg, Messages.properties)
	this.loadAndParseFile(settings.path + settings.name + '.properties', '', settings);
	// 2. with language code (eg, Messages_pt.properties)
	if (settings.language.length >= 2) {
		this.loadAndParseFile(settings.path + settings.name + '_' + settings.language.substring(0, 2) + '.properties', settings.language.substring(0, 2), settings);
	}
	// 3. with language code and country code (eg, Messages_pt_PT.properties)
	if (settings.language.length >= 5) {
		this.loadAndParseFile(settings.path + settings.name + '_' + settings.language.substring(0, 5) + '.properties', settings.language.substring(0, 5), settings);
	}
	
	// call callback
	if (settings.callback) {
		settings.callback();
	}

}

/** Load and parse .properties files */
Properties.prototype.loadAndParseFile = function(filename, locale, settings) {
	
	var _this = this;
	$.ajax({
		url : filename,
		async : false,
		cache : settings.cache,
		contentType : 'text/plain;charset=' + settings.encoding,
		dataType : 'text',
		success : function(data, status) {
			_this.parseData(data, locale);
		}
	});
};

Properties.prototype.parseData = function(data, locale) {
	var parameters = data.split(/\n/);
	var regPlaceHolder = /(\{\d+\})/g;
	var regRepPlaceHolder = /\{(\d+)\}/g;
	var unicodeRE = /(\\u.{4})/ig;
	for ( var i = 0; i < parameters.length; i++) {
		parameters[i] = parameters[i].replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
		if (parameters[i].length > 0 && parameters[i].match("^#") != "#") { // skip comments
			var pair = parameters[i].split('=');
			if (pair.length > 0) {
				/** Process key & value */
				var name = unescape(pair[0]).replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
				var value = pair.length == 1 ? "" : pair[1];
				// process multi-line values
				while (value.match(/\\$/) == "\\") {
					value = value.substring(0, value.length - 1);
					value += parameters[++i].replace(/\s\s*$/, ''); // right trim
				}
				// Put values with embedded '='s back together
				for ( var s = 2; s < pair.length; s++) {
					value += '=' + pair[s];
				}
				value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim

				// handle unicode chars possibly left out
				var unicodeMatches = value.match(unicodeRE);
				if (unicodeMatches) {
					for ( var u = 0; u < unicodeMatches.length; u++) {
						value = value.replace(unicodeMatches[u], unescapeUnicode(unicodeMatches[u]));
					}
				}
				// add to map
				if (!this.map[locale]){
					this.map[locale] = {};
				}
				this.map[locale][name] = value;

			} // END: if(pair.length > 0)
		} // END: skip comments
	}
};

Properties.prototype.getRawValue = function(key, locale) {
	var localeMap = this.map[locale];
	if (localeMap === undefined) {
		return null;
	}
	var value = localeMap[key];
	if (value === undefined) {
		return null;
	}
	return value;
};

Properties.prototype.save = function(name, value, beforeSend) {
	var locale = this.settings.language;
	var localeMap = this.map[locale];
	
	if (localeMap === undefined){
		this.map[locale] = {};
	}
	
	this.map[locale][name] = this.escapeSpecialChars(value);
	
	//write out the entire properties file
	var _this = this;
	var data = '';
	_.each(this.map[locale], function(value, key){
		data = data + '\n' + key + '=' + value;
	});
	
	//save it
	var filename = this.settings.path + this.settings.name + '_' + locale + '.properties';
	$.ajax({
		type: 'POST',
		url : filename,
		async : true,
		contentType : 'application/x-www-form-urlencoded',
		data : ({type : 'text/plain', body : data}),
		beforeSend : beforeSend
	});
};

Properties.prototype.escapeSpecialChars = function(s) {
    return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
};

Properties.prototype.get = function(key) {
	
	var locale = this.settings.language;
	//Try the specific locale
	var value = this.getRawValue(key, locale.substring(0, 5));
	//Try just the language
	if (value === null) {
		value = this.getRawValue(key, locale.substring(0, 2));
	}
	//Try the default
	if (value === null) {
		value = this.getRawValue(key, '');
	}
	if (value === null) {
		return null;
	}
	var phvList;
	if (arguments.length == 2 && $.isArray(arguments[1]))
		// An array was passed as the only parameter, so assume it is the list of place holder values.
		phvList = arguments[1];

	var i;
	if (typeof (value) == 'string') {
		// Handle escape characters. Done separately from the tokenizing loop below because escape characters are
		// active in quoted strings.
		i = 0;
		while ((i = value.indexOf('\\', i)) != -1) {
			if (value.charAt(i + 1) == 't')
				value = value.substring(0, i) + '\t' + value.substring((i++) + 2); // tab
			else if (value.charAt(i + 1) == 'r')
				value = value.substring(0, i) + '\r' + value.substring((i++) + 2); // return
			else if (value.charAt(i + 1) == 'n')
				value = value.substring(0, i) + '\n' + value.substring((i++) + 2); // line feed
			else if (value.charAt(i + 1) == 'f')
				value = value.substring(0, i) + '\f' + value.substring((i++) + 2); // form feed
			else if (value.charAt(i + 1) == '\\')
				value = value.substring(0, i) + '\\' + value.substring((i++) + 2); // \
			else
				value = value.substring(0, i) + value.substring(i + 1); // Quietly drop the character
		}

		// Lazily convert the string to a list of tokens.
		var arr = [], j, index;
		i = 0;
		while (i < value.length) {
			if (value.charAt(i) == '\'') {
				// Handle quotes
				if (i == value.length - 1)
					value = value.substring(0, i); // Silently drop the trailing quote
				else if (value.charAt(i + 1) == '\'')
					value = value.substring(0, i) + value.substring(++i); // Escaped quote
				else {
					// Quoted string
					j = i + 2;
					while ((j = value.indexOf('\'', j)) != -1) {
						if (j == value.length - 1 || value.charAt(j + 1) != '\'') {
							// Found start and end quotes. Remove them
							value = value.substring(0, i) + value.substring(i + 1, j) + value.substring(j + 1);
							i = j - 1;
							break;
						} else {
							// Found a double quote, reduce to a single quote.
							value = value.substring(0, j) + value.substring(++j);
						}
					}

					if (j == -1) {
						// There is no end quote. Drop the start quote
						value = value.substring(0, i) + value.substring(i + 1);
					}
				}
			} else if (value.charAt(i) == '{') {
				// Beginning of an unquoted place holder.
				j = value.indexOf('}', i + 1);
				if (j == -1)
					i++; // No end. Process the rest of the line. Java would throw an exception
				else {
					// Add 1 to the index so that it aligns with the function arguments.
					index = parseInt(value.substring(i + 1, j), 10);
					if (!isNaN(index) && index >= 0) {
						// Put the line thus far (if it isn't empty) into the array
						var s = value.substring(0, i);
						if (s != "")
							arr.push(s);
						// Put the parameter reference into the array
						arr.push(index);
						// Start the processing over again starting from the rest of the line.
						i = 0;
						value = value.substring(j + 1);
					} else
						i = j + 1; // Invalid parameter. Leave as is.
				}
			} else
				i++;
		}

		// Put the remainder of the no-empty line into the array.
		if (value != "")
			arr.push(value);
		value = arr;

		// Make the array the value for the entry.
		$.i18n.map[key] = arr;
	}

	if (value.length === 0)
		return "";
	if (value.lengh == 1 && typeof (value[0]) == "string")
		return value[0];

	var s = "";
	for (i = 0; i < value.length; i++) {
		if (typeof (value[i]) == "string")
			s += value[i];
		// Must be a number
		else if (phvList && value[i] < phvList.length)
			s += phvList[value[i]];
		else if (!phvList && value[i] + 1 < arguments.length)
			s += arguments[value[i] + 1];
		else
			s += "{" + value[i] + "}";
	}

	return s;
};
