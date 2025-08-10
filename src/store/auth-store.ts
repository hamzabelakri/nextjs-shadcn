import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponse } from "@/lib/api/auth";

interface AuthState {
  user: LoginResponse["user"] | null;
  token: string | null;
  setAuth: (data: LoginResponse | undefined) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (data) => {
        set({
          user: data?.user ?? null,
          token: data?.token ?? null,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
        });
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);
