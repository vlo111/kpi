import { useParams } from 'react-router-dom';
import React from 'react';
import { useGetProjectById } from '../../api/Project/useGetProject';

export const ProjectOverview: React.FC = () => {
  const { id } = useParams<string>();
  const data = useGetProjectById(id);

  return (
    <>
      <p><b>Title: </b> {data?.project?.title}</p>
      <p><b>Description: </b> {data?.project?.description}</p>
      <p><b>Description: </b> {data?.project?.startDate}</p>
      <p><b>Description: </b> {data?.project?.endDate}</p>
    </>
  );
};
