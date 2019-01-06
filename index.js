const through = require('through2');
const gulpUtil = require('gulp-util');

let defaultOptions = {
	mod: 1
};

module.exports = function (options) {
	options = Object.assign({}, defaultOptions, options);

	const i18n = {};

	const parse = function(file, encoding, next) {

		let relativeParts, fileName;

		if (options.mod == 1) {
			relativeParts = file.relative.split(/[\\,/]/);
			fileName = relativeParts.pop();
		} else if (options.mod == 2)  {
			relativeParts = file.relative.replace(/\.[^.]*$/, '').split(/[\\,/]/);
			fileName = relativeParts.shift() + '.json';
		} else {
			throw new Error('options.mod Error!');
		}

		let namespace = i18n[fileName] = i18n[fileName] || {};
		relativeParts.forEach((value) => {
			namespace = namespace[value] = namespace[value] || {};
		});

		let fileContents = file.contents.toString();
		if (fileContents) {
			try {
				Object.assign(namespace, JSON.parse(fileContents)); // 解析为 JSON 会去除到文本中的空格与换行符
			} catch(err) {
				console.error('Json format error: ' + file.relative);
			}
		}

		next();
	};

	const flush = function(cb) {
		Object.keys(i18n).forEach((fileName) => {
			this.push(new gulpUtil.File({
				path: fileName,
				contents: new Buffer.from(JSON.stringify(i18n[fileName]))
			}));
		});

		cb();
	};

	return through.obj(parse, flush);
};
