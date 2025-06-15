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

        vm.stopBroadcast();
    }
}
