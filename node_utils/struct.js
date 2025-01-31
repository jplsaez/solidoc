const enumerable = require('linq')

const getStructs = (contract) => {
  let structs = []

  const nodes = contract.ast.nodes
 
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
  

    if (node.nodeType === 'StructDefinition') {      
      structs.push(node)
    }

    const candidates = enumerable.from(node.nodes).where(function (x) {
      return x.nodeType === 'StructDefinition'
    }).toArray()

    structs = structs.concat(candidates)
  }

  return structs
}

module.exports = {
  getStructs
}
