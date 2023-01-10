import React, { useState } from 'react';
import { Button, Col, Popover, Row } from 'antd';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/closeIcon.svg';

import { IDateFilterCards } from '../../../../../types/project';
import { DateFilter } from './DataPackeFilter';
import { Onchange } from '../../../../../types/global';
import moment from 'moment';

export const DateFilterCards: React.FC<IDateFilterCards> = ({ setDateSearch, dateSearch }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange: Onchange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <Row>
      <DateFilter setDateSearch={setDateSearch} dateSearch={dateSearch} setOpen={setOpen} />
    </Row>
  );
  const handleCancel = (): any => {
    setDateSearch({
      start: true,
      from: '',
      to: ''
    });
  };

  return (
    <>
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={content}
      placement="bottom"
    >
      <Button type='link' style={{ fontSize: 'var(--font-size-small', color: 'var(--dark-1)' }}>Date</Button>
    </Popover>
      <Col>
      <Row>{dateSearch.from.length > 0 && <Row style={{ gap: '10px' }}>{moment(dateSearch.from).format('DD/MM/YYYY')} <CloseIcon onClick={handleCancel} style={{ height: '10px', cursor: 'pointer' }}/></Row>} </Row>
        <Row>{dateSearch.to.length > 0 && moment(dateSearch.to).format('DD/MM/YYYY')}</Row>
      </Col>
    </>
  );
};
