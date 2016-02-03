var gulp = require('gulp');
var rimraf = require('gulp-rimraf');

gulp.task('clean', (cb) => {
  return gulp.src(process.constants.dest + '/**.*', { read: false })
    .pipe(rimraf({ force: true }));
});
