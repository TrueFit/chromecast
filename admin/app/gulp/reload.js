var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('reload', () => {
	livereload.listen();

	gulp.watch(process.constants.scriptSrc, ['scripts']);
	gulp.watch(process.constants.templateSrc, ['scripts']);
	gulp.watch(process.constants.sassDirSrc, ['sass']);
	gulp.watch(process.constants.imgSrc, ['copy-img']);
	gulp.watch(process.constants.indexSrc, ['copy-index']);
});
