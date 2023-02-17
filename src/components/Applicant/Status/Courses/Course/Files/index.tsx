import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AsnModal } from '../../../../../Forms/Modal';
import ApplicantPublicForm from '../../../../../ApplicantPublicForm';
import PreviewAssessmentForm from '../../../../../PreviewAssessmentForm';

import { Void } from '../../../../../../types/global';

import { AssessmentStatus, PATHS } from '../../../../../../helpers/constants';
import useResendApplicant from '../../../../../../api/Applicant/useResendApplicant';
import { ReactComponent as ResendSvg } from '../../Icons/resend.svg';
import { IFiles, IHistory } from '../../../../../../types/applicant';

const Modal = styled(AsnModal)`
  .ant-modal-content {
    padding: 0;

    .ant-spin-container > div {
      width: 100%;
    }
  }
`;

const Files: React.FC<IFiles> = ({ applicantId, history }) => {
  const navigate = useNavigate();
  const { mutate: resendApplicant } = useResendApplicant();

  const [openPreviewApplicant, setOpenPreviewApplicant] = useState(false);
  const [openPreviewAssessmentForm, setOpenPreviewAssessmentForm] = useState<boolean>(false);

  const onResendHandler: Void = () => {
    resendApplicant({
      id: applicantId,
      sectionDataId: history.sectionDataId,
      type: history.status
    });
  };

  const handleStatus = (history: IHistory): void => {
    const { preAssessmentForm, sectionDataId, status } = history;
    if (preAssessmentForm) {
      navigate(`/${PATHS.FILLEDOUTASSESSMENTFORM}`.replace(':id', applicantId), { state: { sectionDataId, type: status } });
    }
  };

  return (
    <>
      {history?.status === 'APPLICANT' && (
        <span
          className="file"
          onClick={() => {
            setOpenPreviewApplicant(!openPreviewApplicant);
          }}
        >
          Application Form
        </span>
      )}
      {history?.status === 'PRE_ASSESSMENT' && (
        <div className="assessment-section">
          <span className="file" onClick={() => handleStatus(history)}>Pre Assessment:</span>
          <div className="assessment">
            {!history?.preAssessmentForm
              ? (
                <div className="resend">
                  <p>{AssessmentStatus.NotSubmitted}</p>
                  <div className="icon" title="Re-send" onClick={onResendHandler}>
                    <ResendSvg />
                  </div>
                </div>
                )
              : history.preAssessmentForm && history.preAssessmentScore === null
                ? (
                    AssessmentStatus.NotAssessed
                  )
                : (
                  <p>score {history.preAssessmentScore}/{history.preAssessmentMaxScore}</p>
                  )
            }
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
        open={openPreviewApplicant}
        onCancel={() => setOpenPreviewApplicant(false)}
        width="50%"
      >
        <ApplicantPublicForm
          id={'da912a5a-aad1-4599-bda6-f67b67ba2828'}
          preview={true}
        />
      </Modal>
      {openPreviewAssessmentForm && <PreviewAssessmentForm
        openPreviewAssessmentForm={openPreviewAssessmentForm}
        setOpenPreviewAssessmentForm={setOpenPreviewAssessmentForm}
      />}
    </>
  );
};

export default Files;
