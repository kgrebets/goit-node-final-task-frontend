import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApiClient from "./api-client/src/ApiClient";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/AuthProvider.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
ApiClient.instance = new ApiClient(apiBaseUrl);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
