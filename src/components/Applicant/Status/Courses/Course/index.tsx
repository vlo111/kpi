import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, message, Row, Upload } from 'antd';
import moment from 'moment';

import ApproveModal from './Approve';
import Note from '../Note';

import { ICourseProps, IStyle } from '../../../../../types/applicant';
import { ApplicantDefaultStatus } from '../../../../../helpers/constants';

import { AsnButton } from '../../../../Forms/Button';
import RejectModal from './Reject';
import useFileUpload from '../../../../../api/Activity/Template/SubActivity/useUploadFile';
import {
  IUploadFileError,
  IUploadFileResponse
} from '../../../../../types/files';
import { ReactComponent as UploadSvg } from '../icons/Upload.svg';
import { ReactComponent as ArrowSvg } from '../icons/arrow.svg';
import useApplicantAttachFile from '../../../../../api/Applicant/useApplicantAttachFile';
import { ConfirmModal } from '../../../../Forms/Modal/Confirm';
import useFinishApplicant from '../../../../../api/Applicant/useFinishApplicant';
import useMoveApplicant from '../../../../../api/Applicant/useMoveApplicant';

const CourseItem = styled.div<IStyle>`
  display: flex;
  height: auto;
  margin: 0 20px 1rem 34px;

  .item-footer {
    width: 100%;

    .ant-col {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
  }

  .file {
    cursor: pointer;
    color: var(--dark-border-ultramarine);
    text-decoration: underline;
  }

  .note,
  .upload {
    cursor: pointer;
  }
  .inactive {
    svg path {
      fill: var(--dark-4);
    }

    .note,
    .upload {
      cursor: auto;
    }
  }

  .buttons {
    display: flex;
    justify-content: right;
    padding: 1rem;

    .reject,
    .approve {
      color: var(--white);
      border-radius: 8px;
      width: 6rem;

      &:hover {
        border-color: var(--white);
      }
    }

    .reject {
      margin-right: 1rem;
      background-color: var(--error);
    }

    .approve {
      background-color: var(--secondary-green);
    }
  }

  &:after {
    content: "";
    position: absolute;
    margin-top: 2rem;
    left: -12px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid var(--primary-light-orange);
    background: ${(props) => props.color};
  }
`;

const CourseSection = styled.div`
  .buttons {
    display: flex;
    justify-content: right;
    padding: 1rem;

    .move {
      margin-right: 1rem;
      margin-left: 2rem;
      padding: 10px 20px;
      display: flex;
      flex-direction: row-reverse;
      gap: 10px;

      &:hover path {
        fill: var(--dark-border-ultramarine);
      }
    }
  }
`;

const AntRow = styled(Row)<IStyle>`
  padding: 1rem;

  &.title {
    margin: 0 20px 1rem 4.3rem;
    background: var(--background);
    border: 0.5px solid #ebebeb;
    border-radius: 6px 6px 0 0;
    height: 48px;
  }

  &.content {
    background: ${(props) => props.color};
    border: 0.5px solid var(--light-border);
    width: 100%;

    .tools {
      display: flex;
      justify-content: flex-end;

      .upload {
        margin-right: 1rem;
      }
    }
    .files {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Course: React.FC<ICourseProps> = ({
  history,
  applicant,
  isActive,
  isLast
}) => {
  const [openApprove, setOpenApprove] = useState<string>('');
  const [openReject, setOpenReject] = useState<string>('');
  const [openFinish, setOpenFinish] = useState<string>('');
  const [openMove, setOpenMove] = useState<string>('');

  const { mutate: attachFile } = useApplicantAttachFile();
  const { mutate: finishApplicant } = useFinishApplicant();
  const { mutate: moveApplicant } = useMoveApplicant();

  const { mutate: uploadFile } = useFileUpload();

  const onUpload: (options: { file: any }) => void = (options) => {
    const { file } = options;
    uploadFile(
      { file, type: 'APPLICANT_DOCUMENT' },
      {
        onSuccess: ({ data: { result } }: IUploadFileResponse) => {
          attachFile({
            id: history.id,
            files: result
          });
          console.log(result, 'success');
        },
        onError: ({
          response: {
            data: { message: error }
          }
        }: IUploadFileError) => message.error(error, 2)
      }
    );
  };

  return (
    <CourseSection className={!isLast ? 'left-line' : 'last-line'}>
      <CourseItem
        color={
          isLast ? 'var(--primary-light-orange)' : 'var(--primary-light-3)'
        }
      >
        <AntRow
          className="content"
          color={isLast ? 'var(--background)' : 'var(--white)'}
        >
          <Col span={24}>
            <AntRow>
              <Col span={6}>
                {history.id === undefined ? 'N/A' : moment(history?.updatedAt).format('DD/MM/YYYY')}
              </Col>
              <Col span={6}>{ApplicantDefaultStatus[history.status]}</Col>
              <Col span={6} className="files">
                {history.id !== undefined && history.files.map((f) => (
                  <a
                    key={f.originalName}
                    className="file"
                    href={f.path}
                    download={f.path}
                  >
                    {f.originalName}
                  </a>
                ))}
              </Col>
              <Col
                offset={3}
                span={3}
                className={!isActive ? 'tools inactive' : 'tools'}
              >
                <div className="upload">
                  <Upload
                    showUploadList={false}
                    listType="text"
                    style={{ borderRadius: 0, width: '50%' }}
                    accept=".doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx,.png,.jpeg"
                    customRequest={onUpload}
                    maxCount={2}
                  >
                    <UploadSvg />
                  </Upload>
                </div>
                <div className="note">
                  <Note
                    id={`${history?.id}`}
                    inactive={!isActive}
                    text={history.note}
                  />
                </div>
              </Col>
            </AntRow>
          </Col>
          {isLast && history.status !== 'TRAINED' && (
            <Col span={24} className="buttons">
              <AsnButton
                className="reject"
                onClick={() => setOpenReject(history?.sectionDataId)}
              >
                Reject
              </AsnButton>
              <AsnButton
                className="approve"
                onClick={() => setOpenApprove(history?.sectionDataId)}
              >
                Approve
              </AsnButton>
            </Col>
          )}
        </AntRow>
      </CourseItem>
      {history.status === 'TRAINED' && (
        <Col span={24} className="buttons">
          <AsnButton
            className="finish default"
            onClick={() => setOpenFinish(history?.sectionDataId)}
          >
            Finish
          </AsnButton>
          <AsnButton
            icon={<ArrowSvg />}
            className="move primary"
            onClick={() => setOpenMove(history?.sectionDataId)}
          >
            Move
          </AsnButton>
        </Col>
      )}
      <ApproveModal
        applicant={applicant}
        open={openApprove}
        onCancel={() => setOpenApprove('')}
      />
      <RejectModal
        applicant={applicant}
        open={openReject}
        onCancel={() => setOpenReject('')}
      />
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
            applicantId: applicant.id
          });
          setOpenMove('');
        }}
        onCancel={() => setOpenMove('')}
      />
    </CourseSection>
  );
};

export default Course;
