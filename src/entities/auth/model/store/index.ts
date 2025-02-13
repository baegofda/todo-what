import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

import { Me } from '@/entities/auth/model/types';

export interface useAuthStore {
  isLoggedIn: boolean;
  provider: Me['provider'] | null;
  setIsLoggedIn: ({ isLoggedIn }: { isLoggedIn: boolean }) => void;
  setProvider: ({ provider }: { provider: Me['provider'] | null }) => void;
  reset: () => void;
}

export const useAuthStore = create(
  persist<useAuthStore>(
    (set) => ({
      isLoggedIn: false,
      provider: null,
      setIsLoggedIn: ({ isLoggedIn }: { isLoggedIn: boolean }) =>
        set({ isLoggedIn }),
      setProvider: ({ provider }: { provider: Me['provider'] | null }) =>
        set({ provider }),
      reset: () => set({ isLoggedIn: false, provider: null }),
    }),
    {
      version: 0,
      name: 'useAuthStore',
    },
  ),
);
