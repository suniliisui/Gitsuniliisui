/*globals $ addStyleResourceToPageDOM getCurrentTimeMillis*/
/*
 * Usage:
 * new uploadAvatar({options});
 * 
 * Options:
 * success - success handler (function)
 * 
 * Example:
 * Upload new picture
 * $('#uploadButton').click({
 *		new uploadAvatar({
 *			success: function (picID) {
 *				// do stuff with picture ID, like inserting into form
 *			},
 *			uploadError:function(){
 *				//optional, function which will do error handling, by upload error
 *				// is called by ajax call to upload picture
 *			},
 *			cropError:function(){
 *				//optional
 *				//is called, when uploaded image is corrupted and cannot be processed
 *			},
 *			renderer:function(){
 *				//optional
 *				//is called when upload picture dialog creates the upload UI. when no renderer function is submitted
 *				// default createDialog function is called, which is saas ui.
 *			}
 *		});
 *	});
 */
var addedJcropResources = false;
var jcrop_api;
var uploader;
function uploadAvatar(opts) {
	this.modalID = 'avatarUploaderPopup'; // ID for the modal box
	this.upload_btn_id = 'uploaderUpload'; // upload button
	this.save_btn_id = 'uploaderSave'; // save button
	this.cancel_btn_id = 'uploaderCancel'; // cancel button
	this.uploadField = 'uploaderFile'; // upload field id
	this.uploadForm = 'uploaderForm'; // upload form id
	this.uploadPreview = 'uploaderPreview'; // upload preview id
	this.allowedFiles = [ 'jpg', 'gif', 'png', 'tiff', 'tif', 'bmp', 'jpeg' ];
	this.uploadUrl = '/api/dropbox/pictures' + wrapInHTMLQueryString(); // url to upload picture to
	this.pictureID = 0; // id of uploaded picture, to be cropped
	this.successHandler = opts.success; // success handler
	this.dialogWidth = 642;
	this.renderer = this.createDialog;
	this.cropImage = (opts.cropImage != undefined && opts.cropImage != null) ? opts.cropImage : true;

	if (opts.renderer) {
		this.renderer = opts.renderer;
	}
	this.uploadError = this.handleUploadError;
	if (opts.uploadError) {
		this.uploadError = opts.uploadError;
	}
	this.cropError = this.handleCropError;
	if (opts.cropError) {
		this.cropError = opts.cropError;
	}
	uploader = this;

	// add Jcrop files
	this.addJcrop(function (){
		// create the popup
		uploader.renderer();
		// bind click actions
		uploader.bindActions();
	});


	return false;
}

uploadAvatar.prototype.handleUploadError = function(message) {
	$('.formUpload').show();
	$('#' + uploader.uploadPreview).html('<div class="failed"><p>Upload failed. Please try again.</p></div>');
};

uploadAvatar.prototype.handleCropError = function() {
	$('.formUpload').show();
	$('#' + uploader.uploadPreview).html('<div class="failed"><p>Image is corrupted, cannot process file.</p></div>');
};

uploadAvatar.prototype.addJcrop = function(callback) {
	steal('/ui/apps/atmosphere/' + scriptsVersion + '/resources/thirdparty/jquery/jcrop/css/jquery.Jcrop.css')
	.then('/ui/apps/atmosphere/' + scriptsVersion + '/resources/thirdparty/jquery/jcrop/jquery.Jcrop.min.js')
	.then(callback);
	
};

