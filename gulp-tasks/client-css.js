module.exports = function (gulp, plugins, project) {
    return function () {
		return gulp.src([
			'src/css/index.css',
			'src/js/directives/**/*.css'
		])
		.pipe(plugins.concat('client.css'))
		.pipe(plugins.cssmin())
		.pipe(plugins.rename('client.min.css'))
		.pipe(gulp.dest(project.dist+'css/'));
	}
}