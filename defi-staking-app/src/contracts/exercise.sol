// pragma solidity >= 0.5.0;

// contract exercise{

//     event Transfer(uint startTime,address _from,address  _to, uint256 amount);

//     event Approval(uint startTime,address _from,address _to, uint256 amount, uint endTime);

//     error NotEnoughBalance(uint requested, uint balance);

//     mapping(address => uint256) balanceOf;

//     mapping(address => mapping(address => uint256)) allowance;
//     // delegate third party's order
//     function safeTransferFrom(address payable _from, address payable _to , uint256 amount) public returns (bool success){
//         if(balanceOf[_from] >= amount){
//         balanceOf[_from] -= amount;
//         allowance[msg.sender][_from] -= amount;
//         balanceOf[_to] += amount;
//         allowance[msg.sender][_to] += amount;
//         // service fees
//         _from.transfer(10**14);
//         _to.transfer(10**14);
        
//         emit Transfer(block.timestamp , _from, _to, amount);
//         return true;
//             }else {
//                 revert NotEnoughBalance(amount, balanceOf[_from]);
//         }
//     }
//     // swap 
//     function TransferFrom(address _to, uint256 amount) public returns (bool success) {
//         if (balanceOf[msg.sender] >= amount){
//         balanceOf[msg.sender] -= amount;
//         allowance[msg.sender][msg.sender] += amount;
//         balanceOf[_to] += amount;
//         allowance[msg.sender][_to] += amount;
//         emit Transfer(block.timestamp, msg.sender, _to, amount);
//         return true;
//         }else {
//             revert NotEnoughBalance(amount, balanceOf[msg.sender]);
//         }
//     }

//     function approve(address payable _from, address payable _to , uint256 amount) public returns (bool success) {
//         if (allowance[msg.sender][_from] >= amount){
//         uint256 startTime = block.timestamp;
//         safeTransferFrom(_from,_to,amount);
//         emit Approval(startTime, _from, _to, amount, block.timestamp);
//         return true;
//         }else {
//             revert NotEnoughBalance(amount, balanceOf[_from]);
//         }
//     }
// }


