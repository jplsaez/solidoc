
const nodeHelper = require('../helpers/node-helper')
const errorBuilder = require('../builders/error-builder')

const serialize = (contract, template, _contracts) => {
  const builder = []

  const nodes = nodeHelper.getErrors(contract)

  if (!nodes || !nodes.length) {
    return template.replace('{{Errors}}', '')
  }

  builder.push(errorBuilder.build(nodes))

  template = template.replace('{{Errors}}', builder.join(''))

  return template
}

module.exports = { serialize }
