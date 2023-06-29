import React from 'react';

import {
  ApplicantAccessStatus,
  ApplicantDefaultStatus
} from '../../../../../../../../helpers/constants';

import { ReactComponent as NotEnrolledSvg } from '../../Icons/not-enrolled.svg';
import { ReactComponent as DroppedSvg } from '../../Icons/dropped.svg';
import styled from 'styled-components';
import { IStatus } from '../../../../../../../../types/applicant';

const StatusSection = styled.div`
  margin-top: -1rem;
  position: absolute;
  left: 69%;
`;

const Status: React.FC<IStatus> = ({ status }) => {
  switch (status) {
    case ApplicantAccessStatus.NotEnrolled: {
      return (
        <StatusSection>
          <NotEnrolledSvg />
        </StatusSection>
      );
    }
    case ApplicantAccessStatus.Dropped: {
      return (
        <StatusSection>
          <DroppedSvg />
        </StatusSection>
      );
    }
    default: {
      // @ts-expect-error
      return ApplicantDefaultStatus[status];
    }
  }
};

export default Status;
