var gulp = require('gulp'),
    clean = require('gulp-clean'),
	i18n = require('./gulp-i18n-combine');

var srcPath = './src/**/zh-CN.json',
    distPath = './static/data/i18n/';

gulp.task('i18nClean', function () {
	return gulp.src(distPath, { read: false })
		.pipe(clean({ force: true }));
});

gulp.task('i18n', function () {
	return gulp.src(srcPath)
		.pipe(i18n())
		.pipe(gulp.dest(distPath));
});

// 监听文件修改
gulp.task('i18nWatch', gulp.series('i18n', function () {
	gulp.watch(srcPath, gulp.parallel('i18n'));
}));

gulp.task('default', gulp.parallel('i18nWatch'));
