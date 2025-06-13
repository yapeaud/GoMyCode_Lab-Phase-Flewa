import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('flewa-theme') || 'coffee',
    setTheme: (theme) =>{ set({ theme }); localStorage.setItem('flewa-theme', theme); },
}));