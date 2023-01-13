import React from 'react';
import styled, { css } from 'styled-components';
import { Col, Row } from 'antd';
import { ReactComponent as UploadSvg } from './icons/Upload.svg';
import Note from './Note';

const courses = [...Array(6).keys()];

const pseudo = css`
  content: "";
  position: absolute;
  background: var(--white);
  height: 3rem;
  width: 4px;
  left: -3px;
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
  height: 6rem;

  .file {
    cursor: pointer;
    color: var(--dark-border-ultramarine);
    text-decoration: underline;
  }

  .note {
    cursor: pointer;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
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

    > .ant-col:last-child {
      display: flex;
      justify-content: right;
    }
  }
`;

const Courses: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div>
      <AntRow align="middle" className="title">
        <Col span={6}>Data</Col>
        <Col span={6}>Status</Col>
        <Col span={6}>Files</Col>
        <Col></Col>
      </AntRow>
      <CoursesStyle>
        {courses.map((index) => (
          <CourseItem key={index}>
            <AntRow align="middle" className="content">
              <Col span={6}>{item.date}</Col>
              <Col span={6}>{item.title}</Col>
              <Col span={6}>
                {item.files.map((f: string) => (
                  <div key={f} className="file">
                    {f}
                  </div>
                ))}
              </Col>
              <Col span={5}>
                <Row>
                  <Col span={12}>
                    <UploadSvg />
                  </Col>
                  <Col span={12} className="note">
                    <Note index={`${index + 1}`} />
                  </Col>
                </Row>
              </Col>
            </AntRow>
          </CourseItem>
        ))}
      </CoursesStyle>
    </div>
  );
};

export default Courses;
