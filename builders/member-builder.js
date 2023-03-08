const enumerable = require('linq')
const i18n = require('../i18n')
const util = require('util')
const helper = require('../helpers/documentation-helper')
const escapeCellLineBreaks = x => x.replace(/(?:\r\n|\r|\n)/g, ' ')													 
const build = (nodes) => {
  if (!nodes || !nodes.length) {
    return ''
  }

  const builder = []

  builder.push(`## ${i18n.translate('ContractMembers')}`)
  builder.push('\n')  
  builder.push('\n')

  const groups = enumerable.from(nodes).groupBy((x) => {
    return x.visibility.toLowerCase()
  }).toArray()

  for (const i in groups) {
    const group = groups[i]
    const key = group.key()

    const candidates = enumerable.from(nodes).where((x) => {
      return x.visibility.toLowerCase() === key
    }).toArray()

    if (groups.length > 1) {
	  builder.push(`### ${i18n.translate('VisibilityMembers'), key}`)      
      builder.push('\n')
	  builder.push('\n')					 
    }

    for (const j in candidates) {
      const node = candidates[j]
      const constant = node.constant ? ' constant ' : ' '

      if (!node.typeDescriptions) {
        continue
      }

	  const doc = escapeCellLineBreaks(helper.getNotice(node.documentation))
      builder.push(`${node.typeDescriptions.typeString} ${node.visibility.toLowerCase()}${constant} **${node.name}**`)

	  builder.push(` => ${doc}`)    	  
      builder.push('\n')														 
      builder.push('\n')
    }

    builder.push('\n')
  }
  
  builder.push('\n')
  builder.push('\n')

  return builder.join('')
}

module.exports = { build }
