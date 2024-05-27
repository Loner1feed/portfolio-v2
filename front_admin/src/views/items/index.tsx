import { ItemsCreate } from "./create";
import { ItemsEdit } from "./edit";
import { ItemsList } from "./list";

// TODO: При отправке изобрадения сделать фильтрацию по расширению файла (jpeg/png)

const itemsRoutes = {
  path: "items",
  children: [
    // items
    {
      index: true,
      element: <ItemsList />,
    },

    // items/create
    {
      path: "create",
      element: <ItemsCreate />,
    },

    // items/edit/:id
    {
      path: "edit/:itemId",
      element: <ItemsEdit />,
    },
  ],
};

export default itemsRoutes;
