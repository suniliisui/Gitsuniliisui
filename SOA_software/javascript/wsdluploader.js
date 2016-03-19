

function wsdlUploader(opts) {
	
	this.modalID = 'wsdlUploader';
	this.wsdlUploader_stage = 1;
	// create dialog
	this.createDialog();
	this.successHandler = opts.success;

	// bind click actions
	this.bindActions();
}
wsdlUploader.prototype.bindActions = function() {
	
	_this = this;
	// bind upload button
	$('#wsdlUploaderBtn_Upload').click(function(event) {
		event.preventDefault();
		fieldval = $('#wsdlUploaderFile').val();
		if (fieldval !== '') {
			if (_this.wsdlUploader_stage != 1) {
				checkedRadio = $('#wsdlUploaderRadiolist input:checked').length;
				if (checkedRadio === 0) {
					alert('Error: No file selected');
					return false;
				}
			}
			// post file
			submitOptions = {
				type : "POST",
				url : '/api/dropbox/wsdls' +  wrapInHTMLQueryString(),
				iframeTarget : "#wsdl_upload_iframe",
				iframe: true,
				dataType : 'text',
				success : function(responseData, textStatus, jqXHR) {
					if (responseData === '' || !responseData) {
						// if error
						failmsg = (_this.wsdlUploader_stage == 1) ? 'Upload failed' : 'Failed to save';
						$('#wsdlUploaderPreview').html('<div class="failed">' + failmsg + '</div>');
						$('#wsdlUploaderForm').show();
					} else {
						// no error
						_this.uploadSuccess(responseData);
					}
					return false;
				},
				error : function(responseData) {
					_this.uploadError('Error occurred. Please try again.');
				},
				beforeSubmit : function() {
					// show loader
					_this.showLoader();
				}
			};
			// submit the upload form
			$('#wsdlUploaderForm').ajaxSubmit(submitOptions);
		}
		return false;
	});

	// cancel button
	$('.wsdlUploaderBtn_Cancel').click(function() {
		_this.closeDialog();
		return false;
	});
};

wsdlUploader.prototype.uploadError = function(errormsg) {
	$('#wsdlUploaderPreview').html('<div class="failed">' + errormsg + '</div>');
	$('#wsdlUploaderForm').show();
	$('#wsdlUploaderBtn_Upload').html('Try Again');
	$('#wsdlUploaderForm p').remove();
	$('#wsdlUploaderBtn_Upload').click(function() {
		$('#wsdlUpload').click();
		return false;
	});
};

wsdlUploader.prototype.uploadSuccess = function(filecsv) {
	if (this.wsdlUploader_stage == 1) {
		this.wsdlUploader_stage = 2;
		$('#wsdlUploaderPreview').hide();
		$('.wsdlUploaderFile').hide();
		$('#wsdlUploaderForm').show();
		$('#wsdlUploaderBtn_Upload').html($.i18n.prop('com.soa.api.addapi.wsdl.selectfile'));

		radiolist = '<ol class="radiolist" id="wsdlUploaderRadiolist">';

		radiolistWsdl = "";
		radiolistOthers = "";

		filearr = filecsv.split(',');
		for ( var i = 0; i < filearr.length; i++) {
			radiolistFile = '<li><input type="radio" name="FileName" value="' + filearr[i] + '" /> ' + filearr[i] + '</li>';

			if (filearr[i].indexOf('.wsdl', filearr[i].length - 5) !== -1) { 
				// Lists down .wsdl file extensions first
				radiolistWsdl += radiolistFile;
			} else { 
				// ..then the others
				radiolistOthers += radiolistFile;
			}
		}
		radiolist += radiolistWsdl + radiolistOthers;

		radiolist += '</ol>';
		$('#wsdlUploaderForm').prepend(radiolist);
		$('#wsdlUploaderForm').prepend('<p>' + $.i18n.prop('com.soa.api.addapi.wsdl.selectfilemsg') + ':</p>');

	} else {
		this.successHandler(filecsv);
		this.closeDialog();
	}
	this.centerDialog();
};

wsdlUploader.prototype.closeDialog = function() {
	$('#' + this.modalID).dialog('close');
};

wsdlUploader.prototype.showLoader = function() {
	$('#wsdlUploaderForm').hide();
	$('#wsdlUploaderRadiolist').hide();
	$('#wsdlUploaderPreview').html('<div class="loader">&nbsp;</div>');
	$('#wsdlUploaderPreview').show();
	this.centerDialog();
};

wsdlUploader.prototype.centerDialog = function() {
	$('#' + this.modalID).dialog('option', 'position', [ 'center', 'center' ]);
};

wsdlUploader.prototype.createDialog = function() {
	if ($('#' + this.modalID).length > 0) {
		$('#' + this.modalID).remove();
	}
	uploader_div = $('<div id="wsdlUploader"></div>');
	uploader_html = '<div class="contentHeader"><h2>Upload File</h2></div>';
	uploader_html += '<div class="smallDialogContent">';
	uploader_html += '<div class="uploaderPreview" id="wsdlUploaderPreview"></div>';
	uploader_html += '<form class="formUpload" id="wsdlUploaderForm" enctype="multipart/form-data" method="POST" target="wsdl_upload_iframe">';
	uploader_html += '<ul class="wsdlUploaderFile">';
	uploader_html += '<li>';
	uploader_html += '<label for="wsdlUploaderFile">WSDL Zip File</label>';
	uploader_html += '<input id="wsdlUploaderFile" size="50" type="file" name="File">';
	uploader_html += '</li>';
	uploader_html += '</ul>';
	uploader_html += '<ul class="buttons">';
	uploader_html += '<li><button class="button x wsdlUploaderBtn_Cancel">Cancel</button></li>';
	uploader_html += '<li><button id="wsdlUploaderBtn_Upload" class="button action_call">Upload</button></li>';
	uploader_html += '</ul>';
	uploader_html += '</form>';
	uploader_html += '<iframe src="/resources/global/upload.html?dynamic=true" class="upload_iframe" id="wsdl_upload_iframe" name="wsdl_upload_iframe" style="visibility:hidden;display:none"/>';
	uploader_html += '</div></div>';
	uploader_div.html(uploader_html);
	$(uploader_div).dialog({
		width : 500,
		dialogClass : 'smallDialog wsdlUploader',
		modal : true
	});

	return false;
};