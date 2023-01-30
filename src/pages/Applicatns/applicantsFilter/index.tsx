// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { Tag } from 'antd';
// import _ from 'lodash';
// import React from 'react';
// import { filterApplicants } from '../applicantsTypes';

// const ApplicantsFilter: React.FC<filterApplicants> = ({ valueFilter, refetch, onFinish }: any) => {
//   const handleClose = (allApplicants: any): any => {
//     refetch();
//     _.omit(valueFilter, []);
//   };
//   return (
//     <>
//   {(valueFilter)
//     ? (
//         <>
//         {valueFilter?.gender !== undefined && <Tag onClose={() => {
//           const newAs = _.omit(valueFilter, ['gender']);
//           onFinish(newAs);
//         }} closable> { `Gender:${valueFilter?.gender}`}</Tag> }
//         {valueFilter?.student !== undefined && <Tag closable> { `Student:${valueFilter?.student}`}</Tag> }
//         {valueFilter?.status !== undefined && <Tag closable> { `Status:${valueFilter?.status}`}</Tag>}
//         {valueFilter?.paid_job !== undefined && <Tag closable> { `Paid job:${valueFilter?.paid_job}`}</Tag>}
//         {valueFilter?.vulnerability !== undefined && <Tag closable> { `Vulnerability:${valueFilter?.vulnerability}`}</Tag>}
//         {valueFilter?.region !== undefined && <Tag closable> { `Region:${valueFilter?.region}`}</Tag>}
//         <Tag closable onClose={(e) => {
//           handleClose('');
//         }}> { 'Clear All'}</Tag>

//         </>
//       )
//     : (
//            <></>
//       )}
// </>
//   );
// };
// export default ApplicantsFilter;
