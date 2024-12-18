import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enUS from "date-fns/locale/en-US";
import App from "./App.tsx";
import "./index.css";
import { store } from "../state/store";

const theme = createTheme({
  typography: {
    fontFamily: "Noi Grotesk",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>
);
