import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.tsx'
import './index.css'
import { AppWebScreen } from './components/AppWebScreen.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background h-screen block md:hidden" >
        <App />
      </main>
      <main className="dark text-foreground bg-background h-screen hidden md:flex w-full items-center justify-center" >
          <AppWebScreen />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
