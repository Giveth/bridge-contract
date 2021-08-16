const generateClass = require('@giveth/eth-contract-class').default;

const contracts = {};

[
  'FailClosedVault.json',
  'ForeignGivethBridge.json',
  'GivethBridge.json',
  'IForeignGivethBridge.json',
  'Pausable.json',
  'Vault.json',
].forEach(file => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const { contractName, compilerOutput } = require(`../contracts/${file}`);

  if (compilerOutput.abi && compilerOutput.evm.bytecode.object.length > 0) {
    contracts[contractName] = generateClass(
      compilerOutput.abi,
      `0x${compilerOutput.evm.bytecode.object}`,
    );
  }
});

module.exports = contracts;
