import { Pagination } from 'components/common/pagination/pagination';
import { ProjectsGrid } from 'components/layout/projects-grid/projects-grid';
import { toast } from 'components/common/toast';
import React, { useEffect, useState } from 'react';
import { ItemsService } from 'services/items.service';
import { PaginationParams, PaginationResponse } from 'utils/types/item.types';
import { SingleTab, Tabs } from 'components/common/tabs/tabs';

const tabsData = [
  {
    label: 'Adaptive websites',
    value: true,
  },

  {
    label: 'React web apps',
    value: false,
  },
];

export const Projects: React.FC = () => {
  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    pageSize: 4,
    paramName: 'isSimple',
    paramValue: true,
  });

  const [response, setResponse] = useState<PaginationResponse>({
    data: [],
    page: 0,
    totalCount: 0,
  });

  const onTabsChange = (tab: SingleTab) => {
    setParams({ ...params, paramValue: tab.value, page: 0 });
  };

  // fetch data
  useEffect(() => {
    console.log(params);
    ItemsService.getItemsByPage(params)
      .then(res => {
        if (res.data) {
          setResponse(res.data);
        }
      })
      .catch(e => {
        console.log(e);
        toast.error('Failed to get the portfolio items');
      });
  }, [params]);

  return (
    <div>
      <Tabs data={tabsData} onChange={onTabsChange} activeValue={params.paramValue} />
      <Pagination
        onPageChange={pageNumber =>
          setParams({ ...params, page: pageNumber - 1 })
        }
        currentPage={params.page + 1}
        totalCount={response.totalCount}
      />
      <ProjectsGrid data={response.data} />
    </div>
  );
};
