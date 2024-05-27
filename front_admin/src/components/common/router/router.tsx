import React from "react";
import { IndexLayout } from "../../../layouts/index-layout";
import { MainLayout } from "../../../layouts/main-layout";
import itemsRoutes from "../../../views/items";
import { RouterProvider, createHashRouter } from "react-router-dom";
import blankRoute from "../../../views/blank";
import mainImageRoute from "../../../views/main-image";
import socialsRoute from "../../../views/socials";
import contactsRoute from "../../../views/contacts";

// TODO: сделать lazy load компонентов из роутов

const router = createHashRouter([
  {
    path: "build",
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
    ],
  },
]);

export const Router: React.FC = () => <RouterProvider router={router} />;
