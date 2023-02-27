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
  FileType
} from '../../../../../helpers/constants';

import Next from './Next';
import Note from '../Note';
import Files from './Files';
import Status from './Status';

import { ReactComponent as UploadSvg } from '../Icons/Upload.svg';
import { ReactComponent as FinishSvg } from '../Icons/finished-applicant.svg';

const CourseItem = styled.div<IStyle>`
  display: flex;
  height: auto;
  margin: 0 20px 1rem 34px;

  .assessment-section {
    display: flex;
    gap: 1rem;

    .assessment {
      .resend {
        display: flex;
        gap: 1rem;

        .icon {
          cursor: pointer;
        }
      }
    }
  }

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
  isLast,
  isFirst,
  isLastInactive,
  applicantId
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

  const isAllowEdit: boolean =
    history.status !== ApplicantAccessStatus.Trained && isLast && isNotRejected;

  const lastLine = !isLast ? 'left-line' : 'last-line';

  const firstLine = !isFirst ? lastLine : 'first-line';

  const drawLine = isLastInactive ? 'last-line' : firstLine;

  return (
    <div className={drawLine}>
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
                <Files applicantId={applicant.id} history={history} />
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
                    reasonsForRejection={history.reasonsForRejection}
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
            applicantId={applicantId}
          />
        </AntRow>
      </CourseItem>
      {history.status === ApplicantAccessStatus.Trained && (
        <div className="finish">
          <FinishSvg />
          <p className="text">The applicant has finished the course.</p>
        </div>
      )}
    </div>
  );
};

export default Course;
