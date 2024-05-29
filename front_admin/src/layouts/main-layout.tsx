import { Layout } from "antd";
import React from "react";
import { SideNav } from "../components/layout/side-nav";
// import { getRouteInfo } from "../utils";
// import navigationConfig, { NavTreeType } from "../configs/navigation.config";
// import { PageHeader } from "../components/layout/page-header";
import { Location } from "react-router";
import { Outlet } from "react-router-dom";
import { PageHeader } from "../components/layout/page-header";

const { Content } = Layout;

interface MainLayoutProps {
  navCollapsed?: boolean;
  location?: Location;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ navCollapsed }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />

      <Layout>
        <div>
          {/* <PageHeader
            display={currentRouteInfo?.breadcrumb}
            title={currentRouteInfo?.label}
          /> */}
          <PageHeader />
          <Content style={{ padding: "10px" }}>
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};
