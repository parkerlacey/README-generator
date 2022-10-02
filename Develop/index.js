// TODO: Include packages needed for this application

const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');


// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Welcome to the README generator! To start, please provide your full name',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name! Give yourself credit for your work.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your Github username:',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please link your github repo so users know where to find more of your work!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address',
    validate: emailInput => {
      if (emailInput) {
        return true;
      } else {
        console.log('If anyone has questions about your project, you must provide a way for them to contact you.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Every project must have a title. Please try again.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter your project description here:',
    validate: descriptionInput => {
      if (descriptionInput) {
        return true;
      } else {
        console.log('Every project must have a title. Please try again.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Instructions for usage:',
    validate: usageInput => {
      if (usageInput) {
        return true;
      } else {
        console.log('Providing instructions for usage will help user properly navigate your project. Please try again.');
      }
    }
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to this project?',
    validate: contributionInput => {
      if (contributionInput) {
        return true;
      } else {
        console.log('Please provide instructions on how others can contribute to your project.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmLicenses',
    message: 'Would you like to include a license?',
    default: false
  },
  {
    type: 'list',
    name: 'licenses',
    message: 'What license would you like to include?',
    choices: ['MIT', 'GPL', 'CC--0'],
    when: ({ confirmLicenses }) => {
      if (confirmLicenses) {
        return true;
      } else {
        return false;
      }
    }
  }
];

// TODO: Create a function to write README file
const writeToFile = data =>  {
  return new Promise((resolve, reject) => {
    fs.writeFile('./utils/README.md', data, err => {
      if (err) {
        reject (err);
        return
      } 
      resolve({
        ok: true,
        message: console.log('Success! Navigate to the "utils" folder to see your README.md!')
      });
    })
  })
}

// TODO: Create a function to initialize app
function init() {
  return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userInput => {
  return generateMarkdown(userInput);
})
.then(readmeInfo => {
  return writeToFile(readmeInfo);
})
.catch(err => {
  console.log(err);
})
