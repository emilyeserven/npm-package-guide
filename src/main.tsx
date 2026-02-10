import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { PMProvider } from './hooks/usePMContext'
import { router } from './router'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PMProvider>
      <RouterProvider router={router} />
    </PMProvider>
  </StrictMode>,
)
