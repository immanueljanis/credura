// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {CampusCredit} from "../src/CampusCredit.sol";

contract CampusCreditScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        CampusCredit campusCredit = new CampusCredit();
        console.log("CampusCredit deployed at:", address(campusCredit));

        address merchant = 0x23686f799e7C1E8158208882bAD2BD90A5C59256;
        string memory name = "Kafetaria Kampus";
        campusCredit.registerMerchant(merchant, name);
        console.log("Merchant registered:", name);

        address testStudent = msg.sender;
        campusCredit.setDailyLimit(testStudent, 1000 * 10 ** campusCredit.decimals());
        console.log("Daily limit set for:", testStudent);

        vm.stopBroadcast();
    }
}
