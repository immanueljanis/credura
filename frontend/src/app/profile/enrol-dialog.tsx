import { useState } from "react";

export function EnrolDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary flex items-center text-sm"
      >
        Enroll Now
      </button>
    </>
  );
}
