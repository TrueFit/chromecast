process.constants = {
  dest: '../release',

  scriptSrc: 'js/**/*.js',
  templateSrc: 'templates/**/*.html',
  vendorSrc: [
    "bower_components/lodash/lodash.js",
    "bower_components/jquery/dist/jquery.js",

    "bower_components/angular/angular.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/angular-cookies/angular-cookies.js",

    "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js"
  ],

  sassDirSrc: 'css/**/*.scss',
  sassSrc: 'css/style.scss',

  imgSrc: 'img/**/*.*',
  indexSrc: 'index.html',

  ngAppName: 'app'
}
