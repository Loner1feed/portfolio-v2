import { FormProps, useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../../utils/types/contacts.types";
import { ContactsForm, FieldType } from "./common/_form";
import { ContactsService } from "../../services/contacts.service";
import { AxiosError, AxiosResponse } from "axios";
import { Card, message } from "antd";

export const ContactsEdit = () => {
  // hooks
  const { contactId } = useParams();
  const [form] = useForm<Contact>();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  const setDataToForm = (data: Contact) => {
    form.setFieldsValue({
      body: data.body,
      href: data.body,
      label: data.label,
    });
  };

  const handleFormFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = values;

    // server request
    if (contactId) {
      setLoading(true);
      ContactsService.updateContact(data, contactId)
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
    }
  };

  // fetch data
  useEffect(() => {
    if (contactId) {
      setLoading(true);
      ContactsService.getContactById(contactId)
        .then((res: AxiosResponse<Contact>) => {
          if (res.status === 200) {
            setDataToForm(res.data);
          }
        })
        .catch((e: AxiosError) => {
          message.error("Server error. Couldn't receive contact data");
          console.log(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId]);

  return (
    <Card title="Edit item" loading={loading}>
      <ContactsForm form={form} onFinish={handleFormFinish} isEdit={true} />
    </Card>
  );
};
