// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {StudentID} from "../src/StudentID.sol";

contract StudentIDScript is Script {
    StudentID public si;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        si = new StudentID();
        vm.stopBroadcast();
    }
}
