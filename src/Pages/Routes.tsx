import { createBrowserRouter } from "react-router-dom";
import Home from "src/Pages/Home";
import ErrorPage from "src/Pages/Errors/ErrorPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default Router;
