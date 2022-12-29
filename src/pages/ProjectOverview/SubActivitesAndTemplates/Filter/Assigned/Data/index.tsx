import React, { useState } from 'react';
import { Table, Space, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AsnButton } from '../../../../../../components/Forms/Button';
import { UserOutlined } from '@ant-design/icons';
import { Void, DataType } from '../../../../../../types/global';

import styled from 'styled-components';

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

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: '',
    render: (text) => <UserOutlined />
  },
  {
    title: 'All People',
    dataIndex: 'name'
  }
];

const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `$ Edward King ${i}  `
  });
}
export const AssingnesData: React.FC<{ open: boolean
  setOpen: (open: boolean) => void }> = ({
  open,
  setOpen
}) => {
  const cancel: Void = () => {
    setOpen(!open);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  console.log(columns);

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Container>
      <Space size={[40, 16]} direction="vertical">
        <Row style={{ gap: '15px' }}>
          <Col>{hasSelected ? `Selected ${selectedRowKeys.length} ` : ''}</Col>
        </Row>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ marginBottom: '40px' }}
        />
        <Space
          size={[40, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <AsnButton onClick={cancel}>Cancel</AsnButton>
          <AsnButton type="primary" htmlType="submit">
            Save
          </AsnButton>
        </Space>
      </Space>
    </Container>
  );
};
