import { ContactsCreate } from "./create";
import { ContactsEdit } from "./edit";
import { ContactsList } from "./list";

const contactsRoute = {
  path: "contacts",
  children: [
    // contacts/list
    {
      index: true,
      element: <ContactsList />,
    },

    // contacts/create
    {
      path: "create",
      element: <ContactsCreate />,
    },

    // contacts/edit
    {
      path: "edit/:contactId",
      element: <ContactsEdit />,
    },
  ],
};

export default contactsRoute;
