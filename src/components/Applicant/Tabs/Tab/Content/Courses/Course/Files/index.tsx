import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AsnModal } from '../../../../../../../Forms/Modal';
import ApplicantPublicForm from '../../../../../../../ApplicantPublicForm';
import PreviewAssessmentForm from '../../../../../../../PreviewAssessmentForm';

import { Void } from '../../../../../../../../types/global';

import useGetAssessmentFormByCourseId from '../../../../../../../../api/AssessmentForm/useGetAssessmentFormCourseId';
import useResendApplicant from '../../../../../../../../api/Applicant/useResendApplicant';
import { AssessmentStatus, PATHS } from '../../../../../../../../helpers/constants';
import { ReactComponent as ResendSvg } from '../../Icons/resend.svg';
import { IFiles, IHistory } from '../../../../../../../../types/applicant';

const Modal = styled(AsnModal)`
  .ant-modal-content {
    padding: 0;

    .ant-spin-container > div {
      width: 100%;
    }
  }
`;

const Files: React.FC<IFiles> = ({ applicantId, history }) => {
  const [openPreviewApplicant, setOpenPreviewApplicant] = useState('');
  const [openPreviewAssessmentForm, setOpenPreviewAssessmentForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate: resendApplicant } = useResendApplicant('');
  const { data: forms } = useGetAssessmentFormByCourseId(history.sectionDataId,
    { type: history.status },
    {
      enabled: (Boolean(history.sectionDataId) &&
      Boolean(history.status === 'PRE_ASSESSMENT' || history.status === 'POST_ASSESSMENT'))
    });

  const hasActiveForm = forms[0];

  const onResendHandler: Void = () => {
    resendApplicant({
      id: applicantId,
      sectionDataId: history.sectionDataId,
      type: history.status
    });
  };

  const handleStatus = (history: IHistory): void => {
    const { preAssessmentForm, sectionDataId, status, postAssessmentForm } = history;
    if (preAssessmentForm || postAssessmentForm) {
      navigate(`/${PATHS.FILLEDOUTASSESSMENTFORM}`.replace(':id', applicantId), { state: { sectionDataId, type: status } });
    } else {
      setOpenPreviewAssessmentForm(true);
    }
  };

  return (
    <>
      {history.id !== undefined && history?.status === 'APPLICANT' && history?.applicationForm && (
        <span
          className="file"
          onClick={() => {
            setOpenPreviewApplicant('APPLICATION');
          }}
        >
          Application Form
        </span>
      )}
      {history?.status === 'PRE_ASSESSMENT' && history.hasPreAssessmentForm && (Boolean(((hasActiveForm?.active) ?? false))) && (
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
       {history?.status === 'POST_ASSESSMENT' && history.hasPostAssessmentForm && (Boolean(((hasActiveForm?.active) ?? false))) && (
        <div className="assessment-section">
          <span className="file" onClick={() => handleStatus(history)}>Post Assessment:</span>
          <div className="assessment">
            {!history?.postAssessmentForm
              ? (
                <div className="resend">
                  <p>{AssessmentStatus.NotSubmitted}</p>
                  <div className="icon" title="Re-send" onClick={onResendHandler}>
                    <ResendSvg />
                  </div>
                </div>
                )
              : history.postAssessmentForm && history.postAssessmentScore === null
                ? (
                    AssessmentStatus.NotAssessed
                  )
                : (
                  <p>score {history.postAssessmentScore}/{history.postAssessmentMaxScore}</p>
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
            target="_blank"
            download={f.path}
            rel="noreferrer"
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
      {openPreviewAssessmentForm &&
      <PreviewAssessmentForm
        openPreviewAssessmentForm={openPreviewAssessmentForm}
        setOpenPreviewAssessmentForm={setOpenPreviewAssessmentForm}
        formId={hasActiveForm.id}
        applicantPreview={true}
      />}
    </>
  );
};

export default Files;
