import React from 'react';
import { useProject } from '../../hooks/useProject';
import useGetProjectAllSubActivitiesList from '../../api/SubActivitiesList';

const SubActivitiesList: React.FC = () => {
//   const { id: courseId } = useParams<{ id: string }>();

  const { projectId }: { projectId: string } = useProject();

  console.log(projectId, 'projectIdprojectIdprojectId');
  const { data } = useGetProjectAllSubActivitiesList(projectId);

  console.log(data);

  return <div>SubActivitiesList</div>;
};

export default SubActivitiesList;
