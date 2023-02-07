import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import moment from 'moment';

import Note from '../Note';
import ApproveModal from './Approve';

import { ICourseProps, IStyle } from '../../../../../types/applicant';
import { ApplicantStatus } from '../../../../../helpers/constants';
import { ReactComponent as UploadSvg } from '../icons/Upload.svg';

import { AsnButton } from '../../../../Forms/Button';

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
  }
`;

const Course: React.FC<ICourseProps> = ({ history, applicant, index, isActive, isLast }) => {
  const [openApprove, setOpenApprove] = useState<string>('');

  return (
    <div className={index !== 4 ? 'left-line' : 'last-line'}>
      <CourseItem color={isLast ? 'var(--primary-light-orange)' : 'var(--primary-light-3)'}>
        <AntRow className="content" color={isLast ? 'var(--background)' : 'var(--white)'}>
          <Col span={24}>
            <AntRow>
              <Col span={6}>
                {isActive
                  ? moment(history.updatedAt).format('DD/MM/YYYY')
                  : 'NA'}
              </Col>
              <Col span={6}>{Object.values(ApplicantStatus)[index]}</Col>
              <Col span={6}>
                {history?.files.map((f) => (
                  <div key={f.originalName} className="file">
                    {f.originalName}
                  </div>
                ))}
              </Col>
              <Col
                offset={3}
                span={3}
                className={!isActive ? 'tools inactive' : 'tools'}
              >
                <div className="upload">
                  <UploadSvg />
                </div>
                <div className="note">
                  <Note
                    id={`${history?.id}`}
                    inactive={!isActive}
                    text={history?.note ?? ''}
                  />
                </div>
              </Col>
            </AntRow>
          </Col>
          {isLast && (
              <Col span={24} className="buttons">
                <AsnButton className="reject">Reject</AsnButton>
                <AsnButton
                  className="approve"
                  onClick={() =>
                    setOpenApprove(history?.sectionDataId)
                  }
                >
                  Approve
                </AsnButton>
              </Col>
          )}
        </AntRow>
      </CourseItem>
      <ApproveModal applicant={applicant} open={openApprove} onCancel={() => setOpenApprove('')} />
    </div>
  );
};

export default Course;
