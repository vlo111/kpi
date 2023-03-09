import React, { useCallback, useEffect, useState } from 'react';
import { Table, Drawer } from 'antd';

import UseSearch from './useSearch';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { UseFilterTags } from './useFilterTags';

import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { AsnForm } from '../../components/Forms/Form';
import { IApplicants, iFinishApplicant, Iseacrh } from './applicantsTypes';
import Applicant from '../../components/Applicant';
import { useProject } from '../../hooks/useProject';
import { HandleTableOnChange, TableParams } from '../../types/teams';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>();
  const [count, setCount] = useState<number>();
  const { projectId } = useProject();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false
    }
  });

  const [filters, setFilters] = useState<Iseacrh>({
    search: '',
    limit: tableParams.pagination?.pageSize,
    offset: 1,
    student: undefined,
    income: undefined,
    disability: undefined,
    gender: undefined,
    statuses: undefined,
    age: undefined
  });

  const [form] = AsnForm.useForm();
  const [open, setOpen] = useState(false);
  const [openRow, setOpenRow] = useState<any>(false);
  const [applicantId, setApplicantId] = useState('');

  const showDrawer = (record: string): void => {
    setOpenRow(record);
    setApplicantId(record);
  };

  const onClose = (): void => {
    setOpenRow(false);
  };

  const { refetch, isLoading } = useAllAplicants(filters, projectId, {
    onSuccess: (data: IApplicants): void => {
      setResult(data);
      setCount(data?.count);
    }
  });
  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: count
      }
    });
  }, [JSON.stringify(tableParams), isLoading, count]);
  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  const serachData = useCallback(
    (search: string) => {
      setFilters((prevState) => ({
        ...prevState,
        search
      }));
    },
    [filters]
  );

  const filterData = useCallback(
    (data: Iseacrh) => {
      if (data !== undefined) {
        setFilters((prevState) => ({
          ...prevState,
          ...data
        }));
      }
    },
    [filters]
  );
  const onFinish = (values: iFinishApplicant): void => {
    filterData({
      age:
        values?.age !== undefined
          ? {
              from: values?.age?.[0] ?? values?.age?.from,
              to: values?.age?.[1] ?? values?.age?.to
            }
          : undefined,
      regions: values?.regions,
      statuses: values?.statuses,
      student: values?.student,
      gender: values?.gender,
      disability: values?.disability,
      income: values?.income
    });

    setOpen(false);
    form.setFieldValue('clearAll', true);
  };

  const column = useColumn({ filterData, onFinish, form, setOpen, open });

  const handleTableChange: HandleTableOnChange = (pagination) => {
    setTableParams({
      pagination
    });
    setFilters((prevState) => ({
      ...prevState,
      limit: tableParams.pagination?.pageSize,
      offset:
      tableParams.pagination?.current !== undefined &&
      tableParams.pagination?.pageSize !== undefined
        ? (tableParams.pagination?.current - 1) *
          tableParams.pagination?.pageSize
        : 0
    }));
  };

  return (
    <Container>
      <UseSearch filters={filters} serachData={serachData} result={result}/>
      <>
        <UseFilterTags
          filters={filters}
          onFinish={onFinish}
          form={form}
          setFilters={setFilters}
          refetch={refetch}
        />
        <Table
          columns={column}
          dataSource={result?.result}
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          onRow={(record, index) => {
            return {
              onClick: () => {
                showDrawer(record?.id);
              }
            };
          }}
          loading={isLoading}
          pagination={tableParams?.pagination}
          onChange={handleTableChange}

        />
      </>
      <Drawer width={'80%'} placement="right" onClose={onClose} open={openRow}>
        <Applicant applicantId={applicantId} />
      </Drawer>
    </Container>
  );
};
export default ApplicantsData;
