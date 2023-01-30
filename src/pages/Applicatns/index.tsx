import React, { useCallback, useEffect, useState } from 'react';
import ApplicantsSearch from './ApplicantsSearch';
import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import { Container } from './applicantsStyle';
import { useColumn } from './useColumns';
import { Table } from 'antd';

const ApplicantsData: React.FC = () => {
  const [filter, setFilter] = useState<any>({
    search: '',
    limit: 50,
    offset: 0
  });
  const [result, setResult] = useState<any>({ data: [], totalRecords: 0 });

  const { refetch } = useAllAplicants(filter, {
    onSuccess: (data: any) => {
      setResult(data);
    }
  });
  const column = useColumn();
  useEffect(() => {
    refetch();
  }, [refetch, filter]);

  const serachData = useCallback((val: any) => {
    setFilter((prevState: any) => ({
      ...prevState,
      search: val
    }));
  }, [filter]);

  return (
    <Container>
<ApplicantsSearch filter={filter} serachData={serachData}/>
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
