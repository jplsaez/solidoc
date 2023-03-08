# Solidoc: Documentation Generator for Solidity

This command-line utility creates markdown-based documentation for your Solidity project(s) for the following platforms:

* Ethereum
* Ethereum Classic
* Tron
* Qtum
* Wanchain
* Aeternity
* Counterparty
* Rootstock
* Ubiq
* Monax


## Getting Started

```npm
npm install @jplsaez/solidoc
```

**How to Use Solidoc?**

Create `solidoc.json` configuration file in your project root.

```json
{
  "pathToRoot": "./",
  "outputPath": "./docs",
  "noCompilation": false,
  "compiler": "truffle compile",
  "language": "en",  
  "includedContracts": "ContractName1, ContractName2"	
}
```

and then call 

```npm
solidoc
```
This will generate documentation to the `docs` directory.

**Another option**: edit package.json

```json
  "scripts": {
    "docgen": "solidoc"
  }
```

and run

```npm
npm run docgen
```

**Note**

Do not use recompilation (third argument) if you are using this on a non truffle project.


## Overrides

If you wish to change bits and pieces of the documentation generated, place `solidoc templates` on the following directory:

`solidoc/templates/`

[Solidoc Templates](templates)


You can also override language literals by copying and editing `i18n` files on the following path:

`solidoc/i18n/`
