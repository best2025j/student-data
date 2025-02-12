import { createHashRouter, RouterProvider } from "react-router-dom"; // ✅ Use createHashRouterimport "./App.css";
import Home from "../pages";
import Result from "../pages/Result";

// ✅ Define routes properly
const router = createHashRouter(
  [
    {
      path: "/",
      element: (
        <div className="!bg-[#F6F6F6] min-h-screen">
          <Home />
        </div>
      ),
    },
    { path: "/result/:id", element: <Result /> },
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
      {/* ✅ Provide the Router */}
      <RouterProvider
        future={{ v7_startTransition: true }} // Enables React's startTransition API
        router={router}
      />
    </div>
  );
};

export default App;
