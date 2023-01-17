import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Col, Row } from 'antd';
import { ReactComponent as UploadSvg } from './icons/Upload.svg';
import Note from './Note';
import { IHistory } from '../../../../types/applicant';
import { ApplicantStatus } from '../../../../helpers/constants';
import moment from 'moment';
import { AsnButton } from '../../../Forms/Button';
import { AsnModal } from '../../../Forms/Modal';
import { AsnTextArea } from '../../../Forms/Input';

const courses = [...Array(6).keys()];

const pseudo = css`
  content: "";
  position: absolute;
  background: var(--white);
  height: 36px;
  width: 5px;
  left: -4px;
`;

const CoursesStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid var(--primary-light-orange);
  position: relative;
  padding-left: 24px;
  margin: 0 0 15px 2rem;

  .ant-popover-arrow {
    display: none;
  }

  &:before {
    ${pseudo};
  }

  &:after {
    ${pseudo};
    bottom: 0;
  }
`;

const CourseItem = styled.div`
  display: flex;
  margin: 0 20px 0 10px;
  height: auto;

  .file {
    cursor: pointer;
    color: var(--dark-border-ultramarine);
    text-decoration: underline;
  }

  .note,
  .upload {
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
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
    width: 100%;
    margin: 1rem;
    padding-right: 2rem;

    .ant-col {
      text-align: center;
    }

    .reject,
    .approve {
      color: var(--white);
      border-radius: 10px;

      &:hover {
        border-color: var(--white);
      }
    }

    .reject {
      background-color: var(--error);
    }

    .approve {
      border-radius: 10px;
      background-color: var(--success);
    }
  }

  &:after {
    content: "";
    position: absolute;
    margin-top: 2.2rem;
    left: -14px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid var(--primary-light-orange);
    background: var(--primary-light-3);
  }
`;

const AntRow = styled(Row)`
  padding: 1rem;

  &.title {
    margin: 0 20px 1rem 4.3rem;
    background: var(--background);
    border: 0.5px solid #ebebeb;
    border-radius: 6px 6px 0 0;
    height: 48px;
  }

  &.content {
    background-color: var(--background);
    width: 100%;

    .tools {
      display: flex;
      justify-content: right;
    }
  }
`;

const Courses: React.FC<{ histories: IHistory[], applicant: string }> = ({
  histories,
  applicant
}) => {
  const [openApprove, setOpenApprove] = useState<string>('');

  return (
    <div>
      <AntRow align="middle" className="title">
        <Col span={6}>Date</Col>
        <Col span={6}>Status</Col>
        <Col span={6}>Files</Col>
      </AntRow>
      <CoursesStyle>
        {courses.map((index: number) => (
          <CourseItem key={index}>
            <AntRow align="middle" className="content">
              <Col span={6}>
                {histories[index]?.updatedAt !== undefined
                  ? moment(histories[index]?.updatedAt).format('DD/MM/YYYY')
                  : 'NA'}
              </Col>
              <Col span={6}>{Object.values(ApplicantStatus)[index]}</Col>
              <Col span={6}>
                {histories[index]?.files.map((f) => (
                  <div key={f.originalName} className="file">
                    {f.originalName}
                  </div>
                ))}
              </Col>
              <Col
                span={5}
                className={
                  histories[index]?.updatedAt === undefined
                    ? 'tools inactive'
                    : 'tools'
                }
              >
                <Row>
                  <Col span={12} className="upload">
                    <UploadSvg />
                  </Col>
                  <Col span={12} className="note">
                    <Note
                      index={`${index + 1}`}
                      inactive={histories[index]?.updatedAt === undefined}
                    />
                  </Col>
                </Row>
              </Col>
              {histories[index]?.updatedAt !== undefined &&
                histories.length - 1 === index && (
                  <Col span={24}>
                    <Row className="buttons" justify="end">
                      <Col span={2}>
                        <AsnButton className="reject">Reject</AsnButton>
                      </Col>
                      <Col span={2}>
                        <AsnButton
                          className="approve"
                          onClick={() =>
                            setOpenApprove(histories[index]?.sectionDataId)
                          }
                        >
                          Approve
                        </AsnButton>
                      </Col>
                    </Row>
                  </Col>
              )}
            </AntRow>
          </CourseItem>
        ))}
      </CoursesStyle>
      <AsnModal
        footer={false}
        open={openApprove !== ''}
        title="Status Approval"
        onCancel={() => setOpenApprove('')}
        closable
        width="50%"
      >
        <div>
          <p>{applicant}</p>
        </div>
        <div>
          <p>Add note:</p>
        </div>
        <div>
          <AsnTextArea></AsnTextArea>
        </div>
        <Row className="buttons" justify={'end'}>
          <Col span={4}>
            <AsnButton className="default" onClick={() => setOpenApprove('')}>Cancel</AsnButton>
          </Col>
          <Col span={2}>
            <AsnButton className="primary">Approve</AsnButton>
          </Col>
        </Row>
      </AsnModal>
    </div>
  );
};

export default Courses;
