import React, { useState } from 'react';
import { Col, Row, Space } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

import FormWrapper from '../../../../Forms/SubActivityWrapper';
import { ReactComponent as NotFoundIcon } from '../../../../../assets/icons/not-users-found.svg';
import { ReactComponent as ApplicantsIcon } from '../../../../../assets/icons/team-members.svg';
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/download.svg';
import { IUserListTypes } from '../../../../../types/subActivyty';
import { AsnTable } from '../../../../Forms/Table';

const SubActivityUsersFullInfo: React.FC = () => {
  const notUsers = false;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ColumnsType<IUserListTypes> = [
    {
      title: 'Name Surname',
      key: 'name',
      dataIndex: 'name'
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
    },
    {
      title: 'Actions'
    }
  ];

  const data: IUserListTypes[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      status: 'APPROVED',
      email: `user.email${i}@mail.ru`
    });
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <FormWrapper className="users_full_list" margin={0}>
      <Space style={{ width: '100%' }} size={[0, 32]} direction="vertical">
        <Row gutter={[12, 12]} justify="space-between" align="middle">
          <Col>
            Applicants <ApplicantsIcon /> <DownloadIcon />
          </Col>
          <Col>
            Upload list of applicants <CloudDownloadOutlined />
          </Col>
        </Row>
        {notUsers
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
            columns={columns}
            dataSource={data}
            rowKey="key"
            pagination={false}
            rowSelection={rowSelection}
          />
            )}
      </Space>
    </FormWrapper>
  );
};

export default SubActivityUsersFullInfo;
