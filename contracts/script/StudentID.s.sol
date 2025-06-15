// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {StudentID} from "../src/StudentID.sol";

contract StudentIDScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        StudentID studentID = new StudentID();
        console.log("StudentID deployed at:", address(studentID));

        address student = 0x1234567890123456789012345678901234567890;
        string memory nim = "2025001";
        string memory name = "Alex Rahman";
        string memory major = "Computer Science";
        string memory uri = "ipfs://QmFakeHash/metadata.json";

        studentID.issueStudentID(student, nim, name, major, uri);
        console.log("Issued StudentID to:", student);
        console.log("NIM:", nim);
        console.log("Metadata URI:", uri);

        vm.stopBroadcast();
    }
}
