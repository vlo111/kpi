import React from 'react';
import moment from 'moment';
import { getColumnSearchProps } from './InputFilter';
import { getColumnSearchPropsCheckbox } from './CheckboxFilters';
import {
  subActivityFilterTeachingMode,
  subActivityTableFilterStatus
} from '../../helpers/constants';
import { getColumnCalendarProps } from './CalendarFilter';
import { CustomParagraph, CustomTitle } from './filterPopupStyle';
import {
  IAction,
  IDuration,
  IPartnerOrganization,
  IRegion,
  ISector,
  ISubActivitiesManager,
  ITeachingMode,
  TColumnType,
  IAssignedPeople,
  IOrganization
} from '../../types/api/subActivityTable';
import AvatarComponent from './AvatarComponent';
import ColumnsAction from './columnsAction';

export const useColumn: TColumnType = (
  setOpenCreateSubActivity,
  setInputActivityId,
  filterData,
  setSearchData,
  searchData,
  setOpenConfirmModal,
  setCheckboxValues,
  checkboxValues,
  setTablePagination,
  tablePagination,
  inputValues,
  setInputValues
) => {
  return [
    {
      ...getColumnSearchProps(
        'title',
        setSearchData,
        searchData,
        'courseTitle',
        setTablePagination,
        tablePagination,
        inputValues,
        setInputValues
      ),
      title: () => <CustomTitle width="9rem">Title</CustomTitle>,
      dataIndex: 'title',
      fixed: 'left',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: () => <CustomTitle width="5rem">Status</CustomTitle>,
      dataIndex: 'status',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: <CustomTitle width="8rem">Organization</CustomTitle>,
      dataIndex: 'organization',
      ellipsis: false,
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
        'courseDescription',
        setTablePagination,
        tablePagination,
        inputValues,
        setInputValues
      ),
      title: () => <CustomTitle width="9rem">Description</CustomTitle>,
      dataIndex: 'description',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: () => (
        <CustomTitle width="12.5rem">Sub Activities manager</CustomTitle>
      ),
      dataIndex: 'subActivitiesManager',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: () => <CustomTitle width="9.5rem">Assigned People</CustomTitle>,
      dataIndex: 'assignedPeople',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: () => <CustomTitle width="4.5rem">Sector</CustomTitle>,
      dataIndex: 'sector',
      ellipsis: true,
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
        filterData?.regions,
        setSearchData,
        searchData,
        'regions',
        setCheckboxValues,
        checkboxValues,
        setTablePagination,
        tablePagination
      ),
      title: () => <CustomTitle width="4.5rem">Region</CustomTitle>,
      dataIndex: 'region',
      ellipsis: false,
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
        'startDate',
        tablePagination,
        setTablePagination
      ),
      title: () => <CustomTitle width="7rem">Start Date</CustomTitle>,
      dataIndex: 'startDate',
      ellipsis: false,
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
        'endDate',
        tablePagination,
        setTablePagination
      ),
      title: () => <CustomTitle width="7rem">End Date</CustomTitle>,
      dataIndex: 'endDate',
      ellipsis: false,
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
        setTablePagination,
        tablePagination
      ),
      title: () => <CustomTitle width="9.3rem">Teaching Mode</CustomTitle>,
      dataIndex: 'teachingMode',
      ellipsis: false,
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
        'duration',
        setTablePagination,
        tablePagination,
        inputValues,
        setInputValues
      ),
      title: 'Duration',
      dataIndex: 'duration',
      ellipsis: false,
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
        'partnerOrganization',
        setTablePagination,
        tablePagination,
        inputValues,
        setInputValues
      ),
      title: () => (
        <CustomTitle width="12rem">Partner organization</CustomTitle>
      ),
      dataIndex: 'partnerOrganization',
      ellipsis: false,
      render: (text: string, record: IPartnerOrganization) => {
        const partnerOrganization = record?.data?.customInputs?.filter(
          (item: { partner_organization: string }) =>
            item?.partner_organization !== undefined
        );
        return (
          <CustomParagraph
            width="12rem"
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
      title: () => <CustomTitle width="2.5rem"></CustomTitle>,
      render: (text: string, record: IAction) => {
        return (
          <ColumnsAction
            setInputActivityId={setInputActivityId}
            setOpenCreateSubActivity={setOpenCreateSubActivity}
            setOpenConfirmModal={setOpenConfirmModal}
            record={record}
          />
        );
      },
      fixed: 'right'
    }
  ];
};