uploadAvatar.prototype.bindActions = function() {
	// bind upload button
	var selfObj = this;
	$('#' + uploader.upload_btn_id).click(function(event) {
		try {
			event.preventDefault();
			var fieldval = $('#' + uploader.uploadField).val();
			if (fieldval != '') {
				var fileext = fieldval.split('.').pop();

				if ($.inArray(fileext.toLowerCase(), uploader.allowedFiles) == -1) {
					alert('Uploaded file must be a supported image format.');
					return false;
				}

				// post picture
				var submitOptions = {
					type : "POST",
					url : uploader.uploadUrl,
					iframeTarget : "#upload_iframe",
					iframe: true,
					dataType : 'text',
					success : function(responseData, textStatus, jqXHR) {
						if (responseData == '') {
							uploader.uploadError();
						} else {
							// no error, proceed to CROP
							uploader.pictureID = responseData;
							if (selfObj.cropImage) {
								uploader.startCrop();
							} else {
								uploader.closeDialog();
								if (typeof uploader.successHandler == 'function') {
									uploader.successHandler(uploader.pictureID);
								}
							}
						}
						return false;
					},
					error : function(jqXHR, textStatus, errorThrown) {
						uploader.uploadError(errorThrown);
						return false;
					},
					beforeSubmit : function() {
						uploader.showLoader();
					}
				};

				// submit the upload form
				$('#' + uploader.uploadForm).prop('method', 'POST').ajaxSubmit(submitOptions);
			}
		} catch (e) {
			uploader.uploadError("Error");
		}
		return false;
	});

	// cancel button
	$('.' + this.cancel_btn_id).bind('click', function() {
		uploader.closeDialog();
		return false;
	});

	// save button (after picture is uploaded)
	$('#' + uploader.save_btn_id).bind('click', function() {
		uploader.save();
		return false;
	});
};
uploadAvatar.prototype.startCrop = function() {
	var picSRC = '/api/dropbox/pictures/' + this.pictureID + '?size=512';
	var cropHTML = '<div class="cropper">';
	cropHTML += '<div class="cropper_main"><img src="' + picSRC + '" alt="" id="uploaderImgView" /></div>';
	cropHTML += '<div class="cropper_thumbs">';
	cropHTML += '<div class="cropper_thumb_75"><img src="' + picSRC + '" alt="" id="cropper_75" /></div>';
	cropHTML += '<div class="cropper_thumb_25"><img src="' + picSRC + '" alt="" id="cropper_25" /></div>';
	cropHTML += '</div></div>';
	$('#' + this.uploadPreview).html(cropHTML);

	// run after image is loaded
	$('img#uploaderImgView').imagesLoaded(function() {
		$(this).Jcrop({
			onChange : uploader.showPreview,
			onSelect : uploader.showPreview,
			aspectRatio : 1,
			setSelect : [ 0, 0, 512, 512 ]
		}, function() {
			jcrop_api = this;
		});

		// hide upload form, show save
		$('.formUpload').hide();
		$("#avatarUploaderPopup").dialog("option", "width", 642);
		$('.formSave').show();

		// re-center dialog
		uploader.centerDialog();
	});
};

