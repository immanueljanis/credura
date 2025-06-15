import 'dotenv/config';
import { createPublicClient, createWalletClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import ERC20_ABI_JSON from "./abi/ERC20_ABI.json"
import { privateKeyToAccount } from "viem/accounts";

export const ERC20_ABI = ERC20_ABI_JSON;
export const ERC20_CONTRACT_ADDRESS = "0x0334b9eb70B0De8f1e5F9a98B47CDDF6dA775E3B";
export const rpcUrl = process.env.RPC_URL;

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
export const account = privateKeyToAccount(privateKey);

export const walletClient = createWalletClient({
    account,
    chain: monadTestnet,
    transport: http(),
});

export const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(),
});

export const erc20Contract = {
    address: ERC20_CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
}