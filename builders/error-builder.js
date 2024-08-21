const documentationHelper = require('../helpers/documentation-helper')
const i18n = require('../i18n')

const build = (nodes) => {
  if (!nodes || !nodes.length) {
    return ''
  }

  const builder = []

  builder.push(`## ${i18n.translate('Errors')}`)
  builder.push('\n')
  builder.push('\n')
  //builder.push('```js')
  //builder.push('\n')

  for (const i in nodes) {
   
    const node = nodes[i]
    const parameterList = []

    const documentation = node.documentation
  
    const headDocumentation = documentationHelper.get(documentation, 'dev')

    if (headDocumentation) {    
      builder.push(headDocumentation)
      builder.push('\n')
      builder.push('\n')
    }

    builder.push('```js')
    builder.push('\n')

    for (const i in node.parameters.parameters) {
      const parameter = node.parameters.parameters[i]
      const argumentName = parameter.name
      const dataType = parameter.typeDescriptions.typeString.replace('contract ', '')
      
      parameterList.push(`${dataType} ${argumentName}`.trim())
    }

    builder.push(`error ${node.name}(${parameterList.join(', ')});`)
    builder.push('\n')

    builder.push('```')
    builder.push('\n')
    builder.push('\n')
  }

  //builder.push('```')
  //builder.push('\n')
  //builder.push('\n')

  return builder.join('')
}

module.exports = { build }
