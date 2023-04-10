import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useColumn } from './columns';
import { useNavigate, useParams } from 'react-router-dom';
import useGetProjectAllSubActivitiesList from '../../api/SubActivitiesList';
import { HandleTableOnChange } from '../../types/teams';
import { PATHS } from '../../helpers/constants';

export const Container = styled.div`
  background: var(--white);
  box-shadow: var(--base-box-shadow);
  /* border-radius: 20px 20px 0px 0px; */
  margin: 16px 16px 0px 16px;
  overflow: hidden;
  height: 91vh;

  .ant-input-group-wrapper {
    width: 400px;
    padding: 32px 0px 42px 0px;
  }
  .ant-table-wrapper {
    height: calc(100% - 50px);
    overflow: auto;
  }
  .ant-pagination-item-link {
    border: none !important;
  }
  .ant-pagination-item {
    border-radius: 100% !important;
    border: none;
  }
  .ant-pagination-item-active {
    border-radius: 100% !important;
    background: var(--background-active-pagination);
  }
  .ant-pagination-item-active a {
    color: var(--active-pagination) !important;
  }
  .ant-table-pagination-right {
    justify-content: center;
    align-items: end;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0px;
    width: 80%;
    margin: 5px;
  }
  .ant-tag {
    height: 24px;
    font-size: var(--font-size-semismall);
    background: rgba(104, 163, 149, 0.1);
    border-radius: 2px;
    color: var(--dark-2);
  }
  .ant-table table {
    width: auto;
  }
  .clearfilter {
    background-color: var(--white);
    border: none;
    color: var(--dark-border-ultramarine);
    cursor: pointer;
  }
  .tableName {
    strong {
      font-weight: 400;
    }
  }

  .react-resizable-handle {
    position: absolute;
    right: -5px;
    bottom: 0;
    z-index: 1;
    width: 10px;
    height: 100%;
    cursor: col-resize;
  }
  .ant-table-thead > tr > th {
    color: var(--dark-border-ultramarine) !important;
    font-size: var(--base-font-size);
    border-right: none !important;
  }
  .ant-pagination-options{
    display: none;
  }
`;

const SubActivitiesTable: React.FC = () => {
  const navigate = useNavigate();
  const [tablePagination, setTablePagination] = useState<any>({
    current: 1,
    pageSize: 20
  });
  // status: [],
  //   assigned: [],
  //   startDate: '',
  //   endDate: '',
  //   courseTitle: '',
  //   courseDescription: '',
  //   organizations: [],
  //   sectors: [],
  //   regions: [],
  //   duration: undefined,
  //   teachingModes: [],
  //   partnerOrganization: ''
  const column = useColumn();
  const { id: projectId } = useParams<{ id: string }>();

  const { data, isLoading } = useGetProjectAllSubActivitiesList(projectId, {
    limit: tablePagination.pageSize,
    offset: tablePagination.current
  });

  const handleTableChange: HandleTableOnChange = (pagination) => {
    setTablePagination({
      ...pagination,
      pageSize: 20
    });
  };

  useEffect(() => {
    setTablePagination({
      ...tablePagination,
      total: data?.count
    });
  }, [isLoading, data?.count]);

  return (
    <Container>
      <Table
        columns={column}
        dataSource={data?.result}
        rowKey={(record) => record?.id}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        onRow={(record, index) => {
          return {
            onClick: (event) => {
              event.preventDefault();
              navigate(
                `/project/${PATHS.SUBACTIVITY.replace(
                  ':id',
                  record?.subActivity?.id
                )}`
              );
            }
          };
        }}
        loading={isLoading}
        pagination={tablePagination}
        onChange={handleTableChange}
      />
    </Container>
  );
};
export default SubActivitiesTable;
