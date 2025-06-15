import ERC20_ABI_JSON from "./ERC20_ABI.json"

export const ERC20_ABI = ERC20_ABI_JSON;
export const ERC20_CONTRACT_ADDRESS = "0xC81674275Ec8f6dF00003160b879B09c5A842855";

export const erc20Contract = {
    address: ERC20_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
}