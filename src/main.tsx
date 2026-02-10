import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { PMProvider } from './hooks/usePMContext'
import { ThemeProvider } from './hooks/useTheme'
import { router } from './router'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PMProvider>
        <RouterProvider router={router} />
      </PMProvider>
    </ThemeProvider>
  </StrictMode>,
)
