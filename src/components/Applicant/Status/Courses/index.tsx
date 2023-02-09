import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import Course from './Course';
import { ICourses } from '../../../../types/applicant';

const CoursesStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 0;
  padding-bottom: 38px;
  margin: 0 0 1rem 2rem;

  .last-line {
    &:before {
      content: "";
      height: 2rem;
      background: var(--primary-light-orange);
      width: 3px;
      left: 0;
      position: absolute;
    }
  }

  &:before {
    content: "";
    position: absolute;
    background: var(--white);
    height: 36px;
    width: 5px;
  }

  .left-line {
    border-left: 3px solid var(--primary-light-orange);
  }

  .ant-popover-arrow {
    display: none;
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
    background-color: var(--white);
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

// const getHistories: any = (histories: any) => {
//   const statuses: any = Object.keys(ApplicantStatus);
//
//   const newArr: any[] = [];
//
//   const applicantStatus: any = ApplicantStatus;
//
//   for (let i = 0; i < statuses.length; i++) {
//     const status = applicantStatus[statuses[i]];
//
//     if (status === ApplicantStatus.Selection) {
//       if (histories[i] === undefined) {
//         newArr.push({
//           id: undefined,
//           updatedAt: 'NA',
//           status: statuses[i],
//           files: [],
//           note: undefined
//         });
//       } else {
//         if (histories[i].status === ApplicantStatus.Selection) {
//           newArr.push({
//             ...histories[i],
//             updatedAt: moment(histories[i].updatedAt).format('DD/MM/YYYY')
//           });
//         } else {
//           newArr.push({
//             id: undefined,
//             updatedAt: 'NA',
//             status: statuses[i],
//             files: [],
//             note: undefined
//           });
//
//           newArr.push({
//             ...histories[i],
//             updatedAt: moment(histories[i].updatedAt).format('DD/MM/YYYY')
//           });
//
//           if (histories[i]?.status === 'NOT_ENROLLED') {
//             break;
//           } else {
//             i++;
//           }
//         }
//       }
//     } else {
//       if (histories[i] !== undefined) {
//         newArr.push({
//           ...histories[i],
//           updatedAt: moment(histories[i].updatedAt).format('DD/MM/YYYY')
//         });
//       } else {
//         newArr.push({
//           id: undefined,
//           updatedAt: 'NA',
//           status: statuses[i],
//           files: [],
//           note: undefined
//         });
//       }
//     }
//
//     if (histories[i]?.status === 'NOT_ENROLLED') {
//       break;
//     }
//   }
//
//   return newArr;
// };

const Courses: React.FC<ICourses> = ({ histories, applicant }) => {
  return (
    <div>
      <AntRow align="middle" className="title">
        <Col span={6}>Date</Col>
        <Col span={6}>Status</Col>
        <Col span={6}>Files</Col>
      </AntRow>
      <CoursesStyle>
        {histories.map((history: any, index: number) => (
          <Course
            key={index}
            index={index}
            applicant={applicant}
            history={history}
            isLast={histories.length - 1 === index}
            isActive={history?.id !== undefined}
          />
        ))}
      </CoursesStyle>
    </div>
  );
};

export default Courses;
