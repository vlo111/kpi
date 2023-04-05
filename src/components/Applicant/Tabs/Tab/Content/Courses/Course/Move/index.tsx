import React, { useState } from 'react';

import { AsnButton } from '../../../../../../../Forms/Button';
import { ConfirmModal } from '../../../../../../../Forms/Modal/Confirm';

import { ApplicantAccessStatus } from '../../../../../../../../helpers/constants';
import useMoveApplicant from '../../../../../../../../api/Applicant/useMoveApplicant';
import useFinishApplicant from '../../../../../../../../api/Applicant/useFinishApplicant';

import { IMove } from '../../../../../../../../types/applicant';
import { ReactComponent as ArrowSvg } from '../../Icons/arrow.svg';
import { AsnCol } from '../../../../../../../Forms/Col';

const Move: React.FC<IMove> = ({ sectionDataId, applicantId, status }) => {
  const [openFinish, setOpenFinish] = useState<boolean>(false);
  const [openMove, setOpenMove] = useState<boolean>(false);

  const { mutate: finishApplicant } = useFinishApplicant();
  const { mutate: moveApplicant } = useMoveApplicant();

  return (
    <>
      {status === ApplicantAccessStatus.Trained && (
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
          >
            Move
          </AsnButton>
        </AsnCol>
      )}
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
            applicantId
          });
          setOpenMove(!openMove);
        }}
        onCancel={() => setOpenMove(!openMove)}
      />
    </>
  );
};

export default Move;
