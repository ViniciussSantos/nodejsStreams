const helper = require('./helper.js')

module.exports = {
	toObject: toObject,	
	transform: transform,
	stringify: stringify
}


function chopLines(str) {
	return str.split(/[\n\r]/ig);
}

function transform(func) {
	var stream = require('stream');
	return new stream.Transform({
		readableObjectMode: true,
		writableObjectMode: true,
		transform: func
	});
}

function stringify(space) {
	return transform(function (data, encoding, callback) {
		this.push(JSON.stringify(data, null, space))
		callback()
	});
}



function _toObject(data, encoding, callback, trans) {
	var lines = chopLines(data.toString());
	if (!trans._head) {
		var head = lines.shift();
		trans._head = head;
		trans._opts.headers = head;
	}
	this.push(helper.toObjectGen(lines.join('\n'), trans._opts))
	callback()
}

function toObject(opts) {
	opts = opts || {};
	var trans = transform(function (data, encoding, callback) {
		_toObject.call(this, data, encoding, callback, trans);
	});
	trans._head = opts.headers ? opts.headers : null;
	trans._opts = opts;
	return trans;
}
