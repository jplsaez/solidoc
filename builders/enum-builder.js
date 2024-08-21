const documentationHelper = require('../helpers/documentation-helper')

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
  builder.push(`enum ${node.name} {`)
  builder.push('\n')

  const members = []

  for (const i in node.members) {
    const member = node.members[i]
    members.push(` ${member.name}`)
  }

  builder.push(members.join(',\n'))

  builder.push('\n')

  builder.push('}')
  builder.push('\n')
  builder.push('```')
  builder.push('\n')
  builder.push('\n')

  return builder.join('')
}


module.exports = { build }
