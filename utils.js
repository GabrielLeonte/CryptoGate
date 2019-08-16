const chalk = require('chalk');

module.exports = {
    print(data) {
        return console.log(chalk.gray(new Date().toLocaleTimeString() + ' - ' ) + data) // Return an output with current time and custom data.
    },
    error(data){
        return console.log(chalk.gray(new Date().toLocaleTimeString() + ' - ' ) + chalk.red(data)) // Return an output with current time and the error message.
    }

}