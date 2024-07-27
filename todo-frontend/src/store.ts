// store.ts
import {create} from 'zustand';

interface UserStore {
  username: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: '',
  setUsername: (username: string) => set({ username }),
}));