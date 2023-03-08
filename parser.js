const path = require('path')
const fs = require('fs')
const glob = require('glob')
const pino = require('pino')

const logger = pino({
  prettyPrint: true
})

const parse = (buildDirectory, includedContracts) => {
  logger.info('Parsing %s', buildDirectory)
  const contracts = []

  logger.info('Included contracts: '+includedContracts)

  const targetContracts = includedContracts.split(",");

  const files = glob.sync(buildDirectory + '/**/*.json', {}) 

  for (let i = 0; i < files.length; i++) {	
	//var fileName = files[i].split('\\').pop().split('/').pop()	
	//fileName = fileName.substring(0, fileName.lastIndexOf('.'))
	var fileName = path.parse(files[i]).name;
	logger.info('Found file: '+fileName)
    for(let j = 0; j < targetContracts.length; j++) {
		if(targetContracts[j].trim()===fileName) {		
			const data = fs.readFileSync(files[i])
			logger.info('Parsed file: '+fileName)
			contracts.push(JSON.parse(data))
			break;
		}
	}
  }

  return contracts  
}

module.exports = {
  parse
}
