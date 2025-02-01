import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./src/components/Layout";
import { Home } from "./src/pages/home"

const router = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
  },
])

export { router };