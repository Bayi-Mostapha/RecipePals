import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthWrapper } from './contexts/auth-wrapper.jsx'

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthWrapper>
  </React.StrictMode>,
)
