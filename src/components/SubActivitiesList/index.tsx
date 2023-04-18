import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, message } from 'antd';
import { useColumn } from './columns';
import { useNavigate, useParams } from 'react-router-dom';
import useGetProjectAllSubActivitiesList from '../../api/SubActivitiesList';
import { PATHS } from '../../helpers/constants';
import EditSubCourse from '../Project/SubActivity/SubActivityModals/Edit';
import { IFilteredData, IPagination } from '../../types/api/subActivityTable';
import { AsnButton } from '../Forms/Button';
import { Void } from '../../types/global';
import { ConfirmModal } from '../Forms/Modal/Confirm';
import useDeleteSubActivity from '../../api/Activity/SubActivity/useDeleteSubActivity';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

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
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValueType[] | []>([]);
  const [tablePagination, setTablePagination] = useState<IPagination>({
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
    const data: { [key: string]: string | string[] | undefined | CheckboxValueType[] } = {};
    for (const k of Object.keys(searchData).filter(
      (item) => searchData[item] !== undefined
    )) {
      data[k] = searchData[k];
    }
    setSearchData(data);
  }, [setSearchData]);

  const { mutate: deleteCourse } = useDeleteSubActivity({
    onSuccess: () => {
      refetch();
    },
    onError: ({
      response: {
        data: { message: errorMessage }
      }
    }: {
      response: { data: { message: string } }
    }) => {
      void message.error(errorMessage, 2);
    }
  });

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
    searchData,
    setOpenConfirmModal,
    setCheckboxValues,
    checkboxValues
  );

  const handleTableChange: any = (pagination: IPagination) => {
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
    setCheckboxValues([]);
  };

  return (
    <>
      <ButtonContainer>
        <AsnButton className="default" onClick={onClearFilters}>
          Clear filters
        </AsnButton>
        <AsnButton className="default">Add Sub-Activity</AsnButton>
      </ButtonContainer>
      <Container>
        <Table
          columns={column}
          dataSource={data?.result}
          rowKey={(record) => record?.id}
          // scroll={{ x: 'calc(100vw + 600px)', y: 'calc(100vh - 250px)' }}
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
        <ConfirmModal
          styles={{ gap: '6rem' }}
          yes="Delete"
          no="Cancel"
          open={openConfirmModal}
          title="Are you sure you want to delete the course?"
          onSubmit={() => {
            deleteCourse({ id: inputActivityId });
            setOpenConfirmModal(false);
          }}
          onCancel={() => setOpenConfirmModal(false)}
        />
      </Container>
    </>
  );
};
export default SubActivitiesTable;
