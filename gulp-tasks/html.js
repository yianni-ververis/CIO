module.exports = function (gulp, plugins, project) {
    return function () {
			return gulp.src([
				'src/js/directives/**/*.html',
				'src/views/*',
				'src/index.html'
			], {base: "src/."})			
		.pipe(plugins.replace(/@@ph-baseHref/g, project.server.baseHref))
		.pipe(plugins.replace(/@@ph-host/g, project.server.host))
		.pipe(plugins.replace(/@@ph-title/g, project.title))
		.pipe(plugins.contribCopy())
		.pipe(gulp.dest(project.dist));
	}
}