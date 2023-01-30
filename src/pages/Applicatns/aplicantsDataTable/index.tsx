// // /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// // /* eslint-disable @typescript-eslint/restrict-template-expressions */
// // /* eslint-disable no-lone-blocks */
// // import React, { useState } from 'react';
// // import {
// //   Table

// // } from 'antd';

//  import moment from 'moment';
//  import { ApplicatnList, DataType } from '../applicantsTypes';
//  import ApplicantsFilter from '../applicantsFilter';
//  import { useColumn } from './useColumns'
//  const ApplicantsDataList: React.FC<ApplicatnList> = ({
//    allApplicants,
//    searchAplicant,
//    search,
//    refetch,
//    showNote,
//    applicantsFilter
//  }) => {
//    const [valueFilter, setValueFilter] = useState<any>('');
//    const column = useColumn();
//    const onFinish = (values: any): any => {
//      const requestBody = {
//        statuses:
//          values?.status?.map((s: any) => {
//            return (
//              s
//            );
//          }),
//        //   age:
//        // {
//        //   from: values?.age?.[0] ?? 18,
//        //   to: values?.age?.[1] ?? 50
//        // },
//        regions:
//          values?.region?.map((i: any) => {
//            return (
//            );
//          }),
//        student: values?.student,
//        gender: values?.gender,
//        disability: values?.vulnerability,
//        income: values?.paid_job,
//        limit: 100,
//        offset:
//      };
//      applicantsFilter(requestBody);
//      // hide();
//      setValueFilter(values);
//    }
//    const data: DataType[] = [];
//    const today = new Date();
//    {
//      Boolean(allApplicants?.result) && search.length < 2 && (showNote?.result === undefined || (Boolean((searchAplicant?.result))))
//        ? (
//        <div>
//          {allApplicants?.result?.map((k: any) =>
//            data.push({
//              key: `${k?.id}`,
//              name: `${k?.fullName}`,
//              age: `${
//                Number(moment?.(today)?.format('YYYY').valueOf()) -
//                Number(moment(k?.dob).format('YYYY'))
//              }`,
//              education: `${k?.educationLevel}`,
//              sector: `${k?.courseMap?.course?.sector?.title}`,
//              course: `${k?.courseMap?.course?.title}`,
//              status: `${k?.courseMap?.status}`,
//              region: `${k?.region}`,
//              phoneNumber: `${k?.phone}`,
//              gender: `${k?.gender}`,
//              student: `${k?.student}`,
//              vulnerability: `${k?.vulnerabilities}`,
//              workOrganisation: `${k?.workOrganisation}`,
//              informedAboutUs: `${k?.informedAboutUs}`
//            })
//          )}
//        </div>
//          )
//        : (
//        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//        <div>
//          {searchAplicant?.result?.map((s: any) =>
//            data.push({
//              key: `${s?.id}`,
//              name: `${s?.fullName}`,
//              age: `${
//                Number(moment?.(today)?.format('YYYY').valueOf()) -
//                Number(moment(s?.dob).format('YYYY'))
//              }`,
//              education: `${s?.educationLevel}`,
//              sector: `${s?.courseMap?.course?.sector?.title}`,
//              course: `${s?.courseMap?.course?.title}`,
//              status: `${s?.courseMap?.status}`,
//              region: `${s?.region}`,
//              phoneNumber: `${s?.phone}`,
//              gender: `${s?.gender}`,
//              student: `${s?.student}`,
//              vulnerability: `${s?.vulnerabilities}`,
//              workOrganisation: `${s?.workOrganisation}`,
//              informedAboutUs: `${s?.informedAboutUs}`
//            })
//          )}
//        </div>
//          )
//            ? (
//            <div>
//                   {showNote?.result?.map((f: any) =>
//                     data.push({
//                       key: `${f?.id}`,
//                       name: `${f?.fullName}`,
//                       age: `${
//                Number(moment?.(today)?.format('YYYY').valueOf()) -
//                Number(moment(f?.dob).format('YYYY'))
//              }`,
//                       education: `${f?.educationLevel}`,
//                       sector: `${f?.courseMap?.course?.sector?.title}`,
//                       course: `${f?.courseMap?.course?.title}`,
//                       status: `${f?.courseMap?.status}`,
//                       region: `${f?.region}`,
//                       phoneNumber: `${f?.phone}`,
//                       gender: `${f?.gender}`,
//                       student: `${f?.student}`,
//                       vulnerability: `${f?.vulnerabilities}`,
//                       workOrganisation: `${f?.workOrganisation}`,
//                       informedAboutUs: `${f?.informedAboutUs}`
//                     })
//                   )}
//            </div>
//              )
//            : (<></>);
//    }
//    // const columns = ApplicantsColumns();
//    return (
//      <>
//       <div>
//       <ApplicantsFilter valueFilter={valueFilter} refetch={refetch} onFinish={onFinish}/>
//       {/* <ApplicantsColumns onFinish={onFinish}/> */}
//      </div>
//        <Table
//          columns={column}
//          dataSource={data}
//          rowClassName={(record, index) =>
//            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
//          }
//          onRow={(record) => {
//            return {
//              onClick: event => {
//                // showDrawer(record?.key);
//                // navigate(
//                //    `/applicant/${record?.key}`
//                // );
//              }
//            };
//          }}
//        />
//      </>
//    );
//  };
//  export default ApplicantsDataList