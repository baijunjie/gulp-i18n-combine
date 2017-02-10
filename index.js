const through = require('through2');
const Gutil = require('gulp-util');

module.exports = function (options) {

	const i18n = {};

	const parse = function(file, encoding, next) {

		const relativeParts = file.relative.split('/');
		const locale = relativeParts.shift(); // 语言包名
		i18n[locale] = i18n[locale] || {};

		let child = i18n[locale];
		Object.values(relativeParts).forEach((value) => {
			value = value.replace(/\.[^.]*$/, '');
			child = child[value] = child[value] || {};
		});

		Object.assign(child, JSON.parse(file.contents.toString())); // 解析为 JSON 会去除到文本中的空格与换行符

		next();
	};

	const flush = function(cb) {
		Object.keys(i18n).forEach((locale) => {
			this.push(new Gutil.File({
				path: locale + '.json',
				contents: new Buffer(JSON.stringify(i18n[locale]))
			}));
		});

		cb();
	};

	return through.obj(parse, flush);
};