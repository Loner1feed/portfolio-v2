import { Pagination } from 'components/common/pagination/pagination';
import { ProjectsGrid } from 'components/layout/projects-grid/projects-grid';
import { toast } from 'components/common/toast';
import React, { useEffect, useState } from 'react';
import { ItemsService } from 'services/items.service';
import { PaginationParams, PaginationResponse } from 'utils/types/item.types';
import { SingleTab, Tabs } from 'components/common/tabs/tabs';
import { Container } from '../container/container';
import { Title } from '../title/title';

//styles
import './projects.style.scss';

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

  const [loading, setLoading] = useState(false);

  const onTabsChange = (tab: SingleTab) => {
    setParams({ ...params, paramValue: tab.value, page: 0 });
  };

  // fetch data
  useEffect(() => {
    setLoading(true);
    ItemsService.getItemsByPage(params)
      .then(res => {
        if (res.data) {
          setResponse(res.data);
        }
      })
      .catch(e => {
        console.log(e);
        toast.error('Failed to get the portfolio items');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return (
    <div className="projects" id="scrollTo">
      <Container>
        <Title label="My Projects" className="projects__title" />
        <Tabs
          data={tabsData}
          onChange={onTabsChange}
          activeValue={params.paramValue}
          disabled={loading}
        />
        {!!response.data.length && (
          <Pagination
            onPageChange={pageNumber =>
              setParams({ ...params, page: pageNumber - 1 })
            }
            currentPage={params.page + 1}
            totalCount={response.totalCount}
            disabled={loading}
          />
        )}
        <ProjectsGrid data={response.data} />
      </Container>
    </div>
  );
};
