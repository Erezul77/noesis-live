// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Governance {
    string public lastProposal;

    function propose(string calldata newProposal) external {
        lastProposal = newProposal;
    }
}
