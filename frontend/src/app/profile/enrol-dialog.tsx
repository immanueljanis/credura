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
import {
  useAccount,
  useClient,
  useWriteContract,
} from "wagmi";

export function EnrolDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [watchContract, setWatchContract] = useState(false);
  const contract = useWriteContract();
  const { address } = useAccount();
  const [user, setUser] = useState({
    name: "",
    major: "",
    uri: "",
  });

  const client = useClient();

  const issueStudent: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!address || !user.name || !user.major || !user.uri) return;
    if (!client) return;
    const nim = Date.now() + "";
    try {
      setWatchContract(true);
      const hash = await contract.writeContractAsync({
        abi: studentIdAbi,
        address: studentIdAddress,
        functionName: "issueStudentID",
        args: [address, nim, user.name, user.major, user.uri],
      });
      await waitForTransactionReceipt(client, { hash });
      const tokenId = await readContract(client, {
        address: studentIdAddress,
        abi: studentIdAbi,
        functionName: "nimToTokenId",
        args: [nim],
      });
      const result = await registerAction({
        studentNFTId: tokenId,
        walletAddress: address,
        description: user.major,
        name: user.name,
      });
      queryClient.invalidateQueries({ queryKey: ["i"] });
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
    setWatchContract(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="btn-primary flex items-center text-sm"
      >
        Enroll Now
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex flex-col gap-2 [&>label]:flex [&>label]:gap-2 [&>label]:justify-between [&>label>input]:px-2"
          onSubmit={issueStudent}
        >
          <label>
            NAME
            <input
              name="name"
              value={user.name}
              onChange={(e) => {
                const value = e.target.value;
                setUser((x) => ({ ...x, name: value }));
              }}
            />
          </label>
          <label>
            MAJOR
            <input
              name="major"
              value={user.major}
              onChange={(e) => {
                const value = e.target.value;
                setUser((x) => ({ ...x, major: value }));
              }}
            />
          </label>
          <label>
            URI
            <input
              name="uri"
              value={user.uri}
              onChange={(e) => {
                const value = e.target.value;
                setUser((x) => ({ ...x, uri: value }));
              }}
            />
          </label>
          <button className="btn-primary">submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
