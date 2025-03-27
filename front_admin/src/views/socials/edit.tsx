import { FormProps, useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Social } from "../../utils/types/socials.types";
import { FieldType, SocialsForm } from "./common/_form";
import { SocialsService } from "../../services/socials.service";
import { AxiosError, AxiosResponse } from "axios";
import { Card, message } from "antd";

export const SocialsEdit = () => {
  // hooks
  const { socialId } = useParams();
  const [form] = useForm<Social>();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  const setDataToForm = (data: Social) => {
    form.setFieldsValue({
      href: data.href,
      name: data.name,
      iconName: data.iconName,
    });
  };

  const handleFormFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = values;

    // server request
    if (socialId) {
      setLoading(true);
      SocialsService.update(socialId, data)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            message.success("Social successfully created");
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
    if (socialId) {
      setLoading(true);
      SocialsService.getById(socialId)
        .then((res: AxiosResponse<Social>) => {
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
  }, [socialId]);

  return (
    <Card title="Edit social" loading={loading}>
      <SocialsForm form={form} onFinish={handleFormFinish} isEdit={true} />
    </Card>
  );
};
