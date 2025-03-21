import { useTable } from "../../utils/hooks/useTable";
import { ContactsService } from "../../services/contacts.service";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Card, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Contact } from "../../utils/types/contacts.types";

export const ContactsList = () => {
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
    service: ContactsService.getContactsByPage,
  });

  // hooks
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    setLoading(true);
    ContactsService.deleteItem(id)
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
      title: "HREF",
      dataIndex: "href",
      key: "href",
      width: 250,
    },

    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      width: 250,
    },

    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      width: 250,
    },

    {
      title: "Actions",
      width: 130,
      render: (record: Contact) => (
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
