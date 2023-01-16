import React from 'react';
import ProjectInformationHeader from '../../../Menu/ProjectInformationHeader';

const SubActivityHeader: React.FC<any> = ({ activity, region }) => {
  return (
    <ProjectInformationHeader overview={false} padding={'0 0 4vh 0'} activity={activity} region={region} />
  );
};

export default SubActivityHeader;
