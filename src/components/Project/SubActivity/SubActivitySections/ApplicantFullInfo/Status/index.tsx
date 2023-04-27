import React, { useState } from 'react';
import { Row } from 'antd';

import { ReactComponent as ArrowSvg } from '../../../../../Applicant/Tabs/Tab/Content/Courses/Icons/arrow.svg';

import { ConfirmModal } from '../../../../../Forms/Modal/Confirm';
import useFinishApplicant from '../../../../../../api/Applicant/useFinishApplicant';
import useMoveApplicant from '../../../../../../api/Applicant/useMoveApplicant';
import { AsnCol } from '../../../../../Forms/Col';
import { AsnButton } from '../../../../../Forms/Button';
import { IApplicantData } from '../../../../../../types/api/activity/subActivity';
import styled from 'styled-components';
import ApproveModal from '../../../../../Applicant/Tabs/Tab/Content/Courses/Course/Approve';
import RejectModal from '../../../../../Applicant/Tabs/Tab/Content/Courses/Course/Reject';

interface ISubActivityStatus {
  sectionDataId: string
  applicants: IApplicantData[]
  status: string
  sectionsCount: number
  tabIndex: number
}

const StatusRow = styled(Row)<any>`
  .next {
    position: absolute;
    padding: 0;
    right: ${(props) => props.right};
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
  status,
  sectionsCount,
  tabIndex
}) => {
  const [openFinish, setOpenFinish] = useState<boolean>(false);
  const [openMove, setOpenMove] = useState<boolean>(false);
  const [openApprove, setOpenApprove] = useState<string>('');
  const [openReject, setOpenReject] = useState<string>('');

  const { mutate: finishApplicant } = useFinishApplicant();
  const { mutate: moveApplicant } = useMoveApplicant();

  return (
    <>
      <StatusRow
        className="content"
        right={
          sectionsCount === 1
            ? '9rem'
            : sectionsCount > 1 && tabIndex === sectionsCount - 1
              ? '9rem'
              : '18rem'
        }
      >
        {status !== 'DONE' && (
          <>
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
          </>
        )}
        <AsnCol span={24} className="end">
          {status !== 'DONE' && (
            <AsnButton
              className="finish default"
              onClick={() => setOpenFinish(!openFinish)}
            >
              Finish
            </AsnButton>
          )}
          {sectionsCount === 1
            ? null
            : sectionsCount > 1 &&
            tabIndex === sectionsCount - 1
              ? null
              : (
            <AsnButton
              icon={<ArrowSvg />}
              className="move primary"
              onClick={() => setOpenMove(!openMove)}
              disabled={!(applicants.length > 0)}
            >
              Move
            </AsnButton>
                )}
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
