var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var ngTemplates = require('gulp-ng-templates');
var order = require('gulp-order');
var streamQueue = require('streamqueue');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat-util');
var print = require('gulp-print');

gulp.task('scripts', () => {
  var appJs = gulp.src(process.constants.scriptSrc);

  var templateJs = gulp.src(process.constants.templateSrc)
      .pipe(htmlMin({
        collapseWhitespace: true,
  			collapseBooleanAttributes: true,
  			collapseWhitespace: true,
  			removeAttributeQuotes: true,
  			removeComments: true,
  			removeEmptyAttributes: true,
  			removeRedundantAttributes: true,
  			removeScriptTypeAttributes: true,
  			removeStyleLinkTypeAttributes: true
      }))
      .pipe(ngTemplates({
        module: process.constants.ngAppName,
        standalone: false,
        path: (path, base) => {
          return "app/templates/" + path.replace(base, '');
        }
      }));

    var vendorJs = gulp.src(process.constants.vendorSrc);

    return streamQueue({ objectMode: true }, vendorJs, appJs, templateJs)
      .pipe(order([
  			'**/lodash.js',
  			'**/jquery.js',
  			'**/angular.js',
  			'**/angular*.js',
  			'**/bootstrap*.js',

        '**/global.js',
  			'**/app.js',
  			'**/router.js',

        '**/base.js',
  			'**/base/**/*.js',
  			'**/services/**/*.js',

  			'**/*.js'
      ]))
      .pipe(print())
      .pipe(concat('app.js'))
      .pipe(concat.header('"use strict";'))
  		.pipe(gulp.dest(process.constants.dest + "/js"))
  		.pipe(livereload());
});
