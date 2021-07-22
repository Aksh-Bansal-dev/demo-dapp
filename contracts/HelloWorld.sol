// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    uint[] public data;
    
    struct User{
        uint id;
        string name;
    }
    User[] public users;
    uint public curId = 1;
    
    
    function createUser(string memory name) public {
        users.push(User(curId, name));
        curId+=1;
    } 
    
    function getUser(uint id) view public returns(uint, string memory){
        uint i = findUser(id);
        if(i>=users.length){
            return (0, "");
        }
      
        return (id, users[i].name);
       
    }
    
    function updateUser(uint id, string memory name) public {
        uint i = findUser(id);
        if(i>=users.length){
            return ;
        }
        users[i].name = name;
         
    }
    
    function deleteUser(uint id) public {

        uint i = findUser(id);
        
         if(i>=users.length){
            return ;
        }

        users[i].id = 0;
        users[i].name = "";
     
    }
    
    function findUser(uint id) view internal returns(uint){
        for(uint i=0;i<users.length;i++){
            if(users[i].id==id){
                return i;
            }
        }
        revert("User does not exist");
    }
    
    function getAll() view public returns(uint[] memory){
        return data;
    }
    
    function getIdx(uint idx) view public returns(uint){
        return data[idx];
    }
    
    function addItem(uint _data) public {
        data.push(_data);
    }
    
    function length() view public returns(uint){
        return data.length;
    }
    
    
    function print(string memory s) pure public returns(string memory){
        return s;
    }
    
    
    function hello() pure public returns(string memory) {
        return "Hello World";
    }
}