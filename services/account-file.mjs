import fs from 'fs';
import chalk from 'chalk';

const accountsDirectory = 'accounts'

export function getFilePath(accountName) {
    return `${accountsDirectory}/${accountName}.json`
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