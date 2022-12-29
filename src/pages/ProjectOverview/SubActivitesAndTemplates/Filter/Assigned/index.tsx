import React, { useState } from 'react';
import { Button, Popover, Typography, Col, Row } from 'antd';
import { AssingnesData } from './Data';
import { AssingnesSearch } from './Search';
import { Onchange } from '../../../../../types/global';

export const AssingnesFilter: React.FC = () => {
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
    <Row justify="space-between" align='middle'>  <Title level={5}>Assigned</Title><Col onClick={hide}>X</Col> </Row>
    <AssingnesSearch/>
    <AssingnesData open={open} setOpen={setOpen}/>
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
      <Button type='link' style={{ fontSize: 'var(--font-size-small', color: 'var(--dark-1)' }}>Assigned</Button>
    </Popover>
  );
};
