import React from "react";
import { useTable } from "../../utils/hooks/useTable";
import { SocialsService } from "../../services/socials.service";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Social } from "../../utils/types/socials.types";

export const SocialsList = () => {
  // custom hooks
  const {
    tableChangeHandler,
    setLoading,
    refreshHandler,
    loading,
    response,
    ExtraButtons,
    params,
  } = useTable({
    // defaultParams: { paramName: "isSimple", paramValue: true },
    service: SocialsService.getByPage,
  });

  // hooks
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    setLoading(true);
    SocialsService.delete(id)
      .then((res: AxiosResponse) => {
        console.log(res);
        message.success("Contact successfully deleted");
        refreshHandler();
      })
      .catch((e: AxiosError) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "href",
      dataIndex: "href",
      key: "href",
      width: 250,
    },

    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },

    {
      title: "iconName",
      dataIndex: "iconName",
      key: "iconName",
      width: 250,
    },

    {
      title: "Actions",
      width: 130,
      render: (record: Social) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="large"
            onClick={() => navigate(`edit/${record._id}`)}
          />
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => deleteHandler(record._id)}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
          >
            <Button
              danger
              type="default"
              icon={<DeleteOutlined />}
              size="large"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="My Contacts" extra={<ExtraButtons />}>
      <Table
        columns={columns}
        dataSource={response.data}
        loading={loading}
        onChange={tableChangeHandler}
        scroll={{ x: 400 }}
        pagination={{
          showSizeChanger: false,
          total: response.totalCount,
          current: params.page + 1,
          pageSize: params.pageSize,
        }}
      />
    </Card>
  );
};
