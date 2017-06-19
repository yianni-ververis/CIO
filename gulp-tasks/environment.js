module.exports = function (gulp, plugins, project) {
    return function () {
		project.tasks = project.tasksDefault;
		if (plugins.util.env.stag) {
			project.server = project.staging;
			project.url = project.name + '/staging/';
			project.tasksDefault.push('aws');
		} else if (plugins.util.env.prod) {
			project.server = project.production;
			project.url = project.name;
			project.tasksDefault.push('aws');
		} else {
			project.server = project.local2;
			project.url = project.name;
			project.tasks.push('server');
			project.tasksDefault.push('watch');
		}
		gulp.run(project.tasksDefault)
	}
}