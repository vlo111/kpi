import React, { useState } from 'react';
import { Col, Row, Space } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

import { ReactComponent as NotFoundIcon } from '../../SubActivityIcons/not-users-found.svg';
import { ReactComponent as ApplicantsIcon } from '../../../../../assets/icons/team-members.svg';
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/download.svg';
import { IApplicantsListFullInfo, IUserListTypes } from '../../../../../types/api/activity/subActivity';
import { AsnTable } from '../../../../Forms/Table';
import FormWrapper from '../../SubActivityWrapper';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../../../helpers/constants';

const SubActivityUsersFullInfo: React.FC<IApplicantsListFullInfo> = ({ color, applicants }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
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
            Applicants <ApplicantsIcon /> <DownloadIcon />
          </Col>
          <Col>
            Upload list of applicants <CloudDownloadOutlined />
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
                  navigate(`/${PATHS.APPLICATION.replace(':id', record.id)}`);
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
