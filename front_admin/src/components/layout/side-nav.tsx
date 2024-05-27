import React, { useState } from "react";
import { Layout } from "antd";
import { MenuContent } from "./menu-content";
import { Logo } from "../ui/logo/logo";

const { Sider } = Layout;

export const SideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
    >
      <Logo />
      <MenuContent />
    </Sider>
  );
};
