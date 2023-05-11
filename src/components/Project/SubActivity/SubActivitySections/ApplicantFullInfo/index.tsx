import React, { useState } from 'react';
import { Button, Col, Row, Space, Tooltip, UploadProps, Input } from 'antd';
import styled from 'styled-components';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import moment from 'moment';

import { ReactComponent as NotFoundIcon } from '../../SubActivityIcons/not-users-found.svg';
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/download.svg';
import {
  IApplicantData,
  IApplicantsListFullInfo,
  IUserListTypes,
  IImportApplicantsWarnings
} from '../../../../../types/api/activity/subActivity';
import { AsnTable } from '../../../../Forms/Table';
import FormWrapper from '../../SubActivityWrapper';
import { useNavigate } from 'react-router-dom';
import {
  ApplicantDefaultStatus,
  PATHS
} from '../../../../../helpers/constants';
import useAttacheFiles from './useGetUpload';
import useImportApplicantsIntoExcelFile from '../../../../../api/Applicants/useImportUploadListInExcel';
import { AsnDragger2 } from '../SubActivityForms/Dragger';
import { ReactComponent as NotAssessedSvg } from './icons/not-assessed.svg';
import { ReactComponent as NotSubmitedSvg } from './icons/not-submitted.svg';
import { ReactComponent as SubmitedSvg } from './icons/submited.svg';
import { TollTipStatus } from '../../../../../helpers/utils';
import { ReactComponent as InfoSvg } from '../../../../../assets/icons/info.svg';
import SubActivityStatus from './Status';
import { AsnModal } from '../../../../Forms/Modal';
import { AsnButton } from '../../../../Forms/Button';
import _ from 'lodash';

const AntTable = styled(AsnTable)`
  .ant-table-pagination.ant-pagination {
    margin: 32px 0px 0px 0px;
  }
`;
const AsnInput = styled(Input)`
  height: 32px;
  border-radius: 10px;
  max-width: 300px;
  &.ant-input {
    :hover {border-color: var(--dark-border-ultramarine)};
    :focus {border-color: var(--dark-border-ultramarine);
      box-shadow: none; 
    }
  }
`;

