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
import { HandleTableOnChange } from '../../types/teams';
import _ from 'lodash';

const ApplicantsData: React.FC = () => {
  const [result, setResult] = useState<any>();
  const [count, setCount] = useState<number>();
  const { projectId } = useProject();
  const [offset, setOffset] = useState<number>(0);

  const [filters, setFilters] = useState<Iseacrh>({
    search: undefined,
    limit: 10,
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

  const { refetch, isLoading } = useAllAplicants(
    {
      ...filters,
      offset
    },
    projectId,
    {
      onSuccess: (data: IApplicants): void => {
        setResult(data);
        setCount(data?.count);
      }
    }
  );

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
      regions: values?.regions?.length > 0 ? values?.regions : undefined,
      statuses: values?.statuses?.length > 0 ? values?.statuses : undefined,
      student: values?.student,
      gender: values?.gender,
      disability: values?.disability,
      income: values?.income
    });

    setOpen(false);
    form.setFieldValue('clearAll', true);
    setOffset(0);
  };

  useEffect(() => {
    const filtersClone = _.cloneDeep(filters);
    delete filtersClone.limit;
    delete filtersClone.offset;
    const allUndefined = Object.values(filtersClone).every(
      (elem) => elem === undefined
    );
    if (allUndefined) {
      form.setFieldValue('clearAll', false);
    }
  }, [filters]);

  const column = useColumn({ filterData, onFinish, form, setOpen, open });

  const handleTableChange: HandleTableOnChange = (pagination) => {
    const { current } = pagination;
    setOffset(((current as number) - 1) * 10);
  };

  return (
    <Container>
      <UseSearch
        setOffset={setOffset}
        serachData={serachData}
        result={result}
      />
      <>
        <UseFilterTags
          filters={filters}
          onFinish={onFinish}
          form={form}
          setFilters={setFilters}
          refetch={refetch}
          setOffset={setOffset}
        />
        <Table
          columns={column}
          dataSource={result?.result}
          rowKey={(record) => record?.id as string}
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
          pagination={{
            current: offset / 10 + 1,
            pageSize: 10,
            showSizeChanger: false,
            total: count
          }}
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
