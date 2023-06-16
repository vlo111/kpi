import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AsnModal } from '../../../../../../../Forms/Modal';
import ApplicantPublicForm from '../../../../../../../ApplicantPublicForm';
import PreviewAssessmentForm from '../../../../../../../PreviewAssessmentForm';

import { Void } from '../../../../../../../../types/global';

import useGetAssessmentFormByCourseId from '../../../../../../../../api/AssessmentForm/useGetAssessmentFormCourseId';
import useResendApplicant from '../../../../../../../../api/Applicant/useResendApplicant';
import {
  AssessmentStatus,
  PATHS
} from '../../../../../../../../helpers/constants';
import { ReactComponent as ResendSvg } from '../../Icons/resend.svg';
import { ReactComponent as DeleteSvg } from '../../../../../../../../assets/icons/delete.svg';
import { EyeOutlined } from '@ant-design/icons';
import { IFiles, IHistory } from '../../../../../../../../types/applicant';
import { Row, Space, Tooltip, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteFile from '../../../../../../../../api/Files/useDeleteFile';
import { IErrorMessage } from '../../../../../../../../types/project';
import FilesPreviewModal from '../../../../../../../Project/SubActivity/SubActivitySections/Files/FilesPreviewModal';

const Modal = styled(AsnModal)`
  .ant-modal-content {
    padding: 0;

    .ant-spin-container > div {
      width: 100%;
    }
  }
`;

const SingleFile = styled(Row)`
  &:hover {
    background: var(--primary-light-2);
  }
  padding: 2px;
  svg {
    height: 21px;
    width: 16px;
  }
`;

const Files: React.FC<IFiles> = ({ applicantId, history }) => {
  const [openPreviewApplicant, setOpenPreviewApplicant] = useState('');
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const [openPreviewAssessmentForm, setOpenPreviewAssessmentForm] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: resendApplicant } = useResendApplicant('');

  const { data: forms } = useGetAssessmentFormByCourseId(
    history.sectionDataId,
    { type: history.status },
    {
      enabled:
        Boolean(history.sectionDataId) &&
        Boolean(
          history.status === 'PRE_ASSESSMENT' ||
            history.status === 'POST_ASSESSMENT'
        )
    }
  );

  const { mutate: DeleteFile } = useDeleteFile({
    onSuccess: () => {
      void queryClient.invalidateQueries([
        'api/applicant/:id/course/:sectionDataId/history'
      ]);
    }
  });

  const deleteDoc = (name: string): void => {
    DeleteFile(name, {
      onSuccess: () => {
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('Successfully deleted', 2);
      },
      onError: ({
        response: {
          data: { message: errorMessage }
        }
      }: IErrorMessage) => {
        void message.error(errorMessage, 2);
      }
    });
  };

  const handlePreview = (path: string): void => {
    setOpenPreview(true);
    setUrl(path);
  };

  const hasActiveForm = forms[0];

  const onResendHandler: Void = () => {
    resendApplicant({
      id: applicantId,
      sectionDataId: history.sectionDataId,
      type: history.status
    });
  };

  const handleStatus = (history: IHistory): void => {
    const { preAssessmentForm, sectionDataId, status, postAssessmentForm } =
      history;
    if (preAssessmentForm || postAssessmentForm) {
      navigate(
        `/${PATHS.FILLEDOUTASSESSMENTFORM}`.replace(':id', applicantId),
        { state: { sectionDataId, type: status } }
      );
    } else {
      setOpenPreviewAssessmentForm(true);
    }
  };

  return (
    <>
      {history.id !== undefined &&
        history?.status === 'APPLICANT' &&
        history?.applicationForm && (
          <span
            className="file"
            onClick={() => {
              setOpenPreviewApplicant('APPLICATION');
            }}
          >
            Application Form
          </span>
      )}
      {history?.status === 'PRE_ASSESSMENT' &&
        history.hasPreAssessmentForm &&
        Boolean(hasActiveForm?.active ?? false) && (
          <div className="assessment-section">
            <span className="file" onClick={() => handleStatus(history)}>
              Pre Assessment:
            </span>
            <div className="assessment">
              {!history?.preAssessmentForm
                ? (
                <div className="resend">
                  <p>{AssessmentStatus.NotSubmitted}</p>
                  <div
                    className="icon"
                    title="Re-send"
                    onClick={onResendHandler}
                  >
                    <ResendSvg />
                  </div>
                </div>
                  )
                : history.preAssessmentForm &&
                history.preAssessmentScore === null
                  ? (
                      AssessmentStatus.NotAssessed
                    )
                  : (
                <p>
                  score {history.preAssessmentScore}/
                  {history.preAssessmentMaxScore}
                </p>
                    )}
            </div>
          </div>
      )}
      {history?.status === 'POST_ASSESSMENT' &&
        history.hasPostAssessmentForm &&
        Boolean(hasActiveForm?.active ?? false) && (
          <div className="assessment-section">
            <span className="file" onClick={() => handleStatus(history)}>
              Post Assessment:
            </span>
            <div className="assessment">
              {!history?.postAssessmentForm
                ? (
                <div className="resend">
                  <p>{AssessmentStatus.NotSubmitted}</p>
                  <div
                    className="icon"
                    title="Re-send"
                    onClick={onResendHandler}
                  >
                    <ResendSvg />
                  </div>
                </div>
                  )
                : history.postAssessmentForm &&
                history.postAssessmentScore === null
                  ? (
                      AssessmentStatus.NotAssessed
                    )
                  : (
                <p>
                  score {history.postAssessmentScore}/
                  {history.postAssessmentMaxScore}
                </p>
                    )}
            </div>
          </div>
      )}
      {history.id !== undefined &&
        history.files.map((f) => {
          let fileTitle: string = f?.originalName?.slice(0, 18);
          if (f?.originalName?.length > 18) {
            fileTitle += '...';
          }

          return (
            <SingleFile
              key={f.originalName}
              justify={'space-between'}
              wrap={false}
            >
              <Space.Compact
                style={{ gap: '8px', fontSize: 'var(--base-font-size)' }}
              >
                <Tooltip placement="top" title={f?.originalName}>
                  <a
                    key={f.originalName}
                    className="file"
                    href={f.path}
                    target="_blank"
                    download={f.path}
                    rel="noreferrer"
                  >
                    {fileTitle}
                  </a>
                </Tooltip>
              </Space.Compact>
              <Space.Compact style={{ gap: '8px' }}>
                <DeleteSvg
                  style={{ width: '9px', cursor: 'pointer' }}
                  onClick={() => deleteDoc(f.name)}
                />
                <EyeOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePreview(f?.path)}
                />
              </Space.Compact>
            </SingleFile>
          );
        })}
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
      <FilesPreviewModal
        setUrl={setUrl}
        url={url}
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
      />
      {openPreviewAssessmentForm && (
        <PreviewAssessmentForm
          openPreviewAssessmentForm={openPreviewAssessmentForm}
          setOpenPreviewAssessmentForm={setOpenPreviewAssessmentForm}
          formId={hasActiveForm.id}
          applicantPreview={true}
        />
      )}
    </>
  );
};

export default Files;
