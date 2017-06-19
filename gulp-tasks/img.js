module.exports = function (gulp, plugins, project) {
    return function () {
			return gulp.src([
				'src/favicon.ico',
				'src/img/*'
			], {base: "src/."})
		.pipe(plugins.contribCopy())
		.pipe(gulp.dest(project.dist));
	}
}