import inquirer from "inquirer";
import chalk from "chalk";
import { initCreateAccount } from "./create-account.mjs"

const createAccountMenu = 'Criar Conta'
const consultBalanceMenu = 'Consultar Saldo'
const depositMenu = 'Depositar'
const withdrawMenu = 'Sacar'
const exitMenu = 'Sair'

export function startInitialMenu() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'accountsMenu',
                message: 'Selecione uma das opções abaixo:',
                choices: [createAccountMenu, consultBalanceMenu, depositMenu, withdrawMenu, exitMenu]
            }
        ]
    ).then(asnwer => {
        switch(asnwer.accountsMenu) {
            case createAccountMenu:
                initCreateAccount()
                break
            case consultBalanceMenu:
                console.log('Menu de consultar saldo')
                break
            case depositMenu:
                console.log('Menu de depositar dinheiro')
                break
            case withdrawMenu:
                console.log('Menu de sacar dinheiro')
                break
            case exitMenu:
                console.log(chalk.bgRedBright.blackBright.bold('Obrigado por utilizar o Accounts!'))
                process.exit()
        }
    }).catch(err => console.log(err))
}