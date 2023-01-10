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
  console.log(subActivityId, 'bb109140-2c50-46a5-9e1e-5058da747682', '1633bd4a-8b3e-45a5-ad31-31e2b7e67619');
  const { data } = GetSingleSubActivity('bb109140-2c50-46a5-9e1e-5058da747682', {
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
