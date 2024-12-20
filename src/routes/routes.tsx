import { createBrowserRouter } from "react-router-dom";
import NotFound from '../utils/NotFound';
import MainLayout from '../MainLayout/MainLayout';
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{
      path: "/",
      element: <App />
    }]
  },
  {
    path: "*",
    element: <NotFound />
  },
]);