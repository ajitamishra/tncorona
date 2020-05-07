pragma solidity >=0.5.12;


contract Corona {
    mapping(string => string[]) users;
    string[] partyA;
    string[] partyB;
    bool decisionA;
    bool decisionB;
    address A = 0x249cC999Cc542913Bb71DD26A13c38d5Af316F55;
    address B = 0xED59DEb6E99eB382c0F3f68a7eD2e9616995e4B3;
    address C = 0x08159690689aDD3045e494DD07b7C77D7c2355bC;

    // address A;
    // address B;
    // address C;

    // constructor(address _A, address _B, address _C) public {
    //     A = _A;
    //     B = _B;
    //     C = _C;
    // }

    function getDataHash(string memory key)
        public
        view
        returns (string memory)
    {
        return users[key][0];
    }

    function getFileHash(string memory key)
        public
        view
        returns (string memory)
    {
        return users[key][1];
    }

    function setDataHash(string memory hashId, string memory key) public {
        users[key].push(hashId);
    }

    function setFileHash(string memory hashId, string memory key) public {
        users[key][1] = hashId;
    }

    function setpartyA(string memory key) public {
        partyA.push(key);
    }

    function getpartyA() public view returns (string memory) {
        return partyA[partyA.length - 1];
    }

    function verdictA(bool decision) public {
        decisionA = decision;
    }

    function setpartyB(string memory key) public {
        partyB.push(key);
    }

    function getpartyB() public view returns (string memory) {
        return partyB[partyB.length - 1];
    }

    function verdictB(bool decision) public {
        decisionB = decision;
    }

    function verdictC() public view returns (bool) {
        return (decisionA == decisionB);
    }
}
