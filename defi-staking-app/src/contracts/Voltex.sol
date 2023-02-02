pragma solidity ^0.5.0;


contract Voltex {
    string public name = "Voltex";
    string public symbol = "VTX";
    uint256 public totalSupply = 10 ** 24;
    uint8 decimals = 18;
    address public Minter;
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;


    constructor() public {
        Minter = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(address _to , uint256 _value) public returns (bool success) {
        //require that value is grater or equal for transfer
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and subtract the balance
        balanceOf[msg.sender] -= _value;
        // add the balance 
        balanceOf[_to] += _value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
    
    function approve(address _spender , uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(balanceOf[_from] >= _value);
        require(allowance[msg.sender][_from] >= _value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from,_to,_value);
        return true;
    }

}



