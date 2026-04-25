import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Fonts load before tokens so --font-* can resolve immediately (no FOUT).
// Inter ships as a single variable file; Source Serif 4 too. Plex Mono has
// no variable build so we pull the three weights we use (400/500/600).
import '@fontsource-variable/inter'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource-variable/source-serif-4'
import './ui'          // design-system tokens load first so index.css can override if needed
import './index.css'
import App from './App.jsx'
import { installConsoleCapture } from './utils/consoleBuffer.js'

installConsoleCapture();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,        // 10s — avoids re-fetching on every mount
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
