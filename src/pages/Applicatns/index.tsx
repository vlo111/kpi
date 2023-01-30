import React, { useCallback, useEffect, useState } from 'react';
import ApplicantsSearch from './ApplicantsSearch';
import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { Table } from 'antd';

const ApplicantsData: React.FC = () => {
  const [filters, setFilters] = useState<any>({
    search: '',
    limit: 50,
    offset: 0
  });
  const [result, setResult] = useState<any>({ data: [], totalRecords: 0 });

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
    console.log(data, 'datadaatfat');

    setFilters((prevState: any) => ({
      ...prevState,
      ...data
    }));
  }, [filters]);

  const column = useColumn({ filterData });

  return (
    <Container>
<ApplicantsSearch filters={filters} serachData={serachData} />
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
