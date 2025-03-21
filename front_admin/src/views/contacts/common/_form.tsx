import { Button, Form, FormProps, Input } from "antd";
import React from "react";

export type FieldType = {
  _id: string;
  href?: string;
  label: string;
  body: string;
};

interface ContactsFormProps {
  form?: any;
  onFinish: FormProps["onFinish"];
  loading?: boolean;
  isEdit?: boolean;
}

export const ContactsForm: React.FC<ContactsFormProps> = ({
  form,
  onFinish,
  loading = false,
  isEdit = false,
}) => {
  // state

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 600, margin: "0 auto" }}
      onFinish={onFinish}
      disabled={loading}
      form={form}
    >
      <Form.Item<FieldType> label="HREF" name="href">
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Label"
        name="label"
        rules={[{ required: true, message: "Label is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Body"
        name="body"
        rules={[{ required: true, message: "Body is required" }]}
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
