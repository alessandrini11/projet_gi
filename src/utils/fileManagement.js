const fs = require('fs')
const path = require('path')

const clearFile = fileName => {
    try {
        fs.unlinkSync('./public/files/'+ fileName)
    } catch(error) {
        console.log(error)
    }
}

const clearOldFiles = (fileArray) => {
    fileArray.map(file => {
        clearFile(file._doc.nom)
    })
}

const clearOldFileAndGetNewFile = (oldFilePath, newFilePath) => {
    clearFile(oldFilePath)
}

module.exports = {
    clearOldFileAndGetNewFile,
    clearFile,
    clearOldFiles
}