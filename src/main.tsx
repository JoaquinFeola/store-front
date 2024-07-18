import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AlertsProvider, AuthProvider } from "./context/";
import { App } from "./App";

import './assets/index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'animate.css';


const root = createRoot(document.getElementById('root')!);

root.render(
    // <React.StrictMode>
        <BrowserRouter>
        <AlertsProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </AlertsProvider>
        </BrowserRouter>
    //  </React.StrictMode>
)





