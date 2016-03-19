/*globals $ makeDropdownDOM logger*/

function makeDropdownEvents(el) {
	$(el).live('mouseenter', function () {
		$(this).addClass('hovered');
        $(this).find('.thedrop').show();
    });
    $(el).live('mouseleave', function () {
        $(this).removeClass('hovered');
        $(this).find('.thedrop').hide();
    });
    return true;
}

/**
 * create a dropdown
 */
function makeDropdownDOM(items) {
	// create dropdown element
    var dropdownlist = $("<ul></ul>");
	$(items).each(function (index) {
		var li = $('<li></li>'), a = $('<a>' + this.title + '</a>'), onclick;
		if (typeof this.onclick == 'function') {
			onclick = this.onclick;
			$(a).bind('click', function () {
				onclick(index, this);
				return false;
			});
		}
		a.attr('href', this.uri);
		li.append(a);
        dropdownlist.append(li);
	});
	return dropdownlist;    
}
/**
 * insert a dropdown
 */
function makeDropdown(el, items, selected) {	
	// create dropdown element
	var dropdownlist = makeDropdownDOM(items);
	// params
	el = $(el).length > 0 ? $(el) : $('#' + el);
	if ($(el).length == 0) {
		return;
	}
	selected = selected || $('<span class="selected">' + items[0].title + '</span>');
    $(el).prepend(selected).append(dropdownlist);
	dropdownlist.navPulldown({spanObj: selected});
	logger.info('Dropdown created: ' + $(el).attr('id'));
	return true;
}


