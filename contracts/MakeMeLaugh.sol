//SPDX-License-Identifier: Unlicense
//SPDX-License-Identifier: Unlicense
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

contract MakeMeLaugh{
    struct jokeContent {
        uint id;
        string joke;
        uint etherSent;
    }
    jokeContent[] public jokes;
    mapping(uint => address ) public paymentWithId;
    
    constructor() {
        jokes.push(jokeContent(0, "What's the best thing about Switzerland? --- I don't know but the flag is a big plus", 0));
        paymentWithId[0]= msg.sender;
    } 
    
    
    function setJoke(string memory _yourJoke) public {
        
        jokes.push(jokeContent(jokes.length,_yourJoke,0));
        paymentWithId[jokes.length]= msg.sender;
        
    }


    function sendEther(uint _id) public payable{

    
        address temp = paymentWithId[_id];
        payable(temp).transfer(1 ether);
        jokes[_id].etherSent = jokes[_id].etherSent + 1;
    }
    function jokeLength() public view returns(uint){
        return jokes.length;
    }
 
}



