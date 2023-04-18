import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { getColumnSearchProps } from './InputFilter';
import { getColumnSearchPropsCheckbox } from './CheckboxFilters';
import {
  subActivityFilterTeachingMode,
  subActivityListRegionsFilter,
  subActivityTableFilterStatus
} from '../../helpers/constants';
import { getColumnCalendarProps } from './CalendarFilter';
import { Button } from './filterPopupStyle';
import {
  IAction,
  IDuration,
  IPartnerOrganization,
  IRegion,
  ISector,
  ISubActivitiesManager,
  ITeachingMode,
  TAction,
  TColumnType,
  IAssignedPeople,
  IOrganization
} from '../../types/api/subActivityTable';
import AvatarComponent from './AvatarComponent';
import styled from 'styled-components';

const { Paragraph } = Typography;

const CustomParagraph = styled(Paragraph)<{ width: string }>`
  width: ${(props) => props.width};
  margin-bottom: "0rem";
`;

export const useColumn: TColumnType = (
  setOpenCreateSubActivity,
  setInputActivityId,
  filterData,
  setSearchData,
  searchData,
  setOpenConfirmModal,
  setCheckboxValues,
  checkboxValues
) => {
  const onDeleteClick: TAction = (e, id) => {
    e.stopPropagation();
    setOpenConfirmModal(true);
    setInputActivityId(id);
  };

  const onEditClick: TAction = (e, id): void => {
    e.stopPropagation();
    setInputActivityId(id);
    setOpenCreateSubActivity(true);
  };

  return [
    {
      ...getColumnSearchProps(
        'title',
        setSearchData,
        searchData,
        'courseTitle'
      ),
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
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: { title: string }) => {
        return (
          <CustomParagraph
            width="9rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.title}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Status',
        subActivityTableFilterStatus,
        setSearchData,
        searchData,
        'status',
        setCheckboxValues,
        checkboxValues
      ),
      title: 'Status',
      dataIndex: 'status',
      key: 2,
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: { status: string }) => {
        const upperCase = `${record?.status[0]}${record?.status
          .toLowerCase()
          .slice(1)}`;
        const status = upperCase === 'Done' ? 'Completed' : upperCase;
        return status;
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Organization',
        filterData?.organizations,
        setSearchData,
        searchData,
        'organizations',
        setCheckboxValues,
        checkboxValues
      ),
      title: 'Organization',
      dataIndex: 'organization',
      key: 3,
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: IOrganization) => {
        return record?.subActivity?.organization?.title;
      }
    },
    {
      ...getColumnSearchProps(
        'description',
        setSearchData,
        searchData,
        'courseDescription'
      ),
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
      render: (text: string, record: { description: string }) => {
        let subString = record?.description.slice(0, 20);
        if (record?.description?.length > 20) {
          subString += '...';
        }
        return (
          <CustomParagraph
            width="9rem"
            ellipsis={{
              rows: 1
            }}
          >
            {subString}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Sub Activities manager',
        filterData?.manager,
        setSearchData,
        searchData,
        'managers',
        setCheckboxValues,
        checkboxValues
      ),
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
      render: (
        text: string,
        record: {
          subActivity: ISubActivitiesManager
        }
      ) => {
        return (
          <CustomParagraph
            width="12.5rem"
            ellipsis={{
              rows: 1
            }}
          >
            {` ${record?.subActivity?.manager?.firstName} ${record?.subActivity?.manager?.lastName}`}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Assigned People',
        filterData?.assignees,
        setSearchData,
        searchData,
        'assigned',
        setCheckboxValues,
        checkboxValues
      ),
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
      dataIndex: 'assignedPeople',
      ellipsis: false,
      width: 200,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: IAssignedPeople) => {
        return <AvatarComponent record={record?.subActivity?.assignees} />;
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Sector',
        filterData?.sectors,
        setSearchData,
        searchData,
        'sectors',
        setCheckboxValues,
        checkboxValues
      ),
      title: 'Sector',
      key: 6,
      dataIndex: 'sector',
      ellipsis: true,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: ISector) => {
        return record?.subActivity?.sector?.title;
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Region',
        subActivityListRegionsFilter,
        setSearchData,
        searchData,
        'regions',
        setCheckboxValues,
        checkboxValues
      ),
      title: 'Region',
      key: 7,
      dataIndex: 'region',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: IRegion) => {
        return record?.subActivity?.region?.title;
      }
    },
    {
      ...getColumnCalendarProps(
        'Start Date',
        setSearchData,
        searchData,
        'startDate'
      ),
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
      render: (text: string, record: { startDate: string }) => {
        return (
          <CustomParagraph width="7rem">
            {moment(record?.startDate).format('DD.MM.YYYY')}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnCalendarProps(
        'End Date',
        setSearchData,
        searchData,
        'endDate'
      ),
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
      render: (text: string, record: { endDate: string }) => {
        return (
          <CustomParagraph width="7rem">
            {moment(record?.endDate).format('DD.MM.YYYY')}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchPropsCheckbox(
        'Teaching Mode',
        subActivityFilterTeachingMode,
        setSearchData,
        searchData,
        'teachingModes',
        setCheckboxValues,
        checkboxValues
      ),
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
      render: (text: string, record: ITeachingMode) => {
        return (
          <CustomParagraph width="9rem">
            {record?.data?.teachingMode}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchProps(
        'duration',
        setSearchData,
        searchData,
        'duration'
      ),
      title: 'Duration',
      key: 11,
      dataIndex: 'duration',
      ellipsis: false,
      filterIcon: () => <SubActivitiesFilterIcon />,
      render: (text: string, record: IDuration) => {
        return (
          <CustomParagraph
            width="6.5rem"
            ellipsis={{
              rows: 1
            }}
          >
            {`${record?.data?.durationInfo?.duration} h`}
          </CustomParagraph>
        );
      }
    },
    {
      ...getColumnSearchProps(
        'partner organization',
        setSearchData,
        searchData,
        'partnerOrganization'
      ),
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
      render: (text: string, record: IPartnerOrganization) => {
        const partnerOrganization = record?.data?.customInputs?.filter(
          (item: { partner_organization: string }) =>
            item?.partner_organization !== undefined
        );
        return (
          <CustomParagraph
            width="12.5rem"
            ellipsis={{
              rows: 1
            }}
          >
            {partnerOrganization[0]?.partner_organization}
          </CustomParagraph>
        );
      }
    },
    {
      title: () => (
        <div
          style={{
            width: '50px'
          }}
        ></div>
      ),
      key: 'action',
      width: 50,
      render: (text: string, record: IAction) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '13px',
              width: '50px'
            }}
          >
            <Button onClick={(e) => onEditClick(e, record?.subActivity?.id)}>
              <EditIcon />
            </Button>
            <Button onClick={(e) => onDeleteClick(e, record?.id)}>
              <DeleteIcon />
            </Button>
          </div>
        );
      },
      fixed: 'right'
    }
  ];
};
