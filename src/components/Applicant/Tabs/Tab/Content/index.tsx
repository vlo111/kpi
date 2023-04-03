import React from 'react';

import Courses from './Courses';
import { ApplicantDefaultStatus } from '../../../../../helpers/constants';
import { IApplicant, IHistory } from '../../../../../types/applicant';

interface ITabContent {
  history: IHistory[]
  applicant: IApplicant
}

export const TabContent: React.FC<ITabContent> = ({ history, applicant }) => {
  return (
    <Courses
      histories={
        history ??
        Array.from({ length: 5 }, (index: number, i) => ({
          id: undefined,
          status: Object.keys(ApplicantDefaultStatus)[i]
        }))
      }
      applicant={applicant}
    />
  );
};
