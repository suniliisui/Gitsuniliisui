/*globals $*/
// if dataValue in array parameter matches value field of checkbox, set check to
// true
// UserWidgets - edit
function setCheckedAtrribute(dataValues) {
	if (dataValues && dataValues != null) {
		for (var i = 0; i < dataValues.length; i++) {
			var dataValue = dataValues[i];
			$('input:checkbox[value="' + dataValue + '"]')
					.attr('checked', true);
		}
	}
}