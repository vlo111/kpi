import React, { useState } from 'react';
import { Button, Col, message, Row, Space, Tooltip, UploadProps } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

import { ReactComponent as NotFoundIcon } from '../../SubActivityIcons/not-users-found.svg';
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/download.svg';
import {
  IApplicantsListFullInfo,
  IUserListTypes
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

const SubActivityUsersFullInfo: React.FC<IApplicantsListFullInfo> = ({
  color,
  applicants,
  courseId,
  status
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const { mutate: addFileCourse } = useAttacheFiles();
  const { mutate: importApplicant } = useImportApplicantsIntoExcelFile({
    onSuccess: () => {
      void message.success('Applicants have been successfully added');
    },
    onError: () => {
      void message.error('Insufficient file format !!');
    }
  });

  const props: UploadProps = {
    customRequest: (options: any) => {
      const { file } = options;
      importApplicant({
        file,
        sectionDataId: courseId
      });
      console.log(file);
    },
    showUploadList: false,
    name: 'file',
    accept: '.xlsx'
  };

  const columns: ColumnsType<IUserListTypes> = [
    {
      title: 'Name Surname',
      key: 'fullName',
      dataIndex: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <Tooltip
        overlayClassName="applicant-status-tooltip"
        placement="right"
        title={TollTipStatus()}
        overlayStyle={{ width: '440px', maxWidth: '440px' }}
      >
        <div className="applicant-status-title">
          Status <InfoSvg />
        </div>
      </Tooltip>,
      dataIndex: 'status',
      key: 'status',
      render (text: string, applicant: IUserListTypes) {
        // @ts-expect-error
        const status = ApplicantDefaultStatus[text];

        let icon = null;

        switch (status) {
          case ApplicantDefaultStatus.PRE_ASSESSMENT: {
            if (!applicant.preAssessmentSubmitted) {
              icon = <NotSubmitedSvg title="Not submitted"/>;
            } else {
              if (applicant.preAssessmentScore) {
                icon = <NotAssessedSvg />;
              } else {
                icon = <SubmitedSvg />;
              }
            }
            break;
          }
          case ApplicantDefaultStatus.POST_ASSESSMENT: {
            if (!applicant.postAssessmentSubmitted) {
              icon = <NotSubmitedSvg title="Not submitted" />;
            } else {
              if (applicant.postAssessmentScore) {
                icon = <NotAssessedSvg />;
              } else {
                icon = <SubmitedSvg />;
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
              <Space.Compact block style={{ display: 'flex', alignItems: 'center' }}>
                {icon}
              </Space.Compact>
            </Space>
          )
        };
      }
    }
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <FormWrapper className="users_full_list" margin={0} color={color}>
      <Space style={{ width: '100%' }} size={[0, 32]} direction="vertical">
        <Row gutter={[12, 12]} justify="space-between" align="middle">
          <Col>
            Applicants{' '}
            <Button type="link">
              {' '}
              <DownloadIcon
                onClick={() => {
                  addFileCourse(courseId, {});
                }}
              />
            </Button>
          </Col>
          <Col style={{ display: 'flex', gap: '5px' }}>
            Upload list of applicants
            <AsnDragger2 {...props}>
              <CloudDownloadOutlined />
            </AsnDragger2>
          </Col>
        </Row>
        {applicants.length === 0
          ? (
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
          <AsnTable
            size="middle"
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/${PATHS.APPLICANT.replace(':id', record.id)}`, { state: status });
                }
              };
            }}
            columns={columns}
            dataSource={applicants}
            rowKey="id"
            pagination={false}
            rowSelection={rowSelection}
          />
            )}
      </Space>
    </FormWrapper>
  );
};

export default SubActivityUsersFullInfo;
