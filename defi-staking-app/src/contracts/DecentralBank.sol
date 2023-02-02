pragma solidity ^0.5.0;
import './Voltex.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = "DeBank";
    address public owner;
    Tether public tether;
    Voltex public voltex;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Voltex _voltex,Tether _tether) public {
        voltex = _voltex;
        tether = _tether;
        owner = msg.sender;
    }
    // staking function
    function depositeTokens(uint _amount) public {
        require(_amount > 0, "amount should be greater then 0");
        // Transfer Investor's Tether token to Decentral Bank
        tether.transferFrom(msg.sender, address(this) , _amount);
        stakingBalance[msg.sender] += _amount; 

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // Update Staking Balance 
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
    
    // Issue rewards
    function issueTokens() public {
        // require the owner to issue token only
        require(msg.sender == owner, 'caller must be the owner');
            for (uint i=0; i<stakers.length; i++) {
                address recipient = stakers[i];
                uint balance = stakingBalance[recipient] / 9; // / 9 to create the incentive
                if (balance >0){
                voltex.transfer(recipient, balance);
                }
            }
        }
    
    //unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        // require the amount to be greater than zero
        require(balance >0,'staking balance must be greater than 0');

        //transfer the tokens to the specified contract address from DeBank

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] -= balance;

        isStaking[msg.sender] = false;


    }


  
}