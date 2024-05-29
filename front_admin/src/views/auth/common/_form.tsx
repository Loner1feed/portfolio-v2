import { ExperimentTwoTone } from "@ant-design/icons";
import { Button, Card, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import { UsersService } from "../../../services/users.service";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const AuthTitle = () => (
  <h1 style={{ textAlign: "center" }}>
    Login
    <ExperimentTwoTone style={{ marginLeft: "10px" }} />
  </h1>
);

export type FieldType = {
  username: string;
  password: string;
};

export const AuthForm = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  const finishHandler: FormProps<FieldType>["onFinish"] = (values) => {
    setLoading(true);
    UsersService.login(values)
      .then((res: AxiosResponse) => {
        if (res.status === 201) {
          const localStorage = window.localStorage;
          localStorage.setItem("token", res.data.token);
          navigate("../main");
        }
      })
      .catch((e: AxiosError) => {
        if (e.response?.status === 404)
          message.error("Can't find user with this username");
        if (e.response?.status === 402) message.error("Incorrect password");
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Card
      title={<AuthTitle />}
      style={{ minWidth: "280px", maxWidth: "400px", width: "100%" }}
    >
      <Form layout="vertical" onFinish={finishHandler}>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Login is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Min. length for a password: 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "0",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
