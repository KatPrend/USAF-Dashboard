const p2s = require('postman-to-swagger')
const yaml = require('js-yaml')
const fs = require('fs')
const postmanJson = require('./postman_collection.json')
const swaggerJson = p2s(postmanJson, {
  target_spec: "swagger2.0",
  info: {
    version: 'v1'
  }
})

//let output = JSON.stringify(swaggerJson, null, 2)
let output = yaml.safeDump(swaggerJson)

// Save to file
fs.writeFileSync(
  'swagger.yaml',
  output,
  'utf8'
)