const SubActivityUsersFullInfo: React.FC<IApplicantsListFullInfo> = ({
  color,
  applicants,
  courseId,
  navigateRouteInfo,
  status,
  setOffset,
  offset,
  applicantCounts,
  isLoading,
  setSearch,
  search,
  sectionsCount,
  tabIndex
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<
  IApplicantData[]
  >([]);
  const [showWarnings, setShowWarnings] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<IImportApplicantsWarnings[]>();

  const navigate = useNavigate();
  const { mutate: addFileCourse } = useAttacheFiles();
  const { mutate: importApplicant } = useImportApplicantsIntoExcelFile();

  const props: UploadProps = {
    customRequest: (options: any) => {
      const { file } = options;
      importApplicant(
        {
          file,
          sectionDataId: courseId
        },
        {
          onSuccess: (data) => {
            if (!_.isEmpty(data)) {
              const newData = (data as { data: { warnings: IImportApplicantsWarnings[] } }).data.warnings;
              if (newData?.length > 0) {
                setShowWarnings(true);
                setWarnings(newData);
              }
            };
          }
        }
      );
    },
    showUploadList: false,
    name: 'file',
    accept: '.xlsx'
  };

  const columns: ColumnsType<IUserListTypes> = [
    {
      title: 'Name Surname',
      key: 'fullname',
      dataIndex: 'fullname'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: (
        <Tooltip
          overlayClassName="applicant-status-tooltip"
          placement="right"
          title={TollTipStatus()}
          overlayStyle={{ width: '440px', maxWidth: '440px' }}
        >
          <div className="applicant-status-title">
            Status <InfoSvg />
          </div>
        </Tooltip>
      ),
      dataIndex: 'status',
      key: 'status',
      render (text: string, applicant: IUserListTypes) {
        // @ts-expect-error
        const status = ApplicantDefaultStatus[text];

        let icon = null;

        switch (status) {
          case ApplicantDefaultStatus.PRE_ASSESSMENT: {
            if (!applicant.preAssessmentSubmitted) {
              icon = <NotSubmitedSvg title="Not submitted" />;
            } else {
              if (applicant.preAssessmentScore) {
                icon = <SubmitedSvg title="Assessed" />;
              } else {
                icon = <NotAssessedSvg title="Not assessed" />;
              }
            }
            break;
          }
          case ApplicantDefaultStatus.POST_ASSESSMENT: {
            if (!applicant.postAssessmentSubmitted) {
              icon = <NotSubmitedSvg title="Not submitted" />;
            } else {
              if (applicant.postAssessmentScore) {
                icon = <SubmitedSvg title="Assessed" />;
              } else {
                icon = <NotAssessedSvg title="Not assessed" />;
              }
            }
            break;
          }
        }

        return {
          children: (
            <Space>
              <Space className={`status ${text}`} direction="horizontal">
                <Space className="name" align="start">
                  {status}
                </Space>
              </Space>
              <Space.Compact
                block
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {icon}
              </Space.Compact>
            </Space>
          )
        };
      }
    }
  ];

  const warningsColumns = [
    {
      title: 'Name/Surname',
      key: 'fullName',
      dataIndex: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Status',
      render: (item: IImportApplicantsWarnings) => item?.courseMap?.status,
      key: 'status'
    },
    {
      title: 'Course',
      render: (item: IImportApplicantsWarnings) =>
        item?.courseMap?.course?.title,
      key: 'course'
    },
    {
      title: 'Start/End date',
      render: (item: IImportApplicantsWarnings) => {
        return (
          <>
            <span>
              {moment(item.courseMap.course.startDate).format('DD.MM.YYYY')}
            </span>
            /
            <span>
              {moment(item.courseMap.course.endDate).format('DD.MM.YYYY')}
            </span>
          </>
        );
      },
      key: 'date'
    }
  ];

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: IApplicantData[]
  ): void => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedApplicants(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handlePagination = (pagination: TablePaginationConfig): void => {
    const { current } = pagination;
    setOffset((current as number - 1) * 10);
  };

  const handleSearch = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setSearch(e.currentTarget.value.trim());
    }
    setOffset(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setSearch(undefined);
      setOffset(0);
    }
  };

  return (
    <>
      <FormWrapper className="users_full_list" margin={0} color={color}>
        <Space style={{ width: '100%' }} size={[0, 32]} direction="vertical">
          <Row justify="space-between" align="middle">
            <Col span={14} style={{ display: 'flex', alignItems: 'center' }}>
              Applicants{' '}
              <Button type="link">
                {' '}
                <DownloadIcon
                  onClick={() => {
                    addFileCourse(courseId, {});
                  }}
                />
              </Button>
               { (applicants?.length > 0 || search?.length > 0) && <AsnInput
                placeholder='Search...'
                onPressEnter={handleSearch}
                onChange={handleChange}
                />}
            </Col>
            <Col style={{ display: 'flex', gap: '5px' }}>
              Upload list of applicants
              <AsnDragger2 {...props} disabled={status === 'DONE'}>
                <CloudDownloadOutlined />
              </AsnDragger2>
            </Col>
          </Row>
          {/* eslint-disable-next-line multiline-ternary */}
          {applicants?.length === 0 ? (
            <>
              <Row align="middle" justify="center">
                <NotFoundIcon />
              </Row>
              <Row align="middle" justify="center">
                There are no applicants
              </Row>
            </>
          )
            : (
              <>
                <AntTable
                  size="middle"
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        navigate(
                          `/${PATHS.APPLICANT.replace(':id', record.id)}`,
                          {
                            state: { navigateRouteInfo }
                          }
                        );
                      }
                    };
                  }}
                  columns={columns}
                  dataSource={applicants}
                  rowKey="id"
                  pagination={applicantCounts > 10 ? { current: offset / 10 + 1, total: applicantCounts, pageSize: 10, showSizeChanger: false } : false}
                  rowSelection={rowSelection}
                  onChange={handlePagination}
                  loading={isLoading}
                />
                <SubActivityStatus
                  status={status}
                  sectionDataId={courseId}
                  applicants={selectedApplicants}
                  sectionsCount={sectionsCount}
                  tabIndex={tabIndex}
                  setSelectedRowKeys={setSelectedRowKeys}
                  setOffset={setOffset}
                />
              </>
              )}
        </Space>
      </FormWrapper>
      <AsnModal
        open={showWarnings}
        footer={false}
        width={'80%'}
        title={'The applicant already exists in the sub activity'}
        onCancel={() => setShowWarnings(false)}
      >
        <AsnTable
          columns={warningsColumns}
          pagination={false}
          dataSource={warnings}
          style={{ overflow: 'auto', maxHeight: '50vh' }}
        />
        <AsnButton
          className="primary"
          style={{ float: 'right', marginTop: '20px' }}
          onClick={() => setShowWarnings(false)}
        >
          OK
        </AsnButton>
      </AsnModal>
    </>
  );
};

export default SubActivityUsersFullInfo;
