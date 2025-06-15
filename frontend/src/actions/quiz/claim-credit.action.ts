"use server";
import { erc20Contract, publicClient, walletClient } from "../index";

export async function claimCreditForStudent(dto: { userAddress: `0x${string}` }) {
    const { userAddress } = dto;

    if (!userAddress) {
        return { error: 'Invalid input: userAddress and are required.' };
    }

    try {
        console.log(`Preparing to claim tokens for ${userAddress}...`);
        const { request }: { request: any } = await publicClient.simulateContract({
            args: [userAddress as `0x${string}`],
            ...erc20Contract,
            functionName: 'claim',
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