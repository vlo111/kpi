import React, { useCallback, useEffect, useState } from 'react';
import ApplicantsSearch from './ApplicantsSearch';
import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { Table, Tag, Form } from 'antd';
import _ from 'lodash';

const ApplicantsData: React.FC = () => {
  const [filters, setFilters] = useState<any>({
    search: '',
    limit: 50,
    offset: 0
  });
  const [result, setResult] = useState<any>({ data: [], totalRecords: 0 });
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
  console.log(filters);

  const onFinish = (values: any): any => {
    filterData({
      age: (Boolean((values?.age))) &&
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
  const closeFilter = (filter: string): any => {
    const newAs = _.omit(filters, [filter]);
    onFinish(newAs);
    form.setFieldValue([], filter);
  };
  const closeAllFilter = (): any => {
    const arr = ['gender', 'age', 'student', 'statuses', 'income', 'disability', 'regions'];
    for (let i = 0; i <= arr.length; i++) {
      closeFilter(arr[i]);
    }
    form.resetFields();
  };

  return (
    <Container>
<ApplicantsSearch filters={filters} serachData={serachData} />
<>
   {(filters)
     ? (
         <>
         {filters?.age !== undefined && <Tag onClose={() => closeFilter('age')} closable> { `Age:${filters?.age?.from} - ${filters?.age?.to}`}</Tag> }
         {filters?.gender !== undefined && <Tag onClose={() => closeFilter('gender')} closable> { `Gender:${filters?.gender}`}</Tag> }
         {filters?.student !== undefined && <Tag closable onClose={() => closeFilter('student')}> { `Student:${filters?.student}`}</Tag> }
         {filters?.statuses !== undefined && <Tag closable onClose={() => closeFilter('statuses')}> { `Status:${filters?.statuses}`}</Tag>}
         {filters?.income !== undefined && <Tag closable onClose={() => closeFilter('income')}> { `Paid job:${filters?.income}`}</Tag>}
         {filters?.disability !== undefined && <Tag closable onClose={() => closeFilter('disability')}> { `Vulnerability:${filters?.disability}`}</Tag>}
         {filters?.regions !== undefined && <Tag closable onClose={() => closeFilter('regions')}> { `Region:${filters?.regions}`}</Tag>}
       { filters && <Tag closable onClose={() => {
         closeAllFilter();
       }}> { 'Clear All'}</Tag>}
         </>
       )
     : (
            <></>
       )}
 </>

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
      />

</Container>
  );
};
export default ApplicantsData;
