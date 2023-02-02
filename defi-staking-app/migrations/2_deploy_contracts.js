const Tether = artifacts.require('Tether');
const Voltex = artifacts.require('Voltex');
const DecentralBank = artifacts.require('DecentralBank');
module.exports = async function(deployer, network , accounts){
    // Deplot Tether COntract 
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()
    await deployer.deploy(Voltex)
    const voltex = await Voltex.deployed()

    await deployer.deploy(DecentralBank, voltex.address, tether.address)
    const decentralBank = await DecentralBank.deployed()
    // Transfer all Voltex tokens to Decentral Bank
    await voltex.transfer(decentralBank.address , '1000000000000000000000000')

    // Distribute 100 Tether tokens to investor
    await tether.transfer(accounts[1], '100000000000000000000')
};

