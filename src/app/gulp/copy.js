var gulp = require('gulp');
var imageOp = require('gulp-image-optimization');
var livereload = require('gulp-livereload');

gulp.task('copy', ['copy-img', 'copy-index'], () => {
});

gulp.task('copy-img', () => {
  return gulp.src(process.constants.imgSrc)
    .pipe(imageOp({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
    }))
    .pipe(gulp.dest('process.constants.dest' + '/img'))
    .pipe(livereload());
});

gulp.task('copy-index', () => {
  return gulp.src(process.constants.indexSrc)
    .pipe(gulp.dest(process.constants.dest))
    .pipe(livereload());
});
