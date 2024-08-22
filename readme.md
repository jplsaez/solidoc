# Solidoc: Documentation Generator for Solidity

This command-line utility creates markdown-based documentation for your Solidity project(s)

## Getting Started

```npm
npm install @jplsaez/solidoc --save-dev
```

```yarn
yarn add --dev @jplsaez/solidoc
```

**How to Use Solidoc?**

Create `solidoc.json` configuration file in your project root with the following properties:

 - pathToRoot: root path to find the "contracts" directory with the smart contracts souce code.
 - outputPath: path to store the generated documentation.
 - includedContracts: comma separated list of smart contracts to generate documentation. 

```json
{
  "pathToRoot": "./",  
  "outputPath": "./docs",
  "includedContracts": "ContractName1, ContractName2"	
}
```

Compile your contracts with Truffle. That way compiled json files will be created including AST sections (abstract syntax tree) used by solidoc to generate documentation. Note that `@author` NatSpec tag should not be used in the smart contracts source code to prevent errors in the generated AST sections. 

Finally call solidoc:

```npm
npx solidoc
```

```yarn
yarn solidoc
```

This will generate documentation to the `outputPath` directory.


## Overrides

If you wish to change bits and pieces of the documentation generated, edit `solidoc templates` on the following directory:

`solidoc/templates/`


