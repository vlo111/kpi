import React, { useState } from 'react';
import styled from 'styled-components';

import TeamsList from './TeamsTableLarge';
import SearchTeamMembers from './Search';
import usePermissionsListByProjectId from '../../../api/Teams/useGetPermissionsList';
import { useProject } from '../../../hooks/useProject';

const TeamsWrapper = styled.div`
  padding: 16px;
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  height: 100%;
  background-color: var(--white);
  padding: 30px 16px 50px 16px;

  .search_users {
    &:hover {
      border: none !important;
    }
  }
`;

const TeamContent = styled.div`
  padding: 32px 64px 50px 64px;
  height: 100%;
`;

const UsersTeam: React.FC = () => {
  const { projectId } = useProject();
  const [showModal, setShowModal] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const { data } = usePermissionsListByProjectId(projectId);

  return (
    <TeamContent>
      <TeamsWrapper>
        {Boolean(data) &&
        <SearchTeamMembers
          edit={false}
          showModal={showModal}
          setShowModal={setShowModal}
          totalCount={totalCount}
          permissionsList={data}
        />}
        <TeamsList setTotalCount={setTotalCount} permissionsList={data}/>
      </TeamsWrapper>
    </TeamContent>
  );
};

export default UsersTeam;
