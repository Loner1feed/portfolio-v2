import {
  CommentOutlined,
  FileImageOutlined,
  PhoneOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "./app.config";
import React from "react";
import { Link } from "react-router-dom";

// generate react-router link
const generateLabel = (path: string | undefined, label: string) => {
  return path ? React.createElement(Link, { to: path, children: label }) : null;
};

// *IMPORTANT* name "key" field like this: {parent key}-{key}
const contentNavTree = [
  {
    key: "content",
    label: "Content",
    type: "group",
    children: [
      {
        key: `${APP_PREFIX_PATH}/mainImage`,
        path: `${APP_PREFIX_PATH}/mainImage`,
        icon: <FileImageOutlined />,
        // call function to generate react-router link
        get label() {
          return generateLabel(this.path, "Main Banner Image");
        },
        breadcrumb: false,
      },

      {
        key: `${APP_PREFIX_PATH}/items`,
        path: `${APP_PREFIX_PATH}/items`,
        icon: <ProductOutlined />,
        // call function to generate react-router link
        get label() {
          return generateLabel(this.path, "Items");
        },
        breadcrumb: false,
      },

      // obj structure for socials
      // {
      //   key: string;
      //   url: string;
      //   icon: string: (name of the icon file)
      // }

      {
        key: `${APP_PREFIX_PATH}/socials`,
        path: `${APP_PREFIX_PATH}/socials`,
        icon: <CommentOutlined />,
        // call function to generate react-router link
        get label() {
          return generateLabel(this.path, "Socials");
        },
        breadcrumb: false,
      },

      // obj structure for contacts
      // {
      //   key: string;
      //   url: string; (content of href attr)
      //   content: string; (text content of the link)
      //   title: string: (text content of the title)
      // }

      {
        key: `${APP_PREFIX_PATH}/contacts`,
        path: `${APP_PREFIX_PATH}/contacts`,
        icon: <PhoneOutlined />,
        // call function to generate react-router link
        get label() {
          return generateLabel(this.path, "Contacts");
        },
        breadcrumb: false,
      },
    ],
  },
];

const navigationConfig = [...contentNavTree];

export default navigationConfig;
