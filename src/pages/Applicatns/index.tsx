import React, { useCallback, useEffect, useState } from 'react';
import { Table, Form } from 'antd';

import UseSearch from './useSearch';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { UseFiltersReset } from './useGetFilterrReset';

import useAllAplicants from '../../api/Applicants/useGetAllApplicants';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>({ data: [], count: null });
  const [tableParams, setTableParams] = useState<any>({
    pagination: {
      current: 1,
      total: 55,
      showSizeChanger: false
    }
  });

  const [filters, setFilters] = useState<any>({
    search: '',
    limit: 10,
    offset: 0
  });

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { refetch } = useAllAplicants(filters, {
    onSuccess: (data: any) => {
      setResult(data);
    }
  });
  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  const serachData = useCallback(
    (search: any) => {
      setFilters((prevState: any) => ({
        ...prevState,
        search
      }));
    },
    [filters]
  );

  const filterData = useCallback(
    (data: any) => {
      console.log(data, result, form.getFieldsValue());
      if (data !== undefined) {
        setFilters((prevState: any) => ({
          ...prevState,
          ...data
        }));
      }
    },
    [filters]
  );

  const onFinish = (values: any): any => {
    filterData({
      age: values?.age && {
        from: values?.age?.[0],
        to: values?.age?.[1]
      },
      regions: values?.region,
      statuses: values?.status,
      student: values?.student,
      gender: values?.gender,
      disability: values?.vulnerability,
      income: values?.paid_job
    });
    setOpen(false);
  };

  const column = useColumn({ filterData, onFinish, form, setOpen, open });
  // const onHandleChange = useCallback((pagination: any) => {
  //   setTableParams({
  //     pagination
  //   });
  //   setTableParams((prevState: any) => ({
  //     pagination: {
  //       current: 1,
  //       total: 10,
  //       showSizeChanger: false
  //     }
  //   }));
  // }, []);
  const handleTableChange: any = (
    pagination: any
  ) => {
    setTableParams({
      pagination
    });
    setFilters((prevState: any) => ({
      ...prevState,
      offset: pagination.current
    }));
  };
  console.log(tableParams.pagination);

  return (
    <Container>
      <UseSearch filters={filters} serachData={serachData} />
      <>
        <UseFiltersReset
          filters={filters}
          onFinish={onFinish}
          form={form}
          setFilters={setFilters}
          filterData={filterData}
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
          onChange={handleTableChange}
        />
      </>
    </Container>
  );
};
export default ApplicantsData;
