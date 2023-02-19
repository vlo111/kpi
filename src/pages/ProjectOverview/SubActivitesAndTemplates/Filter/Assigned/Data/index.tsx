import React, { useState } from 'react';
import { Table, Space, Row, Col } from 'antd';
import { AsnButton } from '../../../../../../components/Forms/Button';
import { Void } from '../../../../../../types/global';

import styled from 'styled-components';
import useGetAssignedUsersListByInputActivityId from '../../../../../../api/Activity/SubActivity/useGetAssinedUsersByInputActivty';
import { AssignedUserType } from '../../../../../../types/api/activity/subActivity';
import AsnAvatar from '../../../../../../components/Forms/Avatar';
import { IAssignedFilterData } from '../../../../../../types/project';

const Container = styled.div`
  .ant-table-thead > tr > th {
    background: none;
    border-bottom: none;
    padding: 0;
  }
  .ant-table-tbody > tr > td {
    border-bottom: none;
    padding: 11px 5px;
  }
  .ant-table-tbody {
    position: relative;
    left: 37px;
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: inherit;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: inherit;
  }
  .ant-table-container {
    height: 200px;
    overflow-x: hidden;
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    &:after {
      background-color: inherit !important;
    }
  }
  .ant-checkbox .ant-checkbox-inner {
    background-color: white;
    border-color: #d9d9d9;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--dark-border-ultramarine);
    border-color: 1px solid var(--dark-border-ultramarine) !important;
  }
`;

const columns = [
  {
    render: (item: AssignedUserType) => (
      <Space direction='horizontal'>
      <AsnAvatar
        letter={`${item?.firstName?.charAt(0)}${item?.lastName?.charAt(0)}`}
        src={item?.photo}
      />
      <h4 style={{ padding: 0 }}>{item?.firstName} {item?.lastName}</h4>
      </Space>
    )
  },
  {
    title: 'All People',
    dataIndex: ''
  }
];

export const AssingnesData: React.FC<IAssignedFilterData> = ({ open, setOpen, inputActivityId, setAssignedUsersIds }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data: assignedUsers } = useGetAssignedUsersListByInputActivityId(
    inputActivityId,
    { enabled: open }
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  const filterByUsers = (): void => {
    setAssignedUsersIds(selectedRowKeys);
    setOpen(false);
  };

  const cancel: Void = () => {
    setOpen(!open);
    setSelectedRowKeys([]);
  };

  return (
    <Container>
      <Space size={[40, 16]} direction="vertical">
        <Row style={{ gap: '15px' }}>
          <Col>{hasSelected ? `Selected ${selectedRowKeys.length} ` : ''}</Col>
        </Row>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={assignedUsers}
          rowKey={(record) => record?.id}
          pagination={false}
          style={{ marginBottom: '40px' }}
        />
        <Space
          size={[40, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <AsnButton onClick={cancel} className="default">
            Cancel
          </AsnButton>
          <AsnButton type="primary" className="primary" htmlType="submit" onClick={filterByUsers}>
            Save
          </AsnButton>
        </Space>
      </Space>
    </Container>
  );
};
