var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('sass', () => {
  return gulp.src(process.constants.sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(process.constants.dest + '/css'))
    .pipe(livereload());
});
