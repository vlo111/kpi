import React, { useState } from 'react';
import styled from 'styled-components';

import { AsnModal } from '../../../../../Forms/Modal';
import ApplicantPublicForm from '../../../../../ApplicantPublicForm';

import { Void } from '../../../../../../types/global';

import { AssessmentStatus } from '../../../../../../helpers/constants';
import useResendApplicant from '../../../../../../api/Applicant/useResendApplicant';
import { ReactComponent as ResendSvg } from '../../Icons/resend.svg';
import { IFiles } from '../../../../../../types/applicant';

const Modal = styled(AsnModal)`
  .ant-modal-content {
    padding: 0;

    .ant-spin-container > div {
      width: 100%;
    }
  }
`;

const Files: React.FC<IFiles> = ({ applicantId, history }) => {
  const { mutate: resendApplicant } = useResendApplicant('');

  const [openPreviewApplicant, setOpenPreviewApplicant] = useState('');

  const onResendHandler: Void = () => {
    resendApplicant({
      id: applicantId,
      sectionDataId: history.sectionDataId,
      type: history.status
    });
  };

  return (
    <>
      {history?.status === 'APPLICANT' && (
        <span
          className="file"
          onClick={() => {
            setOpenPreviewApplicant('APPLICATION');
          }}
        >
          Application Form
        </span>
      )}
      {history?.status === 'PRE_ASSESSMENT' && (
        <div className="assessment-section">
          <span className="file">Pre Assessment:</span>
          <div className="assessment">
            {history?.preAssessmentScore === null
              ? (
                  AssessmentStatus.NotAssessed
                )
              : (
              <div className="resend">
                <p>{AssessmentStatus.NotSubmitted}</p>
                <div className="icon" title="Re-send" onClick={onResendHandler}>
                  <ResendSvg />
                </div>
              </div>
                )}
          </div>
        </div>
      )}
      {history.id !== undefined &&
        history.files.map((f) => (
          <a
            key={f.originalName}
            className="file"
            href={f.path}
            download={f.path}
          >
            {f.originalName}
          </a>
        ))}
      <Modal
        footer={false}
        open={openPreviewApplicant !== ''}
        onCancel={() => setOpenPreviewApplicant('')}
        width="50%"
      >
        <ApplicantPublicForm
          applicantId={applicantId}
          sectionDataId={history.sectionDataId}
          type={openPreviewApplicant}
          preview={true}
        />
      </Modal>
    </>
  );
};

export default Files;
