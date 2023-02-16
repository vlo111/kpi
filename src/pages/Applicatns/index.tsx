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

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>();

  const { projectId } = useProject();

  const [filters, setFilters] = useState<Iseacrh>({
    search: '',
    limit: 100,
    offset: 0,
    student: undefined,
    income: undefined,
    disability: undefined,
    gender: undefined,
    statuses: undefined
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
  console.log(applicantId);
  const showDrawer = (record: string): void => {
    setOpenRow(record);
    setApplicantId(record);
  };

  const onClose = (): void => {
    setOpenRow(false);
  };
  const { refetch } = useAllAplicants(filters, projectId, {
    onSuccess: (data: React.SetStateAction<IApplicants>): void => {
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
