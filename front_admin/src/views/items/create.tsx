import { Card, FormProps, message } from "antd";
import { useState } from "react";
import { ItemsService } from "../../services/items.service";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { FieldType, ItemsForm } from "./common/_form";

export const ItemsCreate = () => {
  // hooks
  const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (file: File | null) => {
    setFile(file);
  };

  const finishHandler: FormProps<FieldType>["onFinish"] = (values) => {
    // creating the FormData object
    const data = new FormData();

    if (values) {
      Object.keys(values).map((val) => {
        if (val !== "isSimple") {
          //@ts-ignore
          data.append(val, JSON.stringify(values[val]));
        }
        return null;
      });
    }

    // @ts-ignore
    data.append("isSimple", JSON.stringify(!!values.isSimple));

    if (file) data.append("image", file);

    // server request
    setLoading(true);
    ItemsService.createItem(data)
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
  };

  return (
    <Card title="Create Item">
      <ItemsForm
        onFinish={finishHandler}
        loading={loading}
        handleFile={handleFile}
      />
    </Card>
  );
};
