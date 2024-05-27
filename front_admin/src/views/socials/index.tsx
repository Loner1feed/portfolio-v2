import { SocialsCreate } from "./create";
import { SocialsEdit } from "./edit";
import { SocialsList } from "./list";

const socialsRoute = {
  path: "socials",
  children: [
    // socials
    {
      index: true,
      element: <SocialsList />,
    },

    // socials/create
    {
      path: "create",
      element: <SocialsCreate />,
    },

    // socials/edit
    {
      path: "edit/:socialId",
      element: <SocialsEdit />,
    },
  ],
};

export default socialsRoute;
