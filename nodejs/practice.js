const validator = require('validator')

const chalk = require('chalk')

const aname = require('./utils.js')

const bname = require('./practice_side.js')

console.log(aname)

console.log(bname('. Sure, Yes!'))


const fs = require('fs')

fs.writeFileSync('note.txt','This note is created by NodeJS!')

console.log('finished!')
fs.appendFileSync('note.txt', '\nThis is appened message!')




console.log(validator.isEmail("@gmail.com"))

console.log(chalk.red.inverse.bold("Error!!"))




