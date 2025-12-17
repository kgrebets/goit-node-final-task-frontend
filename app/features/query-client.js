import ApiClient from '../api-client/src/ApiClient.js';
import { QueryClient } from '@tanstack/react-query';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
ApiClient.instance = new ApiClient(apiBaseUrl);

const queryClient = new QueryClient();

export default queryClient;