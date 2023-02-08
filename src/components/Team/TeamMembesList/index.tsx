import React, { useState } from 'react';
import styled from 'styled-components';

import TeamsList from './TeamsTableLarge';
import SearchTeamMembers from './Search';

const TeamsWrapper = styled.div`
    padding: 16px;
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    height: 100%;
    background-color: var(--white);
    padding: 30px 16px 50px 16px;

    .search_users{
      &:hover{
        border: none !important;
      }
    }
`;

const TeamContent = styled.div`
  padding: 32px 64px 50px 64px;
  height: 100%;
`;

const UsersTeam: React.FC = () => {
  const [showModal, setShowModal] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  return (
    <TeamContent>
      <TeamsWrapper>
          <SearchTeamMembers showModal={showModal} setShowModal={setShowModal} totalCount={totalCount}/>
          <TeamsList setTotalCount={setTotalCount}/>
      </TeamsWrapper>
    </TeamContent>
  );
};

export default UsersTeam;
