import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as SubActivitiesFilteredDataIcon } from '../../assets/icons/filtered-data-icon.svg';
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
  width: ${(props) => props.width} !important;
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
  checkboxValues,
  assignCheckboxValues,
  setAssignCheckboxValues
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
      filterIcon: () =>
        searchData.courseTitle === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: { title: string }) => {
        return (
          <CustomParagraph
            width="10rem"
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
      ),
      title: () => (
        <div
          style={{
            width: '5rem'
          }}
        >
          Status
        </div>
      ),
      dataIndex: 'status',
      key: 2,
      ellipsis: false,
      filterIcon: () =>
        searchData.status === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: { status: string }) => {
        const upperCase = `${record?.status[0]}${record?.status
          .toLowerCase()
          .slice(1)}`;
        const status = upperCase === 'Done' ? 'Completed' : upperCase;
        return (
          <CustomParagraph
            width="6rem"
            ellipsis={{
              rows: 1
            }}
          >
            {status}
          </CustomParagraph>
        );
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
      ),
      title: (
        <div
          style={{
            width: '8rem'
          }}
        >
          Organization
        </div>
      ),
      dataIndex: 'organization',
      key: 3,
      ellipsis: false,
      filterIcon: () =>
        searchData.organizations === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: IOrganization) => {
        return (
          <CustomParagraph
            width="9rem"
            ellipsis={{
              rows: 1
            }}
          >
            {record?.subActivity?.organization?.title}
          </CustomParagraph>
        );
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
      filterIcon: () =>
        searchData.courseDescription === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: { description: string }) => {
        let subString = record?.description.slice(0, 20);
        if (record?.description?.length > 20) {
          subString += '...';
        }
        return (
          <CustomParagraph
            width="10rem"
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
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
      filterIcon: () =>
        searchData.managers === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (
        text: string,
        record: {
          subActivity: ISubActivitiesManager
        }
      ) => {
        return (
          <CustomParagraph
            width="13.5rem"
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
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
      filterIcon: () =>
        searchData.assigned === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: IAssignedPeople) => {
        return (
          <div style={{ width: '10.5rem' }}>
            <AvatarComponent record={record?.subActivity?.assignees} />
          </div>
        );
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
      ),
      title: () => (
        <div
          style={{
            width: '4.5rem'
          }}
        >
          Sector
        </div>
      ),
      key: 6,
      dataIndex: 'sector',
      ellipsis: true,
      filterIcon: () =>
        searchData.sectors === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: ISector) => {
        return (
          <CustomParagraph width="5.5rem">
            {record?.subActivity?.sector?.title}
          </CustomParagraph>
        );
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
      ),
      title: () => (
        <div
          style={{
            width: '4.5rem'
          }}
        >
          Region
        </div>
      ),
      key: 7,
      dataIndex: 'region',
      ellipsis: false,
      filterIcon: () =>
        searchData.regions === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: IRegion) => {
        return (
          <CustomParagraph width="5.5rem">
            {record?.subActivity?.region?.title}
          </CustomParagraph>
        );
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
      filterIcon: () =>
        searchData.startDate === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: { startDate: string }) => {
        return (
          <CustomParagraph width="8rem">
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
      filterIcon: () =>
        searchData.endDate === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: { endDate: string }) => {
        return (
          <CustomParagraph width="8rem">
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
        checkboxValues,
        assignCheckboxValues,
        setAssignCheckboxValues
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
      filterIcon: () =>
        searchData.teachingModes === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
      render: (text: string, record: ITeachingMode) => {
        return (
          <CustomParagraph width="10rem">
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
      filterIcon: () =>
        searchData.duration === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
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
      filterIcon: () =>
        searchData.partnerOrganization === undefined
          ? (
          <SubActivitiesFilterIcon />
            )
          : (
          <SubActivitiesFilteredDataIcon />
            ),
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
            width: '40px'
          }}
        ></div>
      ),
      key: 'action',
      render: (text: string, record: IAction) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '13px',
              width: '40px'
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
