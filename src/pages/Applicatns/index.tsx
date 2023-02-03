import React, { useCallback, useEffect, useState } from 'react';
import { Table, Drawer } from 'antd';

import UseSearch from './useSearch';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { UseFilterTags } from './useFilterTags';

import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { AsnForm } from '../../components/Forms/Form';
import { iFinishApplicant, IprevState, Iseacrh } from './applicantsTypes';
import Applicant from '../../components/Applicant';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>();

  const [filters, setFilters] = useState<Iseacrh>({
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
  const [openRow, setOpenRow] = useState<any>(false);
  const [applicantId, setApplicantId] = useState('');
  const showDrawer = (record: string): void => {
    setOpenRow(record);
    setApplicantId(record);
  };

  const onClose = (): void => {
    setOpenRow(false);
  };

  const { refetch } = useAllAplicants(filters, {
    onSuccess: (data: React.SetStateAction<{ data: never[], count: null }>): void => {
      setResult(data);
    }
  });
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
    (data: IprevState) => {
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
          onRow={(record, index) => {
            return {
              onClick: () => {
                showDrawer(record?.id);
              }
            };
          }}
          pagination={tableParams.pagination}
        />
      </>
      <Drawer width={'80%'} placement="right" onClose={onClose} open={openRow}>
        <Applicant applicantId={applicantId} />
      </Drawer>
    </Container>
  );
};
export default ApplicantsData;
