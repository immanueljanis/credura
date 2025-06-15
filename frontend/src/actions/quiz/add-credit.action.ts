"use server";
import { account, erc20Contract, publicClient, walletClient } from "../index";

export async function addCreditForStudent(dto: { userAddress: `0x${string}`; amount: number; }) {
    const { userAddress, amount } = dto;

    if (!userAddress || typeof amount !== 'number' || amount <= 0) {
        return { error: 'Invalid input: userAddress and a positive amount are required.' };
    }

    try {
        console.log(`Preparing to add ${amount} claimable tokens for ${userAddress}...`);
        const { request }: { request: any } = await publicClient.simulateContract({
            account,
            ...erc20Contract,
            functionName: 'addClaimable',
            args: [userAddress as `0x${string}`, BigInt(amount * 10 ** 18)],
        });
        const txHash = await walletClient.writeContract(request);

        console.log(`Transaction sent! Hash: ${txHash}`);

        return {
            message: 'Reward added successfully!',
            transactionHash: txHash
        };

    } catch (error: any) {
        console.error("Error in server action:", error);
        return {
            error: 'Failed to execute transaction.',
            details: error.message
        };
    }
}