import { studentIdAbi, studentIdAddress } from "@/abi/student-id";
import { registerAction } from "@/actions/register.action";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import {
  readContract,
  waitForTransactionReceipt,
  watchContractEvent,
} from "viem/actions";
import { useAccount, useClient, useWriteContract } from "wagmi";

export function EnrollDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const contract = useWriteContract();
  const { address } = useAccount();
  const [user, setUser] = useState({
    name: "",
    major: "",
    uri: "ipfs://bafkreigq6apozmk44cz22p3qm4lntievsurgcglryx3hykeqpyqidmegwy",
  });

  const client = useClient();

  const issueStudent = async () => {
    if (!address || !user.name || !user.major || !user.uri) return;
    if (!client) return;
    const nim = Date.now() + "";
    try {
      const hash = await contract.writeContractAsync({
        abi: studentIdAbi,
        address: studentIdAddress,
        functionName: "mintStudentID",
        args: [nim, user.name, user.major, user.uri],
      });
      await waitForTransactionReceipt(client, { hash });
      const tokenId = await readContract(client, {
        address: studentIdAddress,
        abi: studentIdAbi,
        functionName: "addressToTokenId",
        args: [address],
      });
      if (tokenId === BigInt(0)) throw new Error("Transaction Failed");
      const result = await registerAction({
        studentNFTId: tokenId,
        walletAddress: address,
        description: user.major,
        name: user.name,
      });
      if (!result.success) {
        alert(result.message);
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-2">
      <input
        value={user.name}
        onChange={(e) => {
          const value = e.target.value;
          setUser((x) => ({ ...x, name: value }));
        }}
        className="input-field text-2xl font-bold"
        placeholder="Username"
      />
      <textarea
        value={user.major}
        onChange={(e) => {
          const value = e.target.value;
          setUser((x) => ({ ...x, major: value }));
        }}
        className="input-field"
        rows={2}
        placeholder="Tell us about yourself..."
      />
      <button
        disabled={contract.isPending}
        onClick={issueStudent}
        className="btn-primary mb-2"
      >
        {contract.isPending ? "Enrolling..." : "Enroll"}
      </button>
    </div>
  );
}
