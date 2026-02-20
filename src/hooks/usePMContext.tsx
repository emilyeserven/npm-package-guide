import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

type PM = 'npm' | 'pnpm'

interface PMState {
  currentPM: PM
  setPM: (pm: PM) => void
}

const usePMStore = create<PMState>((set) => ({
  currentPM: 'npm',
  setPM: (pm) => set({ currentPM: pm }),
}))

// Sync body class on PM change
usePMStore.subscribe((state) => {
  document.body.classList.toggle('pnpm', state.currentPM === 'pnpm')
})

export function usePM() {
  return usePMStore(useShallow((s) => ({ currentPM: s.currentPM, setPM: s.setPM })))
}
