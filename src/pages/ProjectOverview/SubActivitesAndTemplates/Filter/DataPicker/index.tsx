import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { DateFilter } from './DataPackeFilter';
import { Onchange } from '../../../../../types/global';

export const DateFilterCards: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange: Onchange = (newOpen) => {
    setOpen(newOpen);
  };
  const content = (
  <div>
<DateFilter/>
  </div>
  );

  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={content}
      placement="bottom"
    >
      <Button type='link' style={{ fontSize: 'var(--font-size-small', color: 'var(--dark-1)' }}>Date</Button>
    </Popover>
  );
};
