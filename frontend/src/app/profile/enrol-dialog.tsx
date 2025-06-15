import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function EnrolDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="btn-primary flex items-center text-sm"
      >
        Enroll Now
      </DialogTrigger>
      <DialogContent>
        djskdj
      </DialogContent>
    </Dialog>
  );
}
