import inquirer from "inquirer";
import chalk from "chalk";
import { saveAccountFile, updateAccountFile } from './account-file.mjs'
import { startInitialMenu } from './account-menu.mjs'
import { readAccountFile } from './account-file.mjs'

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

export function consultBalance() {
    inquirer.prompt(
        [
            {
                name: 'accountName',
                message: 'Informe o nome da conta:'
            }
        ]
    ).then(answer => {
        const account = readAccountFile(answer.accountName)
        if (!account) {
            console.log(chalk.bgRedBright.blackBright.bold('Conta informada não encontrada. Tente novamente!'))
        } else {
            console.log(chalk.bgGreenBright.blackBright.bold(`Saldo atual da conta: ${account.balance} reais.`))
        }
        return startInitialMenu()
    }).catch(error => console.log(error))
}

export function initDeposit() {
    inquirer.prompt(
        [
            {
                name: 'accountName',
                message: 'Informe o nome da conta:'
            }
        ]
    ).then(answer => {
        const account = readAccountFile(answer.accountName)
        if (!account) {
            console.log(chalk.bgRedBright.blackBright.bold('Conta informada não existe! Tente novamente!'))
            return startInitialMenu()
        } 
        deposit(account)
    }).catch(error => console.log(error))
}

function deposit(account) {
    inquirer.prompt(
        [
            {
                name: 'depositAmount',
                message: 'Informe a quantia que deseja depositar na conta:'
            }
        ]
    ).then(answer => {
        if (!validateAmount(answer.depositAmount)) {
            return deposit()
        }

        account.balance = parseFloat(account.balance) + parseFloat(answer.depositAmount)
        updateAccountFile(account)
        
        console.log(chalk.bgGreenBright.blackBright.bold('Depósito realizado com sucesso!'))
        console.log(chalk.bgGreenBright.blackBright.bold(`Seu novo saldo é de: ${account.balance} reais`))
        
        return startInitialMenu()
    }).catch(error => console.log(error))
}

function validateAmount(amount) {
    if (amount === null || amount === '') {
        console.log(chalk.bgRedBright.blackBright.bold('Informe uma quantia para continuar.'))
        return false
    }

    if (isNaN(amount)) {
        console.log(chalk.bgRedBright.blackBright.bold('Não é permitido caracteres, somente números. Tente novamente!'))
        return false
    }

    if (parseFloat(amount) < 0) {
        console.log(chalk.bgRedBright.blackBright.bold('Valores negativos não são permitidos! Tente novamente!'))
        return false
    }
    
    return true
}