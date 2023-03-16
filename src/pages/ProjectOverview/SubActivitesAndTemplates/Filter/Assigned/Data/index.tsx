import React from 'react';
import { Table, Space } from 'antd';
import { AsnButton } from '../../../../../../components/Forms/Button';
import { Void } from '../../../../../../types/global';

import styled from 'styled-components';
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
    border-color: var(--dark-2) !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--dark-border-ultramarine);
    border-color: 1px solid var(--dark-border-ultramarine) !important;
  }
`;

const columns = [
  {
    title: 'All People',
    render: (item: AssignedUserType) => (
      <Space direction="horizontal">
        <AsnAvatar
          letter={`${item?.firstName?.charAt(0)}${item?.lastName?.charAt(0)}`}
          src={item?.photo}
        />
        <h4 style={{ padding: 0 }}>
          {item?.firstName} {item?.lastName}
        </h4>
      </Space>
    )
  }
];

export const AssingnesData: React.FC<IAssignedFilterData> = ({
  open,
  setOpen,
  setAssignedUsersIds,
  selectedRowKeys,
  setSelectedRowKeys,
  assignedUsers,
  selectedRowId,
  setSelectedRowId
}) => {
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedRowInfo: any | []
  ): void => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowId(newSelectedRowInfo);
  };
  const rowSelection = {
    selectedRowId,
    selectedRowKeys: selectedRowId.map((row: any) => row.id),
    onChange: onSelectChange
  };

  const filterByUsers = (): void => {
    setAssignedUsersIds(selectedRowKeys);
    setSelectedRowKeys(selectedRowId);
    setOpen(false);
  };

  const cancel: Void = () => {
    setOpen(!open);
    setSelectedRowKeys([]);
    setAssignedUsersIds([]);
  };
  return (
    <Container>
      <Space size={[40, 16]} direction="vertical">
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
          <AsnButton
            type="primary"
            className="primary"
            htmlType="submit"
            onClick={filterByUsers}
          >
            Save
          </AsnButton>
        </Space>
      </Space>
    </Container>
  );
};
