import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldType, SocialsForm } from "./common/_form";
import { SocialsService } from "../../services/socials.service";
import { Card, FormProps, message } from "antd";
import { AxiosError, AxiosResponse } from "axios";

export const SocialsCreate = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  const finishHandler: FormProps<FieldType>["onFinish"] = (values) => {
    const data = values;

    // server request
    setLoading(true);
    SocialsService.create(data)
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
    <Card title="Create Social">
      <SocialsForm onFinish={finishHandler} loading={loading} />
    </Card>
  );
};
