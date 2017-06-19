module.exports = function (gulp, plugins, project) {
    return function () {
		return gulp.src([
			'src/js/services/*.js'
		])
		.pipe(plugins.eslint({configFile: 'eslint.json'}))
		.pipe(plugins.eslint.format())
		.pipe(plugins.concat('services.js'))
		.pipe(plugins.replace(/@@ph-version/g, project.version))
		.pipe(plugins.replace(/@@ph-host/g, project.server.host))
		.pipe(plugins.replace(/@@ph-port/g, project.server.port))
		.pipe(plugins.replace(/@@ph-prefix/g, project.server.prefix))
		.pipe(plugins.replace(/@@ph-isSecure/g, project.server.isSecure))
		.pipe(plugins.replace(/@@ph-id/g, project.server.id))
		.pipe(plugins.replace(/@@ps-ga/g, project.ga))
		.pipe(plugins.uglify()) // Minify
		.pipe(gulp.dest(project.dist+'js/'))
	}
}