import React from 'react';
import { Button, Popover, Typography } from 'antd';
import moment from 'moment';
import { FilterOutlined } from '@ant-design/icons';
import { UseFilters } from './useFilters';

const today = new Date();
const { Paragraph } = Typography;

export const useColumn = ({ onFinish, form, setOpen, open }: any): any => {
  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };
  return [
    {
      title: (
        <Popover
          content={UseFilters({
            setOpen,
            onFinish,
            form
          })}
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
      width: 50
    },
    {
      title: 'Name Surname',
      dataIndex: 'fullName',
      key: 1,
      ellipsis: false
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 2,
      ellipsis: false,
      render: (
        text: string,
        record: { courseMap: { course: { sector: { title: string } } } }
      ) => {
        return record?.courseMap?.course?.sector?.title;
      }
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 3,
      ellipsis: false,
      render: (
        text: string,
        record: { courseMap: { course: { title: string } } }
      ) => {
        return record?.courseMap?.course?.title;
      }
    },
    {
      title: 'Status',
      key: 4,
      dataIndex: 'status',
      ellipsis: false,
      render: (text: string, record: { courseMap: { status: string } }) => {
        return record?.courseMap?.status;
      }
    },
    {
      title: 'Region',
      key: 5,
      dataIndex: 'region',
      ellipsis: false
    },
    {
      title: 'Phone number',
      key: 6,
      dataIndex: 'phoneNumber',
      ellipsis: true,
      render: (text: string, record: { phone: number }) => {
        return record?.phone;
      }
    },
    {
      title: 'Age',
      key: 7,
      dataIndex: 'age',
      ellipsis: false,
      render: (text: string, record: { dob: moment.MomentInput }) => {
        return `${
          Number(moment?.(today)?.format('YYYY').valueOf()) -
          Number(moment(record?.dob).format('YYYY'))
        }`;
      }
    },
    {
      title: 'Gender',
      key: 8,
      dataIndex: 'gender',
      ellipsis: false
    },
    {
      title: 'Education',
      key: 9,
      dataIndex: 'education',
      ellipsis: false,
      render: (text: string, record: { educationLevel: string }) => {
        return (
          <Paragraph
            strong
            ellipsis={{
              rows: 2
            }}
            className="tableName"
          >
            {record?.educationLevel}
          </Paragraph>
        );
      }
    },
    {
      title: 'Student',
      key: 1,
      dataIndex: 'student',
      ellipsis: false
    },
    {
      title: 'Vulnerability',
      key: 11,
      dataIndex: 'vulnerability',
      ellipsis: false,
      render: (text: string, record: { vulnerabilities: string }) => {
        return (
          <Paragraph
            strong
            ellipsis={{
              rows: 2
            }}
            className="tableName"
          >
            {record?.vulnerabilities}
          </Paragraph>
        );
      }
    },
    {
      title: 'Paid job',
      key: 12,
      dataIndex: 'workOrganisation',
      ellipsis: false,
      render: (text: string, record: { workOrganisation: string }) => {
        return record?.workOrganisation;
      }
    },
    {
      title: 'Course source ',
      key: 13,
      dataIndex: 'informedAboutUs',
      ellipsis: false,
      render: (text: string, record: { informedAboutUs: string }) => {
        return (
          <Paragraph
            strong
            ellipsis={{
              rows: 2
            }}
            className="tableName"
          >
            {record?.informedAboutUs}
          </Paragraph>
        );
      }
    }
  ];
};
