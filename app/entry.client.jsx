import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import {QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/AuthProvider.jsx";
import queryClient from './features/query-client.js';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HydratedRouter />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});