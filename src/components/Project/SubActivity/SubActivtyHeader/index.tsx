import React from 'react';
import ProjectInformationHeader from '../../../Menu/ProjectInformationHeader';

const SubActivityHeader: React.FC<any> = ({ activity }) => {
  return (
    <ProjectInformationHeader overview={false} padding={'0 0 40px 0'} activity={activity} />
  );
};

export default SubActivityHeader;
