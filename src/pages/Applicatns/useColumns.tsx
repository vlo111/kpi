import React from 'react';
import { Button, Popover } from 'antd';
import moment from 'moment';
import { FilterOutlined } from '@ant-design/icons';
import { UseFilters } from './useFilters';
import { Void } from '../../types/global';
import {
  CustomParagraphApplicants,
  CustomTitleApplicants
} from './applicantsStyle';

const today = new Date();

export const useColumn = ({ onFinish, form, setOpen, open }: any): any => {
  const handleOpenChange = (newOpen: boolean): Void => {
    return setOpen(newOpen);
  };
  return [
    {
      title: (
        <Popover
          content={
            <UseFilters setOpen={setOpen} onFinish={onFinish} form={form} />
          }
          title="Filter your results"
          trigger="click"
          overlayClassName="applicantsFilter"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button type="link" style={{ padding: '0' }}>
            <FilterOutlined className="filterIcon" />
          </Button>
        </Popover>
      ),
      key: 'filter',
      fixed: 'left',
      render: () => {
        return (
          <CustomParagraphApplicants
            width="1.1rem"
            ellipsis={{
              rows: 1
            }}
          >
            {}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="9rem">Name Surname</CustomTitleApplicants>
      ),
      dataIndex: 'fullName',
      key: 1,
      ellipsis: false,
      render: (text: string) => {
        return (
          <CustomParagraphApplicants
            width="9rem"
            ellipsis={{
              rows: 1
            }}
          >
            {text}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="5rem">Sector</CustomTitleApplicants>,
      dataIndex: 'sector',
      key: 2,
      ellipsis: false,
      render: (
        text: string,
        record: { courseMap: { course: { sector: { title: string } } } }
      ) => {
        return (
          <CustomParagraphApplicants
            width="5rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.courseMap?.course?.sector?.title}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="7rem">Course</CustomTitleApplicants>,
      dataIndex: 'course',
      key: 3,
      ellipsis: false,
      render: (
        text: string,
        record: { courseMap: { course: { title: string } } }
      ) => {
        return (
          <CustomParagraphApplicants
            width="7rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.courseMap?.course?.title}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="8rem">Status</CustomTitleApplicants>,
      key: 4,
      dataIndex: 'status',
      ellipsis: false,
      render: (text: string, record: { courseMap: { status: string } }) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.courseMap?.status}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="8rem">Region</CustomTitleApplicants>,
      key: 5,
      dataIndex: 'region',
      ellipsis: false,
      render: (text: string) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
          >
            {text}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="8rem">Phone number</CustomTitleApplicants>
      ),
      key: 6,
      dataIndex: 'phoneNumber',
      ellipsis: true,
      render: (text: string, record: { phone: number }) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.phone}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="3rem">Age</CustomTitleApplicants>,
      key: 7,
      dataIndex: 'age',
      ellipsis: false,
      render: (text: string, record: { dob: moment.MomentInput }) => {
        return (
          <CustomParagraphApplicants
            width="3rem"
            ellipsis={{
              rows: 1
            }}
          >
            {`${
              Number(moment?.(today)?.format('YYYY').valueOf()) -
              Number(moment(record?.dob).format('YYYY'))
            }`}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: <CustomTitleApplicants width="8rem">Gender</CustomTitleApplicants>,
      key: 8,
      dataIndex: 'gender',
      ellipsis: false,
      render: (text: string) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
          >
            {text}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="10rem">Education</CustomTitleApplicants>
      ),
      key: 9,
      dataIndex: 'education',
      ellipsis: false,
      render: (text: string, record: { educationLevel: string }) => {
        return (
          <CustomParagraphApplicants
            width="10rem"
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {record?.educationLevel}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="6rem">Student</CustomTitleApplicants>
      ),
      key: 1,
      dataIndex: 'student',
      ellipsis: false,
      render: (text: string) => {
        return (
          <CustomParagraphApplicants
            width="6rem"
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {text}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="9rem">Disability</CustomTitleApplicants>
      ),
      key: 11,
      dataIndex: 'vulnerability',
      ellipsis: false,
      render: (text: string, record: { vulnerabilities: string }) => {
        return (
          <CustomParagraphApplicants
            width="9rem"
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {record?.vulnerabilities}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="8rem">Paid job</CustomTitleApplicants>
      ),
      key: 12,
      dataIndex: 'workOrganisation',
      ellipsis: false,
      render: (text: string, record: { workOrganisation: string }) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {record?.workOrganisation}
          </CustomParagraphApplicants>
        );
      }
    },
    {
      title: (
        <CustomTitleApplicants width="8rem">
          Course source
        </CustomTitleApplicants>
      ),
      key: 13,
      dataIndex: 'informedAboutUs',
      ellipsis: false,
      render: (text: string, record: { informedAboutUs: string }) => {
        return (
          <CustomParagraphApplicants
            width="8rem"
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {record?.informedAboutUs}
          </CustomParagraphApplicants>
        );
      }
    }
  ];
};
