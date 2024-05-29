import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export const PageHeader: React.FC = () => {
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    window.location.hash = "/auth";
  };

  return (
    <Header
      style={{
        padding: 0,
        paddingRight: "20px",
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button size="large" icon={<LogoutOutlined />} onClick={logoutHandler}>
        Log Out
      </Button>
    </Header>
  );
};
