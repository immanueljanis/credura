import ERC20_ABI_JSON from "./ERC20_ABI.json"

export const ERC20_ABI = ERC20_ABI_JSON;
export const ERC20_CONTRACT_ADDRESS = "0x61f5063a49b69764CDeDAbA89F12C776E8935697";

export const erc20Contract = {
    address: ERC20_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
}