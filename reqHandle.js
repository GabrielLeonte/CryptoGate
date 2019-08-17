const fs = require('fs');
const utils = require('./utils');


// Define type every type of loading.
const get = "./routes/get/";
const post = "./routes/post/";
const socket = "./events/";


// Handling the routes loading process and events loading process.
exports.handle = function (app) {
	load(get, "GET", app); // Load GET routes.
	load(post, "POST", app); // Load POST routes.
	load(socket, "SOCKET.IO", app); // Load SOCKET.IO events.

}


// Loading Function called into handle. 
function load(type, name, app) {
	fs.readdir(type, (err, files) => {  // Create an array with every available route/event for the requested type.
		if (err) {
			utils.error(err);
		} else if (files.length != 0) {
			switch (name) {
				case "GET": // Case for GET routes.
					utils.print(`Loading HTTP GET Routes...`);
					LoadIntoApp("GET", files, app);
					break;
				case "POST": // Case for POST routes.
					utils.print(`Loading HTTP POST Routes...`);
					LoadIntoApp("POST", files, app);
					break;
				case "SOCKET.IO": // Case for Socket.IO events.
					utils.print(`Loading SOCKET.IO Routes...`);
					LoadIntoApp("SOCKET.IO", files);
					break;
				default: // The default case which is not doing anything :D 
					break; // Actually... it is going out from switch if something is found wrong :D
			}
		} else {
			utils.print(`No ${name.toUpperCase()} routes was loaded.`)
		}
	});
}


// Function to load into app every route/event.
function LoadIntoApp(type, files, app) {
	switch (type) {
		case "GET": // Case for GET routes.                                                            
			files.forEach(element => {
				let loadedFunction = require(`${get}/${element}`);
				app.get(`/${element.replace(".js", "")}`, loadedFunction); // Create GET route for current element.
				utils.print(`Route /${element.replace(".js", "")} loaded successfuly as GET method.`);
			});
			break;
		case "POST": // Case for POST routes.
			files.forEach(element => {
				let loadedFunction = require(`${post}/${element}`);
				app.post(`/${element.replace(".js", "")}`, loadedFunction); // Create POST route for current element.
				utils.print(`Route /${element.replace(".js", "")} loaded successfuly as POST method.`);
			});
			break;
		case "SOCKET.IO": // Case for Socket.Io events.
			utils.print("SOCKET.IO events are not loaded because they are still WIP!");
			break;
		default: // The default case which is not doing anything :D 
			break; // Actually... it is going out from switch if something is found wrong :D
	}
}