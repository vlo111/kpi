import React, { useState } from 'react';
import { Button, Popover, Typography, Col, Row } from 'antd';
import { AssingnesData } from './Data';
import { Onchange } from '../../../../../types/global';
import { IAssignedFilter } from '../../../../../types/project';

export const AssingnesFilter: React.FC<IAssignedFilter> = ({
  inputActivityId,
  setAssignedUsersIds
}) => {
  const [open, setOpen] = useState(false);
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
        <Title level={5} style={{color: 'var(--dark-border-ultramarine)'}}>Assigned</Title>
        <Col onClick={hide} style={{cursor: 'pointer'}}>X</Col>{' '}
      </Row>
      <AssingnesData
        setAssignedUsersIds={setAssignedUsersIds}
        inputActivityId={inputActivityId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );

  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={content}
      placement="bottom"
    >
      <Button
        type="link"
        style={{ fontSize: 'var(--font-size-small', color: 'var(--dark-1)' }}
      >
        Assigned
      </Button>
    </Popover>
  );
};
