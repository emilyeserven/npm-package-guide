import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type PM = 'npm' | 'pnpm'

interface PMContextType {
  currentPM: PM
  setPM: (pm: PM) => void
}

const PMContext = createContext<PMContextType>({ currentPM: 'npm', setPM: () => {} })

export function PMProvider({ children }: { children: ReactNode }) {
  const [currentPM, setCurrentPM] = useState<PM>('npm')

  useEffect(() => {
    document.body.classList.toggle('pnpm', currentPM === 'pnpm')
  }, [currentPM])

  return (
    <PMContext.Provider value={{ currentPM, setPM: setCurrentPM }}>
      {children}
    </PMContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePM() {
  return useContext(PMContext)
}
