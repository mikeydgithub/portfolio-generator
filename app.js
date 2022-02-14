const fs = require('fs'); 
const generatePage = require('./src/page-template.js')
const inquirer = require('inquirer');

const promptUser = () => {
    // destructure projects and about data from templateData based on their property key names
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: gitHubUserNameInput => {
            if (gitHubUserNameInput) {
                return true;
            } else {
                console.log('Please enter your GitHub User Name!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    }
 
    ]);
};

const promptProject = portfolioData => {
    console.log(`
==================
Add a New Project 
==================   
`);
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'about',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescriptionInput => {
                if (projectDescriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with?(Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: gitHubLinkInput => {
                if (gitHubLinkInput) {
                    return true;
                } else {
                    console.log('Please enter a link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            defualt: false
        },
        {
            type: 'confirm',
            name: 'confirmedAddProject',
            message: 'Would you like to enter another project?',
            defualt: false
        }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmedAddProject){
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });

};



promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);
             console.log('Page created! Check out index.html in this directory to see it!');
        })
    });


// The *require* statment is a built-in function thats globally available in node.js. 
// It allows the app.js file to access the fs module's functions through the 'fs' assignment.
// const fs = require('fs'); 
// code modules
// file systems modules - allows, create, and delete files on the server
// local module - which are the module you wright
// third party modules - modules you get from the web
// const generatePage = require('./src/page-template.js')

// const pageHTML = generatePage(name, github)

// (1) fs or filesyetem is creating a (2) writefile (3) creating the name of the file 'index.html' (4) data is set to pageHTML function 
// (5) passing in name and github (6) the third arguement will handle any errors as well as sucess message.
// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw (err);
    
//     console.log('Portfolio complete! Check out index.html see the output!')
// });
