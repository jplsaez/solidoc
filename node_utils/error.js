const enumerable = require('linq')

const getErrors = (contract) => {
  let errors = []

  const nodes = contract.ast.nodes

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (node.nodeType === 'ErrorDefinition') {
      errors.push(node)
    }

    const candidates = enumerable.from(node.nodes).where(function (x) {
      return x.nodeType === 'ErrorDefinition'
    }).toArray()

    errors = errors.concat(candidates)
  }

  return errors
}

module.exports = {
  getErrors
}
