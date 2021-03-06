function Helper() {

}

Helper.prototype.isEmpty = isEmpty;

function isEmpty(obj) {
	// Speed up calls to hasOwnProperty
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// null and undefined are "empty"
	if (obj === null || obj === undefined) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}

module.exports = new Helper();