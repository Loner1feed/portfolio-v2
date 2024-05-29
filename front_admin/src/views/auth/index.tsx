import { AuthLogin } from "./login";

const authRoute = {
  path: "auth",
  children: [
    {
      index: true,
      element: <AuthLogin />,
    },
  ],
};

export default authRoute;
