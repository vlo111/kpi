import React, { useState } from 'react';
import ApplicantsDataList from './aplicantsDataTable';
import SearchApplicantsList from './searchAplicants';
import useAllAplicants from '../../api/Applicants/useGetAllApplicants';
import useAllAplicantsSearch from '../../api/Applicants/aseGetApplicantsSearch';
import { Container } from './applicantsStyle';

const ApplicantsData: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const { data: allApplicants, refetch } = useAllAplicants({
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
<ApplicantsDataList search={search} allApplicants={allApplicants} searchAplicant={searchAplicant} refetch={refetch}/>
</Container>
  );
};
export default ApplicantsData;
