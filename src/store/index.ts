import { create } from "zustand";
import type { MeResponse } from "../types/api";
import { immer } from "zustand/middleware/immer";

export interface ProfileStore {
  profile: MeResponse | null;
  setProfile: (profile: MeResponse) => void;
}
export const useAppStore = create<ProfileStore>()(
  immer((set) => ({
    profile: null,
    setProfile(profile) {
      set((store) => {
        store.profile = profile;
      });
    },
  }))
);
