import React from "react";
import { IndexLayout } from "../../../layouts/index-layout";
import { MainLayout } from "../../../layouts/main-layout";
import itemsRoutes from "../../../views/items";
import {
  RouterProvider,
  createBrowserRouter,
  // createHashRouter,
} from "react-router-dom";
import blankRoute from "../../../views/blank";
import mainImageRoute from "../../../views/main-image";
import socialsRoute from "../../../views/socials";
import contactsRoute from "../../../views/contacts";
import authRoute from "../../../views/auth";

// TODO: сделать lazy load компонентов из роутов

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexLayout />,
    children: [
      {
        path: "main",
        element: <MainLayout />,

        children: [
          blankRoute,
          itemsRoutes,
          mainImageRoute,
          socialsRoute,
          contactsRoute,
        ],
      },

      authRoute,
    ],
  },
]);

export const Router: React.FC = () => <RouterProvider router={router} />;
