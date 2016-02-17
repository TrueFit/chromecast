// Load Tasks
var requireDir = require('require-dir');
requireDir('./gulp');

// Main Gulp Task
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', () => {
  runSequence('clean', 'build', 'reload');
});

gulp.task('build', ['scripts', 'sass', 'copy'], () => {
});
