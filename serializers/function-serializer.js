const nodeHelper = require('../helpers/node-helper')
const enumerable = require('linq')
const templateHelper = require('../helpers/template-helper')
const documentationHelper = require('../helpers/documentation-helper')
const signatureBuilder = require('../builders/function-signature-builder')
const superBuilder = require('../builders/super-builder')
const referenceBuilder = require('../builders/function-reference-builder')
const argumentBuilder = require('../builders/argument-builder')
const i18n = require('../i18n')

const cleaned = (template) => {
  template = template.replace('{{FunctionTitle}}', '')
  template = template.replace('{{FunctionList}}', '')
  template = template.replace('{{AllFunctions}}', '')

  return template
}

const getCode = (node, contract) => {
  const src = node?.src
  if (!src) {
    return
  }

  const [start, length] = src.split(':')
  const body = contract.source.substr(start, length).replace(/[\r\n]\s*[\r\n]/g, '\n')

  const builder = []
  builder.push('<details>')
  builder.push('\t<summary><strong>Source Code</strong></summary>')
  builder.push('')
  builder.push('```javascript')
  builder.push(body)
  builder.push('```')

  builder.push('</details>')
  builder.push('')

  return builder.join('\n')
}

const filterName = (node) => {
	
	var _nodeName = node.name;
	var _functionName = `function ${_nodeName}`

	if(node.kind) {
		switch (node.kind) {
			case 'constructor': 
				  _nodeName = 'constructor';
				  _functionName = _nodeName;
				  break;
			case 'receive':
				_nodeName = 'receive';
				_functionName = _nodeName;
				break;
			case 'fallback':
				_nodeName = 'fallback';
				_functionName = _nodeName;
				break;
		}
	}		
	
	return { nodeName: _nodeName, functionName: _functionName }
}

const serialize = (contract, template, contracts) => {
  const allFunctions = nodeHelper.getFunctions(contract)

  const functionNodes = enumerable.from(allFunctions).where((x) => {
    return !x.isConstructor
  }).toArray()

  if (!functionNodes || !functionNodes.length) {
    return cleaned(template)
  }

  const definitionList = []
  const functionList = enumerable.from(functionNodes).select((x) => {
    const parameters = x.parameters.parameters || []
    const parameterList = []

    for (const i in parameters) {
      const parameter = parameters[i]
      const argumentName = parameter.name
      const dataType = parameter.typeDescriptions.typeString.replace('contract ', '')
      parameterList.push(`${dataType} ${argumentName}`)
    }

	filteredName = filterName(x) 

    return `- [${filteredName.nodeName}(${parameterList.join(', ')})](#${filteredName.nodeName.toLowerCase()})`
  }).toArray()

  template = template.replace('{{FunctionTitle}}', i18n.translate('Functions'))  

  for (const i in functionNodes) {
    const node = functionNodes[i]

	filteredName = filterName(node) 	

    let functionTemplate = templateHelper.FunctionTemplate
    const description = documentationHelper.getNotice(node.documentation)
    const signature = signatureBuilder.build(node, filteredName.functionName)
    const base = superBuilder.build(node, contracts)
    const references = referenceBuilder.build(node, contracts)
    const parameters = (node.parameters || {}).parameters
	const returnParameters = (node.returnParameters || {}).parameters
	
    const args = argumentBuilder.build(node.documentation, parameters, returnParameters)

	

    functionTemplate = functionTemplate.replace('{{FunctionName}}', filteredName.nodeName)
    functionTemplate = functionTemplate.replace('{{FQFunctionName}}', `${contract.contractName}.${filteredName.nodeName}`)
    functionTemplate = functionTemplate.replace('{{FunctionNameHeading}}', `### ${filteredName.nodeName}`)
    functionTemplate = functionTemplate.replace('{{Super}}', base)
    functionTemplate = functionTemplate.replace('{{References}}', references)
    functionTemplate = functionTemplate.replace('{{FunctionDescription}}', description)
    functionTemplate = functionTemplate.replace('{{FunctionCode}}', signature)
    functionTemplate = functionTemplate.replace('{{FunctionArguments}}', args)

    functionTemplate = functionTemplate.replace('{{TableHeader}}', parameters && parameters.length ? templateHelper.TableHeaderTemplate.replace(/[\r\n]\s*[\r\n]/g, '\n') : '')	
    functionTemplate = functionTemplate.replace('{{FunctionArgumentsHeading}}', parameters && parameters.length ? `**${i18n.translate('Arguments')}**` : '')

    functionTemplate = functionTemplate.replace('{{FunctionBody}}', getCode(node, contract))
	
    definitionList.push(functionTemplate)
  }

  template = template.replace('{{FunctionList}}', functionList.join('\n'))
  template = template.replace('{{AllFunctions}}', definitionList.join('\n'))
  
  return template
}

module.exports = { serialize }
