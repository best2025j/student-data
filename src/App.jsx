import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import Result from "../pages/Result";
import "./App.css";

// ✅ Define routes properly
const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
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
  return (
    <div className="app">
      {/* ✅ Add Navigation */}
      <nav className="gap-10 w-full mx-auto justify-center p-4 flex items-center">
        <a href="/" className="">
          Home
        </a>
        <a href="/result" className="">
          Result
        </a>
      </nav>

      {/* ✅ Provide the Router */}
      <RouterProvider
        future={{ v7_startTransition: true }} // Enables React's startTransition API
        router={router}
      />
    </div>
  );
};

export default App;
