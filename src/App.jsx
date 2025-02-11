import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Result from "../pages/Result";
import "./App.css";
import { useEffect, useState } from "react";

// ✅ Define routes properly
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div className="!bg-[#F6F6F6] min-h-screen">
          <Home />
        </div>
      ),
    },
    { path: "/result", element: <Result /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      // ✅ Ensure all styles are loaded before rendering
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }, []);

    if (!isLoaded) {
      return <p className="text-center text-blue-500 mt-10">Loading...</p>; // ✅ Temporary loading state
    }

  
  return (
    <div className="app">
      {/* ✅ Add Navigation */}
      {/* <nav className="gap-10 w-full mx-auto justify-center p-4 flex items-center">
        <a href="/" className="">
          Home
        </a>
        <a href="/result" className="">
          Result
        </a>
      </nav> */}

      {/* ✅ Provide the Router */}
      <RouterProvider
        future={{ v7_startTransition: true }} // Enables React's startTransition API
        router={router}
      />
    </div>
  );
};

export default App;
