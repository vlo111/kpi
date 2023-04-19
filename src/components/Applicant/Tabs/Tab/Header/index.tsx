import React from 'react';
import ResultAreasTitles from '../../../../../pages/ProjectOverview/ResultAreasTitles';

interface ITabHeader {
  title: string
  index: number
}

export const TabHeader: React.FC<ITabHeader> = ({ title, index }) => {
  return (
    <ResultAreasTitles
      title={title}
      index={index}
      setActive={() => true}
      active={1}
      projectItems={2}
    />
  );
};
