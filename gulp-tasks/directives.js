module.exports = function (gulp, plugins, project) {
	// console.log(plugins)
    return function () {
		return gulp.src([
			'src/js/directives/**/*.js',
		])
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
		.pipe(plugins.eslint({configFile: 'eslint.json'}))
		.pipe(plugins.eslint.format())
		.pipe(plugins.concat('directives.js'))
		.pipe(plugins.uglify()) // Minify
		.pipe(gulp.dest(project.dist+'js/'))
	}
}