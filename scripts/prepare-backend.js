"use strict"

const fs = require('fs')
const path = require('path')

const backendDir = path.join(__dirname, '..', 'backend')
fs.mkdirSync(backendDir, { recursive: true })

console.log(`Backend folder ready at: ${backendDir}`)
