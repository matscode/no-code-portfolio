import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectHintState {
  hasInteracted: boolean;
  hasHydrated: boolean;
  setInteracted: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useProjectHintStore = create<ProjectHintState>()(
  persist(
    (set) => ({
      hasInteracted: false,
      hasHydrated: false,
      setInteracted: () => set({ hasInteracted: true }),
      setHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'mp-project-hint-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
