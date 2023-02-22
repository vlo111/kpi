import React, { useState } from 'react';
import { message as antMessage, Row } from 'antd';

import { ReactComponent as ArrowSvg } from '../../../../../Applicant/Status/Courses/Icons/arrow.svg';

import { ConfirmModal } from '../../../../../Forms/Modal/Confirm';
import useFinishApplicant from '../../../../../../api/Applicant/useFinishApplicant';
import useMoveApplicant from '../../../../../../api/Applicant/useMoveApplicant';
import { AsnCol } from '../../../../../Forms/Col';
import { AsnButton } from '../../../../../Forms/Button';
import { IApplicantData } from '../../../../../../types/api/activity/subActivity';
import styled from 'styled-components';
import ApproveModal from '../../../../../Applicant/Status/Courses/Course/Approve';
import RejectModal from '../../../../../Applicant/Status/Courses/Course/Reject';
import { useQueryClient } from '@tanstack/react-query';
import useStartSubActivityCourse from '../../../../../../api/Activity/SubActivity/useStartSubActivityCourse';

interface ISubActivityStatus {
  sectionDataId: string
  nextId: string | undefined
  applicants: IApplicantData[]
}

const StatusRow = styled(Row)`
  .next {
    position: absolute;
    padding: 0;
    right: 18rem;
    z-index: 2;
  }

  .approve {
    margin-right: 1rem;
    margin-left: 2rem;
  }

  .reject {
    margin-right: 0;
  }

  .reject,
  .approve {
    width: 6rem;
    height: 44px;
  }
`;

const SubActivityStatus: React.FC<ISubActivityStatus> = ({
  sectionDataId,
  applicants,
  nextId
}) => {
  const queryClient = useQueryClient();

  const { mutate: StartCourse } = useStartSubActivityCourse({
    onSuccess: () => {},
    onError: () => {}
  });

  const [openFinish, setOpenFinish] = useState<boolean>(false);
  const [openMove, setOpenMove] = useState<boolean>(false);
  const [openApprove, setOpenApprove] = useState<string>('');
  const [openReject, setOpenReject] = useState<string>('');

  const { mutate: finishApplicant } = useFinishApplicant();
  const { mutate: moveApplicant } = useMoveApplicant({
    onSuccess: () => {
      void queryClient.invalidateQueries([
        'api/applicant/:id/project/:projectId'
      ]);

      void antMessage.success('successfully moved', 2);

      if (nextId !== undefined) {
        StartCourse({ id: nextId });
      }
    },
    onError: (data: { response: { data: { message: string } } }) => {
      void antMessage.error(data.response.data.message, 2);
    }
  });

  return (
    <>
      <StatusRow className="content">
        <AsnCol span={24} className="next">
          <AsnButton
            className="reject"
            onClick={() => setOpenReject(sectionDataId)}
            disabled={!(applicants.length > 0)}
          >
            Reject
          </AsnButton>
          <AsnButton
            className="approve"
            onClick={() => setOpenApprove(sectionDataId)}
            disabled={!(applicants.length > 0)}
          >
            Approve
          </AsnButton>
        </AsnCol>
        <AsnCol span={24} className="end">
          <AsnButton
            className="finish default"
            onClick={() => setOpenFinish(!openFinish)}
          >
            Finish
          </AsnButton>
          <AsnButton
            icon={<ArrowSvg />}
            className="move primary"
            onClick={() => setOpenMove(!openMove)}
            disabled={!(applicants.length > 0)}
          >
            Move
          </AsnButton>
        </AsnCol>
      </StatusRow>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Complete"
        no="Cancel"
        open={openFinish}
        title="Are you sure you want to complete the learning process?"
        onSubmit={() => {
          finishApplicant({
            id: sectionDataId
          });
          setOpenFinish(!openFinish);
        }}
        onCancel={() => setOpenFinish(!openFinish)}
      />
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Move"
        no="Cancel"
        open={openMove}
        title="Are you sure you want to move the learner to the next section?"
        onSubmit={() => {
          moveApplicant({
            id: sectionDataId,
            applicantId: applicants.map((a) => a.id)
          });
          setOpenMove(!openMove);
        }}
        onCancel={() => setOpenMove(!openMove)}
      />
      <ApproveModal
        applicants={applicants}
        open={openApprove}
        onCancel={() => setOpenApprove('')}
      />
      <RejectModal
        applicants={applicants}
        open={openReject}
        onCancel={() => setOpenReject('')}
      />
    </>
  );
};

export default SubActivityStatus;
