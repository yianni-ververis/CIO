module.exports = function (gulp, plugins, project) {
    return function () {
		return gulp.src([
			'src/js/vendor/bootstrap/dist/css/bootstrap.css',
			'src/js/vendor/animate.css/animate.css',
		])
		.pipe(plugins.concat('vendor.css'))
		.pipe(plugins.cssmin())
		.pipe(plugins.rename('vendor.min.css'))
		.pipe(gulp.dest(project.dist+'css/'));
	}
}