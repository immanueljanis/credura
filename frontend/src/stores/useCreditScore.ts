import React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CreditState {
    credits: number;
    setCredits: (amount: number) => void;
}

export const useCreditStore = create<CreditState>()(
    persist(
        (set, get) => ({
            credits: 0,
            setCredits: (amount) => {
                set({ credits: amount });
            },
        }),
        {
            name: 'credit-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);