import { useEffect, useState } from "react";
import { PaginationParams, PaginationResponse } from "../types/items.types";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Space, TableProps, message } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";

// hook params types
interface UseTableParams {
  defaultParams?: Partial<PaginationParams>;
  service: (params: PaginationParams) => Promise<AxiosResponse>;
  createPath?: string;
}

export const useTable = <T extends UseTableParams>({
  // Default params
  defaultParams = {},
  // API Method
  service,
  // In case you need a custom pathname for "create" page
  createPath = "create",
}: T) => {
  // HOOKS
  const navigate = useNavigate();

  // STATE
  // **params used for fetching data
  const [params, setParams] = useState<PaginationParams>({
    page: defaultParams?.page || 0,
    pageSize: defaultParams?.pageSize || 10,
    paramName: defaultParams?.paramName || "",
    paramValue: defaultParams?.paramValue || "",
  });

  // **response received from fetching data
  const [response, setResponse] = useState<PaginationResponse>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  // **loading state
  const [loading, setLoading] = useState(false);

  // PRIVATE HANDLERS
  const fetchData = (
    service: UseTableParams["service"],
    params: PaginationParams
  ) => {
    setLoading(true);
    service(params)
      .then((res: AxiosResponse<PaginationResponse>) => {
        if (res.status === 200) {
          setResponse(res.data);
        }
      })
      .catch((e: AxiosError) => {
        message.error("Server error occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // **callback called for "Create" button
  const navigateToCreate = () => navigate(createPath);

  // **Refresh table data
  const refreshHandler = () => fetchData(service, params);

  // PUBLIC HANDLERS
  const paginationChangeHandler = (page: number, pageSize: number) => {
    setParams({ ...params, page: page - 1, pageSize });
  };

  const tableChangeHandler: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const { current, pageSize } = pagination;
    const filterKey = Object.keys(filters)[0];

    const filterValue =
      //@ts-ignore
      filters[filterKey] !== null ? filters[filterKey][0] : "";

    const filterObj =
      filterKey && filterValue !== ""
        ? { paramName: filterKey, paramValue: filterValue }
        : { paramName: "", paramValue: "" };

    setParams({
      ...params,
      page: current ? current - 1 : 0,
      pageSize: pageSize || 10,
      ...filterObj,
    });
  };

  // FETCHING DATA...
  useEffect(() => {
    fetchData(service, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // BUTTONS FOR "EXTRA" SECTION IN ANTD CARD COMPONENT
  const ExtraButtons: React.FC = () => (
    <Space>
      <Button
        icon={<RedoOutlined />}
        title="Refresh"
        size="large"
        onClick={refreshHandler}
        loading={loading}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        onClick={navigateToCreate}
        disabled={loading}
      >
        Add
      </Button>
    </Space>
  );

  return {
    // functions
    setParams,
    paginationChangeHandler,
    tableChangeHandler,
    setLoading,
    refreshHandler,
    // vars
    loading,
    response,
    params,
    // components
    ExtraButtons,
  };
};
