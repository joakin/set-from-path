
exports.set = setInPath.bind(null, false);
exports.setp = setInPath.bind(null, true);

function setInPath(createEmpty, path, value, obj) {
	var ks = path.split('.');
	var i = 0;
	var tmp = obj;
	while (i < ks.length - 1) {
		var next = tmp[ks[i]];
		if (typeof next !== 'object') {
			if (createEmpty) tmp[ks[i]] = next = {};
			else throw new Error('Couldn\'t set ' + path + ' in '+ JSON.stringify(obj));
		}
		tmp = next;
		i++;
	}
	tmp[ks[i]] = value;
	return obj;
}

exports.get = function(path, obj) {
	var ks = path.split('.');
	var i = 0;
	var tmp = obj;
	while (i < ks.length - 1) {
		var next = tmp[ks[i]];
		if (typeof next !== 'object') return null;
		tmp = next;
		i++;
	}
  return tmp[ks[i]];
}

