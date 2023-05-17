import fs from 'fs';
import chalk from 'chalk';

const accountsDirectory = 'accounts'

export function getFilePath(accountName) {
    return `${accountsDirectory}/${accountName}.json`
}

export function existsAccountFile(accountName) {
    const pathAccountFile = getFilePath(accountName)
    return fs.existsSync(pathAccountFile)
}

export function saveAccountFile(accountName) {
    if (!fs.existsSync(accountsDirectory)) {
        fs.mkdirSync(accountsDirectory)
    }

    const accountFilePath = getFilePath(accountName)

    if (fs.existsSync(accountFilePath)) {
        console.log(chalk.bgRedBright.blackBright.bold('Nome de conta indisponível! Informe um novo nome.'))
        return false
    }

    const initialAccount = {
        name: `${accountName}`,
        balance: 0
    }

    const accountData = JSON.stringify(initialAccount)
    fs.writeFileSync(accountFilePath, accountData)

    return true
}

export function readAccountFile(accountName) {
    const pathAccountFile = getFilePath(accountName)

    if (fs.existsSync(pathAccountFile)) {
        const data = fs.readFileSync(pathAccountFile, {encoding: 'utf-8'})
        const account = JSON.parse(data)
        return account
    } else {
        return false
    }
}

export function updateAccountFile(account) {
    const pathAccountFile = getFilePath(account.name)
    const data = JSON.stringify(account)
    fs.writeFileSync(pathAccountFile, data)
}