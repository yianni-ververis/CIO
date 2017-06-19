module.exports = function (gulp, plugins, project) {
    return function () {
		return gulp.src([
			'src/js/controllers/*.js',
		])
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
		.pipe(plugins.eslint({configFile: 'eslint.json'}))
		.pipe(plugins.eslint.format())
		.pipe(plugins.concat('controllers.js'))
		.pipe((plugins.util.env.prod || plugins.util.env.stag) ? plugins.babel({
			presets: ['es2015']
		}) : plugins.util.noop())
		.pipe(plugins.uglify())
		.pipe(gulp.dest(project.dist+'js/'))
	}
}