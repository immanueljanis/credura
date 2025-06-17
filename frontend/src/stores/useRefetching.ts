import { create } from "zustand";

type Store = {
  refetchBalance: ((...args: unknown[]) => unknown) | undefined;
  setRefetchBalance: (
    value: (...args: unknown[]) => unknown | undefined
  ) => void;
};

const useRefetchBalance = create<Store>((set) => ({
  refetchBalance: undefined,
  setRefetchBalance: (value) => set({ refetchBalance: value }),
}));

export default useRefetchBalance;
