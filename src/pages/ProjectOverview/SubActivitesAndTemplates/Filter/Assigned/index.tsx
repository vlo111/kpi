import React, { useState } from 'react';
import {
  Button,
  Popover,
  Typography,
  Col,
  Row,
  Tooltip,
  Avatar,
  Tag,
  Space
} from 'antd';
import { AssingnesData } from './Data';
import { Onchange } from '../../../../../types/global';
import { IAssignedFilter, IAssingedUser } from '../../../../../types/project';
import useGetAssignedUsersListByInputActivityId from '../../../../../api/Activity/SubActivity/useGetAssinedUsersByInputActivty';
import AsnAvatar from '../../../../../components/Forms/Avatar';
import styled from 'styled-components';

const Container = styled.div`
  .ant-tag {
    border: none;
    display: flex;
    margin: 0;
    background: inherit;
  }
`;

export const AssingnesFilter: React.FC<IAssignedFilter> = ({
  inputActivityId,
  setAssignedUsersIds
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<any>([]);

  const { data: assignedUsers } = useGetAssignedUsersListByInputActivityId(
    inputActivityId,
    { enabled: open }
  );

  const { Title } = Typography;

  const hide = (): void => {
    setOpen(false);
  };

  const handleOpenChange: Onchange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <>
      <Row justify="space-between" align="middle">
        <Title level={5} style={{ color: 'var(--dark-border-ultramarine)' }}>
          Assigned
        </Title>
        <Col onClick={hide} style={{ cursor: 'pointer' }}>
          X
        </Col>{' '}
      </Row>
      <AssingnesData
        setAssignedUsersIds={setAssignedUsersIds}
        inputActivityId={inputActivityId}
        open={open}
        setOpen={setOpen}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedRowKeys={selectedRowKeys}
        assignedUsers={assignedUsers}
        setSelectedRowId={setSelectedRowId}
        selectedRowId={selectedRowId}
      />
    </>
  );

  return (
    <Container>
      <Space size={[40, 0]} direction="vertical">
        <Popover
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          content={content}
          placement="bottom"
        >
          <Button
            type="link"
            style={{
              fontSize: 'var(--font-size-small',
              color: 'var(--dark-1)'
            }}
          >
            Assigned
          </Button>
        </Popover>
        {selectedRowId.length > 0 && (
          <Tag closable>
            <Avatar.Group maxCount={3}>
              {selectedRowId.map((i: IAssingedUser) => {
                return (
                  <Tooltip
                    key={i?.id}
                    placement="top"
                    title={`${i?.firstName} ${i?.lastName}`}
                  >
                    <AsnAvatar
                      letter={`${i?.firstName?.charAt(0)}${i?.lastName?.charAt(
                        0
                      )}`}
                      src={i.photo}
                    />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </Tag>
        )}
      </Space>
    </Container>
  );
};
