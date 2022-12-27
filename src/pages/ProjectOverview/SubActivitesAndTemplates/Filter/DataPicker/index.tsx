import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { DateFilter } from './DataPackeFilter';

export const DateFilterCards: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: any): any => {
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
