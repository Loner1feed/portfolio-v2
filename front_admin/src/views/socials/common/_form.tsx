import { Button, Form, FormProps, Input } from "antd";
import React from "react";

export type FieldType = {
  _id: string;
  href: string;
  name: string;
  iconName: string;
};

interface SocialsFormProps {
  form?: any;
  onFinish: FormProps["onFinish"];
  loading?: boolean;
  isEdit?: boolean;
}

export const SocialsForm: React.FC<SocialsFormProps> = ({
  form,
  onFinish,
  loading = false,
  isEdit = false,
}) => {
  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 600, margin: "0 auto" }}
      onFinish={onFinish}
      disabled={loading}
      form={form}
    >
      <Form.Item<FieldType>
        label="href"
        name="href"
        rules={[{ required: true, message: "href is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Icon name"
        name="iconName"
        rules={[{ required: true, message: "Icon name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
