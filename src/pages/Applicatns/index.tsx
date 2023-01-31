import React, { useCallback, useEffect, useState } from 'react';
import { Table, Form } from 'antd';

import UseSearch from './useSearch';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { UseFiltersReset } from './useGetFilterrReset';

import useAllAplicants from '../../api/Applicants/useGetAllApplicants';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>({ data: [], count: 0 });
  // const [tableParams, setTableParams] = useState<any>({
  //   pagination: {
  //     current: 1,
  //     total: 66,
  //     showSizeChanger: false
  //   }
  // });

  const [filters, setFilters] = useState<any>({
    search: '',
    limit: 10,
    offset: 0
  });

  // console.log(tableParams);

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

  const serachData = useCallback((search: any) => {
    setFilters((prevState: any) => ({
      ...prevState,
      search
    }));
  }, [filters]);

  const filterData = useCallback((data: any) => {
    setFilters((prevState: any) => ({
      ...prevState,
      ...data
    }));
  }, [filters]);

  const onFinish = (values: any): any => {
    filterData({
      age: values?.age &&
        {
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

  return (
    <Container>
<UseSearch filters={filters} serachData={serachData} />
<>
<UseFiltersReset filters={filters} onFinish={onFinish} form={form} setFilters={setFilters}/>
<Table
        columns={column}
        dataSource={result?.result}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        onRow={(record) => {
          return {
            onClick: event => {
              // showDrawer(record?.key);
              // navigate(
              //    `/applicant/${record?.key}`
              // );
            }
          };
        }}
        // pagination={tableParams.pagination}
        // onChange={handleTableChange}
        // onChange={onHandleChange}
        // pagination={{
        //   total: result.count,
        //   showSizeChanger: false

        // }}
      />
</>
</Container>
  );
};
export default ApplicantsData;
