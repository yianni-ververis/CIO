module.exports = function (gulp, plugins, project) {
    return function () {
		return gulp.src([
			'src/js/lib/main.js',
			'src/js/lib/routes.js',
			'src/js/lib/ga.js',
		])
		.pipe(plugins.eslint({configFile: 'eslint.json'}))
		.pipe(plugins.eslint.format())
		.pipe(plugins.concat('lib.js'))
		.pipe(plugins.replace(/@@ph-scriptsUrl/g, project.server.scriptsUrl))
		.pipe(plugins.replace(/@@ph-baseUrl/g, project.server.baseUrl))
		.pipe(plugins.uglify()) // Minify
		.pipe(gulp.dest(project.dist+'js/'))
	}
}