import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ItemsService } from "../../services/items.service";
import { AxiosError, AxiosResponse } from "axios";
import { Card, message, FormProps } from "antd";
import { Item } from "../../utils/types/items.types";
import { FieldType, ItemsForm } from "./common/_form";
import { useForm } from "antd/es/form/Form";
import { omit } from "../../utils/helpers/omit";

export const ItemsEdit = () => {
  // hooks
  const { itemId } = useParams();
  const [form] = useForm<Item>();
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const setDataToForm = (data: Item) => {
    form.setFieldsValue({
      title: data.title,
      description: data.description,
      websiteUrl: data.websiteUrl,
      repoUrl: data.repoUrl,
      stack: data.stack,
      isSimple: data.isSimple,
      updateCreatedDate: false,
    });

    setImagePreview(data.imageUrl);
  };

  const handleFormFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // creating the FormData object
    const data = new FormData();

    let omittedData;
    if (values) {
      const settings = { updateCreatedDate: !!values.updateCreatedDate };
      data.append("settings", JSON.stringify(settings));

      omittedData = omit(values, ["updateCreatedDate"]);
      data.append("data", JSON.stringify(omittedData));
      // logFormData(data);
    }
    if (file) data.append("image", file);

    // server request
    if (itemId) {
      setLoading(true);
      ItemsService.updateItem(data, itemId)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            message.success("Item successfully created");
            navigate("../", { replace: true });
          }
        })
        .catch((e: AxiosError) => {
          message.error(e.message);
        })
        .finally(() => {
          setLoading(false);
          setFile(null);
        });
    }
  };

  const handleFile = (file: File | null) => {
    setFile(file);
  };

  // fetch data
  useEffect(() => {
    if (itemId) {
      setLoading(true);
      ItemsService.getItem(itemId)
        .then((res: AxiosResponse<Item>) => {
          if (res.status === 200) {
            setDataToForm(res.data);
          }
        })
        .catch((e: AxiosError) => {
          message.error("Server error. Couldn't receive item data");
          console.log(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <Card title="Edit item" loading={loading}>
      <ItemsForm
        form={form}
        onFinish={handleFormFinish}
        handleFile={handleFile}
        imagePreview={imagePreview}
        isEdit={true}
      />
    </Card>
  );
};
