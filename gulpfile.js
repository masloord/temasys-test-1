var gulp = require('gulp')
gulp.task('serve-prod', function () {
  var history = require('connect-history-api-fallback')
  return plugins.connect.server({
    root: 'build',
    port: process.env.PORT || 5000,
    livereload: false,
    middleware: function (connect, opt) {
      return [history()]
    }
  })
})
