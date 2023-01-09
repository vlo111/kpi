import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
// import CreateSubActivityModal from '../../components/Project/SubActivity/SubActivityModals/CreateModal';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';

const Wrapper = styled.div`
  padding: 40px 3.1vw 40px 3.1vw;
`;

const SubActivity: React.FC<{}> = () => {
  const { id: subActivityId } = useParams<{ id: any }>();
  console.log(subActivityId, 'db73cdc4-bf98-4987-bd73-f43b8a185c4f', '1633bd4a-8b3e-45a5-ad31-31e2b7e67619');
  const { data } = GetSingleSubActivity('1633bd4a-8b3e-45a5-ad31-31e2b7e67619', {
    onSuccess: (data: { result: any, count: any }) => console.log('')
  });
  return (
    <Wrapper>
      <SubActivityHeader activity={data}/>
      <SubActivitySections activity={data}/>
      {/* <CreateSubActivityModal templateId={'def416fc-4fc0-46dc-a274-fe5a985f5248'}/> */}
    </Wrapper>
  );
};

export default SubActivity;
