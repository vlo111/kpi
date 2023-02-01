import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';

import UseSearch from './useSearch';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { UseFilterTags } from './useFilterTags';

import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { AsnForm } from '../../components/Forms/Form';
import { iFinishApplicant, IprevState } from './applicantsTypes';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>({ data: [], count: null });

  const [filters, setFilters] = useState<any>({
    search: '',
    limit: 100,
    offset: 0
  });

  const tableParams = {
    position: 'bottomCenter',
    pagination: {
      showSizeChanger: false
    }
  };

  const [form] = AsnForm.useForm();
  const [open, setOpen] = useState(false);

  const { refetch } = useAllAplicants(filters, {
    onSuccess: (data: []) => {
      setResult(data);
    }
  });
  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  const serachData = useCallback(
    (search: any) => {
      setFilters((prevState: IprevState) => ({
        ...prevState,
        search
      }));
    },
    [filters]
  );

  const filterData = useCallback(
    (data: IprevState) => {
      if (data !== undefined) {
        setFilters((prevState: IprevState) => ({
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
              from: values?.age?.[0],
              to: values?.age?.[1]
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

  return (
    <Container>
      <UseSearch filters={filters} serachData={serachData} />
      <>
        <UseFilterTags
          filters={filters}
          onFinish={onFinish}
          form={form}
          setFilters={setFilters}
          filterData={filterData}
          refetch={refetch}
        />
        <Table
          columns={column}
          dataSource={result?.result}
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          // onRow={(record) => {
          //   return {
          //     onClick: (event) => {
          //       // showDrawer(record?.key);
          //       // navigate(
          //       //    `/applicant/${record?.key}`
          //       // );
          //     }
          //   };
          // }}
          pagination={tableParams.pagination}
        />
      </>
    </Container>
  );
};
export default ApplicantsData;
