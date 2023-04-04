import React, { useMemo } from 'react';

import Courses from './Courses';
import { ApplicantDefaultStatus } from '../../../../../helpers/constants';
import { IApplicant, IHistory } from '../../../../../types/applicant';
import useGetSection from '../../../../../api/Applicant/useGetSection';

interface ITabContent {
  histories: IHistory[]
  applicant: IApplicant
  sectionId: string
}

export const TabContent: React.FC<ITabContent> = ({
  histories,
  applicant,
  sectionId
}) => {
  const data = useGetSection(applicant.id, sectionId);

  const history = useMemo(() => data?.history?.data.result, [data]);

  const makeHistory = useMemo(() => {
    if (history !== undefined && typeof history[0] !== 'string') {
      return history;
    } else if (histories?.length > 0) {
      return histories;
    } else {
      return Array.from({ length: 5 }, (index: number, i) => ({
        id: undefined,
        status: Object.keys(ApplicantDefaultStatus)[i]
      }));
    }
  }, [history]);

  return (
    <Courses
      histories={makeHistory}
      applicant={applicant}
    />
  );
};
