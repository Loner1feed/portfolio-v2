import { Card, FormProps, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactsForm, FieldType } from "./common/_form";
import { ContactsService } from "../../services/contacts.service";
import { AxiosError, AxiosResponse } from "axios";

export const ContactsCreate = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  const finishHandler: FormProps<FieldType>["onFinish"] = (values) => {
    const data = values;

    // server request
    setLoading(true);
    ContactsService.createContact(data)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          message.success("Contact successfully created");
          navigate("../", { replace: true });
        }
      })
      .catch((e: AxiosError) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card title="CreateContact">
      <ContactsForm onFinish={finishHandler} loading={loading} />
    </Card>
  );
};
