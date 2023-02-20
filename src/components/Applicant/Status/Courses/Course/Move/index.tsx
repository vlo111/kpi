import React, { useState } from 'react';
import { Col } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import { ConfirmModal } from '../../../../../Forms/Modal/Confirm';

import { ApplicantAccessStatus } from '../../../../../../helpers/constants';
import useMoveApplicant from '../../../../../../api/Applicant/useMoveApplicant';
import useFinishApplicant from '../../../../../../api/Applicant/useFinishApplicant';

import { IMove } from '../../../../../../types/applicant';
import { ReactComponent as ArrowSvg } from '../../Icons/arrow.svg';

const Move: React.FC<IMove> = ({ sectionDataId, applicantId, status, applicantsId }) => {
  const [openFinish, setOpenFinish] = useState<string>('');
  const [openMove, setOpenMove] = useState<string>('');

  const { mutate: finishApplicant } = useFinishApplicant();
  const { mutate: moveApplicant } = useMoveApplicant();

  return (
    <>
      {status === ApplicantAccessStatus.Trained && (
        <Col span={24} className="buttons">
          <AsnButton
            className="finish default"
            onClick={() => setOpenFinish(sectionDataId)}
            disabled={applicantsId !== undefined}
          >
            Finish
          </AsnButton>
          <AsnButton
            icon={<ArrowSvg />}
            className="move primary"
            onClick={() => setOpenMove(sectionDataId)}
            disabled={applicantsId !== undefined}
          >
            Move
          </AsnButton>
        </Col>
      )}
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Complete"
        no="Cancel"
        open={openFinish !== ''}
        title="Are you sure you want to complete the learning process?"
        onSubmit={() => {
          finishApplicant({
            id: openFinish
          });
          setOpenFinish('');
        }}
        onCancel={() => setOpenFinish('')}
      />
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Move"
        no="Cancel"
        open={openMove !== ''}
        title="Are you sure you want to move the  learner to the next section?"
        onSubmit={() => {
          moveApplicant({
            id: openMove,
            applicantId
          });
          setOpenMove('');
        }}
        onCancel={() => setOpenMove('')}
      />
    </>
  );
};

export default Move;
