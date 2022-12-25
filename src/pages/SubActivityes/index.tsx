import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';

import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';

const Wrapper = styled.div`
  padding: 40px 3.1vw 40px 3.1vw;
`;

const SubActivity: React.FC<{}> = () => {
  const { id: subActivityId } = useParams<{ id: any }>();
  console.log(subActivityId);
  const { data } = GetSingleSubActivity('0dc9242a-7091-4b64-993b-aca6440c03cb', {
    onSuccess: (data: { result: any, count: any }) => console.log('')
  });
  return (
    <Wrapper>
      <SubActivityHeader activity={data}/>
      <SubActivitySections activity={data}/>
    </Wrapper>
  );
};

export default SubActivity;
