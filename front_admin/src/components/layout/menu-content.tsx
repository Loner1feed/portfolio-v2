import React, { useEffect, useState } from "react";
import navigationConfig from "../../configs/navigation.config";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";

export const MenuContent: React.FC = () => {
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  return (
    <Menu
      mode="inline"
      theme="dark"
      style={{ height: "100%" }}
      selectedKeys={[current]}
      // defaultSelectedKeys={[String(routeInfo?.key)]}
      // defaultOpenKeys={setDefaultOpen(String(routeInfo?.key))}
      items={navigationConfig}
    />
  );
};
