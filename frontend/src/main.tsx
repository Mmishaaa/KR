import * as React from "react";
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { store } from "../state/store"

const theme = createTheme({
  typography: {
    fontFamily: 'Noi Grotesk',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
