README
-----

# Getting Started

1. Required:

	- Qlik Sense Server
	- Node with npm installed

2. Upload Files/CIO Dashboard-dist.qvf to your server

3. Change project.json to point to your server settings and the ID of the app

4. Open up your terminal and from the CLI cd the projects root directory.

5. Install Node and Bower dependencies on your local by running the following commands:

	- npm install
	- npm install --global gulp-cli

6. Then run the following to build the app and load the local server.

	- gulp

7. You can view your files at http://localhost:3000
