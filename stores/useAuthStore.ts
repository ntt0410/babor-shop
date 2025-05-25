import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}
export const useHasHydrated = () => useAuthStore.persist.hasHydrated();

export const useAuthStore = create<AuthState>()(
  
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
);

