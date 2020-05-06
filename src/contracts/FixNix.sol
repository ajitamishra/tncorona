pragma solidity 0.5.16;


contract FixNix {
    mapping(uint256 => string) public user_data;
    mapping(uint256 => string) public user_file;
    mapping(uint256 => string) public user_state;

    address private all_user_address;
    address private investigator_address;
    address private reviewer_address;
    address private analyst_address;

    constructor(
        address _all_user,
        address _investigator,
        address _reviewer,
        address _analyst
    ) public {
        all_user_address = _all_user;
        investigator_address = _investigator;
        reviewer_address = _reviewer;
        analyst_address = _analyst;
    }

    modifier allowedAccess(address _address) {
        require(
            _address == investigator_address ||
                _address == reviewer_address ||
                _address == analyst_address
        );
        _;
    }

    function get_file_hash(uint256 _id)
        public
        view
        allowedAccess(msg.sender)
        returns (string memory)
    {
        return (user_file[_id]);
    }

    function get_data_hash(uint256 _id)
        public
        view
        allowedAccess(msg.sender)
        returns (string memory)
    {
        return (user_data[_id]);
    }

    function upload_data_hash(uint256 _id, string memory _hash)
        public
        allowedAccess(msg.sender)
    {
        user_data[_id] = _hash;
    }

    function upload_file_hash(uint256 _id, string memory _hash)
        public
        allowedAccess(msg.sender)
    {
        user_file[_id] = _hash;
    }

    function update_state(uint256 _id, string memory _state)
        public
        allowedAccess(msg.sender)
    {
        user_state[_id] = _state;
    }
}
