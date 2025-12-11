// react
import { createRoot } from 'react-dom/client'

// contextos
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UIProvider } from './context/UIContext.jsx'

// componentes
import App from './App.jsx'

// estilos
import './styles/base.css'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </ThemeProvider>
  </AuthProvider>
)
