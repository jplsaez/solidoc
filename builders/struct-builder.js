const documentationHelper = require('../helpers/documentation-helper')
const enumerable = require('linq')


const build = (node) => {
  if (!node) {
    return ''
  }
  const documentation = node.documentation
  
  const headDocumentation = documentationHelper.get(documentation, 'dev')
    

  const builder = []

  builder.push(`### ${node.name}`)
  builder.push('\n')
  builder.push('\n')

  if (headDocumentation) {    
    builder.push(headDocumentation)
    builder.push('\n')
    builder.push('\n')
  }

  builder.push('```js')
  builder.push('\n')
  builder.push(`struct ${node.name} {`)
  builder.push('\n')
  
  

  const members = enumerable.from(node.members).select((x) => {
    return ` ${x.typeDescriptions.typeString} ${x.name}`
  }).toArray()

  builder.push(members.join(',' + '\n'))

  builder.push('\n')

  builder.push('}')
  builder.push('\n')
  builder.push('```')
  builder.push('\n')
  builder.push('\n')

  return builder.join('')
}

module.exports = { build }
