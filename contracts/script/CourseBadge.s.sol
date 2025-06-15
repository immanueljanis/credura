// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {CourseBadge} from "../src/CourseBadge.sol";

contract CourseBadgeScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        CourseBadge courseBadge = new CourseBadge();
        console.log("CourseBadge deployed at:", address(courseBadge));

        string memory certName = "Intro to Solidity";
        string memory certUri = "ipfs://QmFakeHash123/cert1.json";

        uint256 certId = courseBadge.createCertificateType(certName, 100, certUri);
        console.log("Certificate created with ID:", certId);

        address student = 0x1234567890123456789012345678901234567890;
        string memory extraData = "Final grade: A+";

        courseBadge.issueCertificate(student, certId, extraData);
        console.log("Certificate issued to student:", student);

        vm.stopBroadcast();
    }
}
