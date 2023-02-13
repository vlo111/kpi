import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Col, message, Row, Upload } from 'antd';

import useApplicantAttachFile from '../../../../../api/Applicant/useApplicantAttachFile';
import useFileUpload from '../../../../../api/Activity/Template/SubActivity/useUploadFile';

import {
  IUploadFileError,
  IUploadFileResponse
} from '../../../../../types/files';
import { ICourseProps, IStyle, OnUpload } from '../../../../../types/applicant';

import {
  ApplicantAccessStatus,
  AssessmentStatus,
  FileType
} from '../../../../../helpers/constants';

import Next from './Next';
import Move from './Move';
import Note from '../Note';
import Status from './Status';

import { ReactComponent as UploadSvg } from '../Icons/Upload.svg';

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
  const { mutate: attachFile } = useApplicantAttachFile();

  const { mutate: uploadFile } = useFileUpload();

  const onUpload: OnUpload = (options) => {
    const { file } = options;
    uploadFile(
      { file, type: FileType.APPLICANT_DOCUMENT },
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

  const isNotRejected =
    history.status !== ApplicantAccessStatus.NotEnrolled &&
    history.status !== ApplicantAccessStatus.Dropped;

  const isAllowEdit: boolean = isLast && isNotRejected;

  return (
    <CourseSection className={!isLast ? 'left-line' : 'last-line'}>
      <CourseItem
        color={
          isLast && isNotRejected
            ? 'var(--primary-light-orange)'
            : 'var(--primary-light-3)'
        }
      >
        <AntRow
          className="content"
          color={isLast && isNotRejected ? 'var(--background)' : 'var(--white)'}
        >
          <Col span={24}>
            <AntRow>
              <Col span={6}>
                {history.id === undefined
                  ? 'N/A'
                  : moment(history?.updatedAt).format('DD/MM/YYYY')}
              </Col>
              <Col span={6}>
                <Status status={history.status} />
              </Col>
              <Col span={6} className="files">
                {history?.status === 'APPLICANT' && (
                  <span>
                    applicationform
                  </span>
                )}
                {history?.status === 'PRE_ASSESSMENT' && (
                  <span>
                    <span className="file">Pre Assessment:</span>
                    <span>
                      {history?.preAssessmentScore === null
                        ? AssessmentStatus.NotAssessed
                        : AssessmentStatus.NotSubmitted}
                    </span>
                  </span>
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
              </Col>
              <Col
                offset={3}
                span={3}
                className={!isActive ? 'tools inactive' : 'tools'}
              >
                <div className="upload">
                  {isNotRejected && (
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
                  )}
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
          <Next
            applicant={applicant}
            sectionDataId={history?.sectionDataId}
            isAllowEdit={isAllowEdit}
          />
        </AntRow>
      </CourseItem>
      <Move
        sectionDataId={history?.sectionDataId}
        applicantId={applicant.id}
        status={history.status}
      />
    </CourseSection>
  );
};

export default Course;
