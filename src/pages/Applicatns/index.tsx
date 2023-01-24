import React from 'react';
import ApplicantsDataList from './aplicantsDataTable';
import SearchApplicantsList from './searchAplicants';
import styled from 'styled-components';

const ApplicantsData: React.FC = () => {
  const Container = styled.div`
  background: #FFFFFF;
  box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05), 4px 4px 4px rgba(42, 85, 120, 0.05);
  border-radius: 20px 20px 0px 0px;
  margin: 16px 0px 0px 16px;
  
  .ant-input-group-wrapper{
    width: 200px;
    padding: 32px 0px 42px 0px;
  }
`;

  return (
    <Container>
<SearchApplicantsList/>
<ApplicantsDataList/>
</Container>
  );
};
export default ApplicantsData;
