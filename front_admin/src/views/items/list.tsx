import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { ItemsService } from "../../services/items.service";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import { useTable } from "../../utils/hooks/useTable";
import { useNavigate } from "react-router-dom";
import { Item } from "../../utils/types/items.types";
import { AxiosError, AxiosResponse } from "axios";

export const ItemsList = () => {
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
    service: ItemsService.getItemsByPage,
  });

  // hooks
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    setLoading(true);
    ItemsService.deleteItem(id)
      .then((res: AxiosResponse) => {
        console.log(res);
        message.success("Item successfully deleted");
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
    },

    {
      width: 130,
      title: () => (
        <>
          Is Simple
          <Tooltip
            title={
              '"Simple" means that website is built without using a framework'
            }
          >
            <QuestionCircleTwoTone
              twoToneColor={"#1677FF"}
              style={{ marginLeft: "5px", cursor: "pointer" }}
            />
          </Tooltip>
        </>
      ),
      dataIndex: "isSimple",
      key: "isSimple",
      filters: [
        { text: "True", value: true },
        { text: "False", value: false },
      ],
      filterMultiple: false,
      render: (record: boolean) =>
        record ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Stack",
      dataIndex: "stack",
      key: "stack",
      width: 300,
      render: (record: string[]) => (
        <Space wrap style={{ columnGap: "0" }}>
          {record.map((el) => (
            <Tag color="blue">{el}</Tag>
          ))}
        </Space>
      ),
    },

    {
      title: "Actions",
      width: 130,
      render: (record: Item) => (
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
    <Card title="Portfolio Items" extra={<ExtraButtons />}>
      <Table
        columns={columns}
        dataSource={response.data}
        loading={loading}
        onChange={tableChangeHandler}
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
