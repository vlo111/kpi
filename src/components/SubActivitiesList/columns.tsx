import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import moment from 'moment';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { getColumnSearchProps } from './InputFilter';
import { getColumnSearchPropsCheckbox } from './CheckboxFilters';
import { subActivityTableFilterStatus } from '../../helpers/constants';
// import { FilterOutlined } from '@ant-design/icons';
// import { Void } from '../../types/global';

export const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 20px;
`;

// const today = new Date();
const { Paragraph } = Typography;

export const useColumn = (
  setOpenCreateSubActivity: any,
  setInputActivityId: any,
  filterData: any
): any => {
  console.log(filterData);

  const onDeleteClick = (e: any): void => {
    e.stopPropagation();
    console.log('????????????????????');
  };

  const onEditClick = (e: any, id: any): void => {
    e.stopPropagation();
    setInputActivityId(id);
    setOpenCreateSubActivity(true);
  };

  return [
    {
      ...getColumnSearchProps('title'),
      title: () => (
        <div
          style={{
            width: '9rem'
          }}
        >
          Title
        </div>
      ),
      dataIndex: 'title',
      key: 1,
      ellipsis: false,
      fixed: 'left',
      width: 200,
      onFilter: (value: string) => console.log('title'),
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: { title: string }) => {
        return (
          <Paragraph
            style={{
              width: '9rem',
              marginBottom: '0rem'
            }}
            ellipsis={{
              rows: 1
            }}
          >
            {record?.title}
          </Paragraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox('Status', subActivityTableFilterStatus),
      title: 'Status',
      dataIndex: 'status',
      key: 2,
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Active',
          value: 'Active'
        },
        {
          text: 'Completed',
          value: 'Completed'
        }
      ],
      render: (text: string, record: { status: string }) => {
        const upperCase = `${record?.status[0]}${record?.status
          .toLowerCase()
          .slice(1)}`;
        const status = upperCase === 'Done' ? 'Completed' : upperCase;
        return status;
      }
    },
    {
      ...getColumnSearchPropsCheckbox('Organization', filterData?.organizations),
      title: 'Organization',
      dataIndex: 'organization',
      key: 3,
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (
        text: string,
        record: { subActivity: { organization: { title: string } } }
      ) => {
        return record?.subActivity?.organization?.title;
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '9rem'
          }}
        >
          Description
        </div>
      ),
      key: 4,
      dataIndex: 'description',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (text: string, record: { description: string }) => {
        let subString = record?.description.slice(0, 20);
        if (record?.description?.length > 20) {
          subString += '...';
        }
        return (
          <Paragraph
            style={{
              marginBottom: '0rem',
              width: '9rem'
            }}
            strong
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {subString}
          </Paragraph>
        );
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '12.5rem'
          }}
        >
          Sub Activities manager
        </div>
      ),
      key: 5,
      dataIndex: 'subActivitiesManager',
      ellipsis: false,
      width: 200,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (
        text: string,
        record: {
          subActivity: { manager: { firstName: string, lastName: string } }
        }
      ) => {
        return (
          <Paragraph
            style={{
              width: '12.5rem',
              marginBottom: '0rem'
            }}
            strong
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {` ${record?.subActivity?.manager?.firstName} ${record?.subActivity?.manager?.lastName}`}
          </Paragraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox('Assigned People', filterData?.assignees),
      title: () => (
        <div
          style={{
            width: '9.5rem'
          }}
        >
          Assigned People
        </div>
      ),
      key: 5,
      dataIndex: 'subActivitiesManager',
      ellipsis: false,
      width: 200,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (
        text: string,
        record: {
          subActivity: { manager: { firstName: string, lastName: string } }
        }
      ) => {
        return (
          <Paragraph
            style={{
              width: '9.5rem',
              marginBottom: '0rem'
            }}
            strong
            ellipsis={{
              rows: 1
            }}
            className="tableName"
          >
            {` ${record?.subActivity?.manager?.firstName} ${record?.subActivity?.manager?.lastName}`}
          </Paragraph>
        );
      }
    },
    {
      title: 'Sector',
      key: 6,
      dataIndex: 'sector',
      ellipsis: true,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (
        text: string,
        record: { subActivity: { sector: { title: string } } }
      ) => {
        return record?.subActivity?.sector?.title;
      }
    },
    {
      title: 'Region',
      key: 7,
      dataIndex: 'region',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (
        text: string,
        record: { subActivity: { region: { title: string } } }
      ) => {
        return record?.subActivity?.region?.title;
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '7rem'
          }}
        >
          Start Date
        </div>
      ),
      key: 8,
      dataIndex: 'startDate',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (text: string, record: { startDate: string }) => {
        return (
          <Paragraph
            style={{
              width: '7rem',
              marginBottom: '0rem'
            }}
          >
            {moment(record?.startDate).format('DD.MM.YYYY')}
          </Paragraph>
        );
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '7rem'
          }}
        >
          End Date
        </div>
      ),
      key: 9,
      dataIndex: 'endDate',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (text: string, record: { endDate: string }) => {
        return (
          <Paragraph
            style={{
              width: '7rem',
              marginBottom: '0rem'
            }}
          >
            {moment(record?.endDate).format('DD.MM.YYYY')}
          </Paragraph>
        );
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '150px'
          }}
        >
          Teaching Mode
        </div>
      ),
      key: 1,
      dataIndex: 'teachingMode',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (text: string, record: { data: { teachingMode: string } }) => {
        return (
          <Paragraph
            style={{
              width: '150px',
              marginBottom: '0rem'
            }}
          >
            {record?.data?.teachingMode}
          </Paragraph>
        );
      }
    },
    {
      title: 'Duration',
      key: 11,
      dataIndex: 'Duration',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (
        text: string,
        record: { data: { durationInfo: { duration: number } } }
      ) => {
        return (
          <Paragraph
            style={{
              width: '100px',
              marginBottom: '0rem'
            }}
            ellipsis={{
              rows: 1
            }}
          >
            {`${record?.data?.durationInfo?.duration} h`}
          </Paragraph>
        );
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '200px'
          }}
        >
          Partner organization
        </div>
      ),
      key: 12,
      dataIndex: 'partnerOrganization',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'John',
          value: 'John'
        }
      ],
      onFilter: (value: string) => console.log(),
      render: (text: string, record: { data: { customInputs: any } }) => {
        const partnerOrganization = record?.data?.customInputs?.filter(
          (item: any) => item?.partner_organization !== undefined
        );
        return (
          <Paragraph
            style={{
              width: '200px',
              marginBottom: '0rem'
            }}
            ellipsis={{
              rows: 1
            }}
          >
            {partnerOrganization[0].partner_organization}
          </Paragraph>
        );
      }
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (text: string, record: { subActivity: { id: string } }) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '13px'
            }}
          >
            <Button onClick={(e) => onEditClick(e, record?.subActivity?.id)}>
              <EditIcon />
            </Button>
            <Button onClick={onDeleteClick}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
      fixed: 'right'
    }
  ];
};