uploadAvatar.prototype.save = function(coords) {
	var jcrop_selected = jcrop_api.tellSelect();
	var postdata = {
		x : jcrop_selected.x,
		y : jcrop_selected.y,
		w : jcrop_selected.w,
		h : jcrop_selected.h
	};

	$.ajax({
		async : false,
		type : "PUT",
		url : "/api/dropbox/pictures/" + uploader.pictureID,
		cache : false,
		data : postdata,
		dataType : 'json',
		success : function() {
			uploader.closeDialog();
			if (typeof uploader.successHandler == 'function') {
				uploader.successHandler(uploader.pictureID);
			}
		},
		beforeSend : function() {
			uploader.showLoader();
		},
		error : function() {
			console.log("error saving");
		}
	});

	return false;
};
uploadAvatar.prototype.closeDialog = function() {
	$('#' + this.modalID).dialog('close');
};
uploadAvatar.prototype.showPreview = function(coords) {
	try {
		var rx_75 = 75 / coords.w;
		var ry_75 = 75 / coords.h;
		var rx_25 = 25 / coords.w;
		var ry_25 = 25 / coords.h;
		var oriimgwidth = $('#uploaderImgView').width();
		var oriimgheight = $('#uploaderImgView').height();

		$('#cropper_75').css({
			width : Math.round(rx_75 * oriimgwidth) + 'px',
			height : Math.round(ry_75 * oriimgheight) + 'px',
			marginLeft : '-' + Math.round(rx_75 * coords.x) + 'px',
			marginTop : '-' + Math.round(ry_75 * coords.y) + 'px'
		});

		$('#cropper_25').css({
			width : Math.round(rx_25 * oriimgwidth) + 'px',
			height : Math.round(ry_25 * oriimgheight) + 'px',
			marginLeft : '-' + Math.round(rx_25 * coords.x) + 'px',
			marginTop : '-' + Math.round(ry_25 * coords.y) + 'px'
		});
	} catch (e) {
		console.log("error by croping");
	}
};
uploadAvatar.prototype.showLoader = function() {
	$('.formUpload').hide();
	$('.formSave').hide();
	$('#' + this.uploadPreview).html('<div class="loader">&nbsp;</div>');
	$('#' + this.uploadPreview).show();
	this.centerDialog();
};
uploadAvatar.prototype.centerDialog = function() {
	$('#' + this.modalID).dialog('option', 'position', [ 'center', 'center' ]);
};
uploadAvatar.prototype.createDialog = function() {
	if ($('#' + this.modalID).length > 0) {
		$('#' + this.modalID).remove();
	}
	var uploader_div = $('<div id="' + this.modalID + '"></div>');
	var uploader_html = '<h2>Upload File</h2>';
	uploader_html += '<div class="smallDialogContent">';
	uploader_html += '<div class="' + this.uploadPreview + '" id="' + this.uploadPreview + '"></div>';
	uploader_html += '<form class="formUpload" id="' + this.uploadForm + '" name="' + this.uploadForm + '" method="POST" action="' + this.uploadUrl + '" target="upload_iframe" enctype="multipart/form-data">';
	uploader_html += '<ul>';
	if (this.desc)
		uploader_html += '<li><div class="smallDialogDesc">' + this.desc + '</div></li>';
	uploader_html += '<li>';
	uploader_html += '<label for="avatarfile">Avatar File</label>';
	uploader_html += '<input id="' + this.uploadField + '" size="80" type="file" name="Profile">';
	uploader_html += '</li>';
	uploader_html += '</ul>';
	uploader_html += '<ul class="buttons">';
	uploader_html += '<li><button class="button x ' + this.cancel_btn_id + '">Cancel</button></li>';
	uploader_html += '<li><button id="' + this.upload_btn_id + '" class="action_call button plus">Upload</button></li>';
	uploader_html += '</ul>';
	uploader_html += '</form>';
	uploader_html += '<form class="formSave" id="' + this.saveForm + '" name="' + this.saveForm + '" action="/">';
	uploader_html += '<ul class="buttons">';
	uploader_html += '<li><button class="button x ' + this.cancel_btn_id + '">Cancel</button></li>';
	uploader_html += '<li><button id="' + this.save_btn_id + '" class="button action_call">Save</button></li>';
	uploader_html += '</ul>';
	uploader_html += '</form>';
	uploader_html += '<iframe src="/resources/global/upload.html?dynamic=true" class="upload_iframe" id="upload_iframe" name="upload_iframe" style="visibility:hidden;display:none"/>';
	uploader_html += '</div></div>';
	uploader_div.html(uploader_html);
	$(uploader_div).dialog({
		width : uploader.dialogWidth,
		dialogClass : 'smallDialog avatarUploader',
		modal : true
	});

	return false;
};

function getPictureUrlByIdNoSize(picId) {
	return '/api/dropbox/pictures/' + picId + '?s=' + getCurrentTimeMillis();
}

function getPictureUrlById(picId, picSize) {
	console.log("getPictureURLbyid");
	if (picSize == undefined) {
		picSize = 75;
	}
	return '/api/dropbox/pictures/' + picId + '?size=' + picSize + '&s=' + getCurrentTimeMillis();
}

$.fn.imagesLoaded = function(callback) {
	var elems = this.filter('img');
	var len = elems.length;
	var blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

	elems.bind('load.imgloaded', function() {
		if (--len <= 0 && this.src !== blank) {
			elems.unbind('load.imgloaded');
			callback.call(elems, this);
		}

	}).each(function() {
		// cached images don't fire load sometimes, so we reset src.
		if (this.complete || this.complete === undefined) {
			console.log("here");
			var src = this.src;
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			// data uri bypasses webkit log warning (thx doug jones)
			this.src = blank;
			this.src = src;
		}
	}).error(function() {
		uploader.cropError();
	});

	return this;
};
