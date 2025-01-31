const enumerable = require('linq')

const getEnumerators = (contract) => {
  let enums = []

  const nodes = contract.ast.nodes
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (node.nodeType === 'EnumDefinition') {
      enums.push(node)
    }

    const candidates = enumerable.from(node.nodes).where(function (x) {
      return x.nodeType === 'EnumDefinition'
    }).toArray()

    enums = enums.concat(candidates)
  }

  return enums
}

module.exports = {
  getEnumerators
}
