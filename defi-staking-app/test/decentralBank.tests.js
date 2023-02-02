const Tether = artifacts.require('Tether');
const Voltex = artifacts.require('Voltex');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('decentralBank',([owner, customer]) => {
    let tether , voltex , decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Load Contracts
         tether = await Tether.new()
         voltex = await Voltex.new()
         decentralBank = await DecentralBank.new(voltex.address, tether.address)

         // Transfer
         await voltex.transfer(decentralBank.address, tokens('1000000'))
         // Transfer 100 tethers to custormer
         await tether.transfer(customer, tokens('100'), {from:owner})

    })
    // All of the code goes here for testing
        describe('Mock Tether Deployment', async () => {
            it('matches name successfully', async () => {
                const name = await tether.name()
                assert.equal(name, 'Tether')
            })
        })
        describe('Voltex Deployment', async () => {
            it('matches name and adress successfully', async () => {
                const name = await voltex.name()
                assert.equal(name, 'Voltex')
            })
        })
        describe('Decentral Bank Deployment', async () => {
            it('matches name and adress successfully', async () => {
                const name = await decentralBank.name()
                assert.equal(name, 'DeBank')
            })

            it('DeBank has tokens', async () => {
                let balance = await voltex.balanceOf(decentralBank.address)
                assert.equal(balance, tokens('1000000'))
            })

            describe('Yield Farming', async () => {
                it('rewards voltex for staking',async () => {
                    let result , balance , hasStaked , isStaking
                    
                    // Check investor balance
                    result = await tether.balanceOf(customer)
                    assert.equal(result.toString(), tokens('100'), 'customer balance before staking')
                    
                    // Check Staking for Customer
                    await tether.approve(decentralBank.address, tokens('100'), {from: customer})
                    await decentralBank.depositeTokens(tokens('100'), {from: customer})
                    
                    // Check Updated Balance of Customer
                    result = await tether.balanceOf(customer);
                    assert.equal(result.toString(), tokens('0'), 'customer balance before staking')
                    // Check Updated Balance of decentral Bank
                    balance = await tether.balanceOf(decentralBank.address);
                    // balance  = await decentralBank.stakingBalance(customer);
                    assert.equal(balance.toString(), tokens('100'), 'Decentral Bank balance After customer staking');
                    
                    hasStaked = await decentralBank.hasStaked(customer);
                    assert.equal(hasStaked.toString(),'true' , "Has staked");
                    isStaking = await decentralBank.isStaking(customer);
                    assert.equal(isStaking.toString(), 'true' , "is staking");
                    // Issue Tokens
                    await decentralBank.issueTokens({from:owner});
                    // Ensure Only The Owner Can Issue Tokens
                    await decentralBank.issueTokens({from:customer}).should.be.rejected;

                    // Unstake Token
                    await decentralBank.unstakeTokens({from:customer});

                    // Check Unstaking Balances
                    result = await tether.balanceOf(customer);
                    assert.equal(result.toString(), tokens('100'), 'customer balance after Unstaking')
                    // Check Updated Balance of decentral Bank
                    balance = await tether.balanceOf(decentralBank.address);
                    // balance  = await decentralBank.stakingBalance(customer);
                    assert.equal(balance.toString(), tokens('0'), 'Decentral Bank balance After customer Unstaking');
                    isStaking = await decentralBank.isStaking(customer);
                    assert.equal(isStaking.toString(), 'false' , "customer is no longer staking");
                    
                })
            })
        })
})