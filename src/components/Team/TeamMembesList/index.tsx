import React, { useState } from 'react';

import TeamsList from './TeamsTableLarge';
import SearchTeamMembers from './Search';
import usePermissionsListByProjectId from '../../../api/Teams/useGetPermissionsList';
import { useProject } from '../../../hooks/useProject';
import { TeamContent, TeamsWrapper } from '../Styles';

const UsersTeam: React.FC = () => {
  const { projectId } = useProject();
  const [showModal, setShowModal] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
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
          setSearchText={setSearchText}
        />}
        <TeamsList setTotalCount={setTotalCount} permissionsList={data} searchText={searchText}/>
      </TeamsWrapper>
    </TeamContent>
  );
};

export default UsersTeam;
