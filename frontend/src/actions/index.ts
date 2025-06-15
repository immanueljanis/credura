import 'dotenv/config';
import { createPublicClient, createWalletClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import ERC20_ABI_JSON from "./abi/ERC20_ABI.json"
import { privateKeyToAccount } from "viem/accounts";

export const ERC20_ABI = ERC20_ABI_JSON;
export const ERC20_CONTRACT_ADDRESS = "0x49b3783dd4b8F628f209cAB4986850bcCBf625bd";
export const rpcUrl = process.env.RPC_URL;

const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
export const account = privateKeyToAccount(privateKey);
console.log({ account, privateKey })

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