import inquirer from "inquirer";
import chalk from "chalk";
import { saveAccountFile } from './account-file.mjs'
import { startInitialMenu } from './account-menu.mjs'

export function initCreateAccount() {
    console.log(chalk.bgBlueBright.blackBright.bold('Obrigado por escolher nosso banco para sua conta!'))
    console.log(chalk.bgBlueBright.blackBright.bold('Siga os passos a seguir para habilitar sua conta.'))
    return effetiveCreateAccount()
}

function effetiveCreateAccount() {
    inquirer.prompt(
        [
            {
                name: 'accountName',
                message: 'Nos diga qual nome você deseja para sua conta:'
            }
        ]
    ).then(answer => {
        const isFileCreated = saveAccountFile(answer.accountName)
        if (!isFileCreated) {
            effetiveCreateAccount()
        } else {
            console.log(chalk.bgGreenBright.blackBright.bold(`Parabéns!! Sua conta ${answer.accountName} foi criada com sucesso!`))
            startInitialMenu()
        }
    }).catch(err => console.log(err))
}