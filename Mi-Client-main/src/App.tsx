import { UserProvider } from './Context/userContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from './Route/router';
import { RouterProvider } from 'react-router-dom';
import './App.css'
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
