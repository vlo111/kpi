import React, { useState } from 'react';
import ApplicantsDataList from './aplicantsDataTable';
import SearchApplicantsList from './searchAplicants';
import styled from 'styled-components';
import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import useAllAplicantsSearch from '../../api/Applicants/aseGetApplicantsSearch';

const Container = styled.div`
  background: #FFFFFF;
  box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05), 4px 4px 4px rgba(42, 85, 120, 0.05);
  border-radius: 20px 20px 0px 0px;
  margin: 16px 0px 0px 16px;
  
  .ant-input-group-wrapper{
    width: 400px;
    padding: 32px 0px 42px 0px;
  }
  .ant-table-wrapper{
    height: 79vh;
    overflow: auto;
  }
`;
const ApplicantsData: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const { data: allApplicants } = useAllAplicants({
    staleTime: 1000 * 60 * 5
  });
  const { data: searchAplicant } = useAllAplicantsSearch(search, {
    enabled: (search.length > 2),
    staleTime: 1000 * 60 * 5
  });
  return (
    <Container>
<SearchApplicantsList setSearch={setSearch}
            search={search}/>
<ApplicantsDataList search={search} allApplicants={allApplicants} searchAplicant={searchAplicant}/>
</Container>
  );
};
export default ApplicantsData;
