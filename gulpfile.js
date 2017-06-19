var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var project = require('./project.json');

// Load Tasks
gulp.task('env', require('./gulp-tasks/environment')(gulp, plugins, project));
gulp.task('vendor', require('./gulp-tasks/vendor')(gulp, plugins, project));
gulp.task('controllers', require('./gulp-tasks/controllers')(gulp, plugins, project));
gulp.task('services', require('./gulp-tasks/services')(gulp, plugins, project));
gulp.task('directives', require('./gulp-tasks/directives')(gulp, plugins, project));
gulp.task('lib', require('./gulp-tasks/lib')(gulp, plugins, project));
gulp.task('vendor-css', require('./gulp-tasks/vendor-css')(gulp, plugins, project));
gulp.task('client-css', require('./gulp-tasks/client-css')(gulp, plugins, project));
gulp.task('html', require('./gulp-tasks/html')(gulp, plugins, project));
gulp.task('img', require('./gulp-tasks/img')(gulp, plugins, project));
gulp.task('watch', require('./gulp-tasks/watch')(gulp, plugins, project));
gulp.task('server', [
	"vendor",
	"controllers",
	"services",
	"directives",
	"lib",
	"vendor-css",
	"client-css",
	"html",
	"img"
], require('./gulp-tasks/server')(gulp, plugins, project));
gulp.task('watch', require('./gulp-tasks/watch')(gulp, plugins, project));

gulp.task('default', ['env']);