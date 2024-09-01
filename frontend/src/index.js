import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* PersistGate delays rendering until rehydration is complete */}
    <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
