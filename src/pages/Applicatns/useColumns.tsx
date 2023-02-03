import React from 'react';
import { Button, Popover } from 'antd';
import moment from 'moment';
import { FilterOutlined } from '@ant-design/icons';
import { UseFilters } from './useFilters';

const today = new Date();

export const useColumn = ({
  filterData,
  onFinish,
  form,
  setOpen,
  open
}: any): {} => {
  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };
  return [
    {
      title: (
        <Popover
          content={UseFilters({ setOpen, filterData, onFinish, form })}
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
      ellipsis: true
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 2,
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.courseMap?.course?.sector?.title;
      }
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 3,
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.courseMap?.course?.title;
      }
    },
    {
      title: 'Status',
      key: 4,
      dataIndex: 'status',
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.courseMap?.status;
      }
    },
    {
      title: 'Region',
      key: 5,
      dataIndex: 'region',
      ellipsis: true
    },
    {
      title: 'Phone number',
      key: 6,
      dataIndex: 'phoneNumber',
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.phone;
      }
    },
    {
      title: 'Age',
      key: 7,
      dataIndex: 'age',
      ellipsis: true,
      render: (text: string, record: any) => {
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
      ellipsis: true
    },
    {
      title: 'Education',
      key: 9,
      dataIndex: 'education',
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.educationLevel;
      }
    },
    {
      title: 'Student',
      key: 1,
      dataIndex: 'student',
      ellipsis: true
    },
    {
      title: 'Vulnerability',
      key: 11,
      dataIndex: 'vulnerability',
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.vulnerabilities;
      }
    },
    {
      title: 'Paid job',
      key: 12,
      dataIndex: 'workOrganisation',
      ellipsis: true,
      render: (text: string, record: any) => {
        return record?.workOrganisation;
      }
    },
    {
      title: 'Course source ',
      key: 13,
      dataIndex: 'informedAboutUs',
      ellipsis: true
    }
  ];
};
