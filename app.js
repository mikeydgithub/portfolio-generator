// The *require* statment is a built-in function thats globally available in node.js. 
// It allows the app.js file to access the fs module's functions through the 'fs' assignment.
const fs = require('fs'); 
// code modules
// file systems modules - allows, create, and delete files on the server
// local module - which are the module you wright
// third party modules - modules you get from the web
const generatePage = require('./src/page-template.js')
console.log(generatePage);

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

// (1) fs or filesyetem is creating a (2) writefile (3) creating the name of the file 'index.html' (4) data is set to generatePage function 
// (5) passing in name and github (6) the third arguement will handle any errors as well as sucess message.
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error (err);
    
    console.log('Portfolio complete! Check out index.html see the output!')
});
