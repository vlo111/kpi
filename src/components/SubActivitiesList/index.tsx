import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { useColumn } from './columns';
import { useNavigate, useParams } from 'react-router-dom';
import useGetProjectAllSubActivitiesList from '../../api/SubActivitiesList';
import { PATHS } from '../../helpers/constants';
import EditSubCourse from '../Project/SubActivity/SubActivityModals/Edit';
import { IFilteredData } from '../../types/api/subActivityTable';
import { AsnButton } from '../Forms/Button';
import { Void } from '../../types/global';

export const Container = styled.div`
  background: var(--white);
  box-shadow: var(--base-box-shadow);
  margin: 16px 16px 0px 16px;
  overflow: hidden;
  height: 85vh;

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
  .ant-pagination-options {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0px 16px;

`;

const SubActivitiesTable: React.FC = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams<{ id: string }>();
  const [openCreateSubActivity, setOpenCreateSubActivity] =
    useState<boolean>(false);
  const [inputActivityId, setInputActivityId] = useState<string>('');
  const [tablePagination, setTablePagination] = useState<any>({
    current: 1,
    pageSize: 20
  });
  const [searchData, setSearchData] = useState<IFilteredData>({
    status: undefined,
    assigned: undefined,
    startDate: undefined,
    endDate: undefined,
    courseTitle: undefined,
    courseDescription: undefined,
    organizations: undefined,
    sectors: undefined,
    regions: undefined,
    duration: undefined,
    teachingModes: undefined,
    partnerOrganization: undefined,
    managers: undefined
  });

  useEffect((): void => {
    const data: { [key: string]: string | string[] | undefined } = {};
    for (const k of Object.keys(searchData).filter(
      (item) => searchData[item] !== undefined
    )) {
      data[k] = searchData[k];
    }
    setSearchData(data);
  }, [setSearchData]);

  const { data, isLoading, refetch } = useGetProjectAllSubActivitiesList(
    projectId,
    {
      limit: tablePagination.pageSize,
      offset: (tablePagination.current - 1) * 20,
      ...searchData
    }
  );
  const column = useColumn(
    setOpenCreateSubActivity,
    setInputActivityId,
    data?.filterData,
    setSearchData,
    searchData
  );

  const handleTableChange: any = (pagination: any) => {
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
  }, [isLoading, data]);

  const onClearFilters: Void = () => {
    setSearchData({
      status: undefined,
      assigned: undefined,
      startDate: undefined,
      endDate: undefined,
      courseTitle: undefined,
      courseDescription: undefined,
      organizations: undefined,
      sectors: undefined,
      regions: undefined,
      duration: undefined,
      teachingModes: undefined,
      partnerOrganization: undefined,
      managers: undefined
    });
  };

  return (
    <>
      <ButtonContainer>
        <AsnButton className="default" onClick={onClearFilters}>Clear filters</AsnButton>
        <AsnButton className="default">Add Sub-Activity</AsnButton>
      </ButtonContainer>
      <Container>
        <Table
          columns={column}
          dataSource={data?.result}
          rowKey={(record) => record?.id}
          // scroll={{ x: '117vw', y: '73vh' }}
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
        {openCreateSubActivity && (
          <EditSubCourse
            projectId={projectId}
            refetch={refetch}
            setOpenCreateSubActivity={setOpenCreateSubActivity}
            openCreateSubActivity={openCreateSubActivity}
            InputActivityId={inputActivityId}
          />
        )}
      </Container>
    </>
  );
};
export default SubActivitiesTable;
