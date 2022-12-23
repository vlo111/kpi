import React from 'react';
import styled from 'styled-components';

import SubActivitySections from './SubActivitySections';
import SubActivityHeader from './SubActivtyHeader';

const Wrapper = styled.div`
  padding: 40px 3.1vw 40px 3.1vw;
`;

const SubActivity: React.FC<{}> = () => {
  return (
    <Wrapper>
      <SubActivityHeader />
      <SubActivitySections />
    </Wrapper>
  );
};

export default SubActivity;
