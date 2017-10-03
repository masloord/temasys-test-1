var gulp = require('gulp')
var connect = require('gulp-connect')
gulp.task('serve-prod', function () {
  var history = require('connect-history-api-fallback')
  return connect.server({
    root: 'build',
    port: process.env.PORT || 5000,
    livereload: false,
    middleware: function (connect, opt) {
      return [history()]
    }
  })
})
