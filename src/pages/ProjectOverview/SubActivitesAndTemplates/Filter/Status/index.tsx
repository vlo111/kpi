import React, { useState } from 'react';
import { Button, Popover, Row, Col } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { IStatusFilter } from '../../../../../types/project';
import { AsnCheckbox, AsnCheckboxGroup } from '../../../../../components/Forms/Checkbox';
import { Onchange } from '../../../../../types/global';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/closeIcon.svg';


const plainOptions = ['DONE', 'ACTIVE', 'INACTIVE'];

export const StatusFilter: React.FC<IStatusFilter> = ({
  setCheckAll,
  setIndeterminate,
  setCheckedList,
  checkAll,
  indeterminate,
  checkedList
}) => {
  const [open, setOpen] = useState(false);

  const onChange = (list: CheckboxValueType[]): void => {
    setCheckedList(list);
    setIndeterminate(!(list.length === 0) && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent): void => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleOpenChange: Onchange = (newOpen) => {
    setOpen(newOpen);
  };
  const content = (
    <Row gutter={[4, 3]} style={{ width: '92px', padding: '9px 5px' }}>
      <Col span={22}>
        <AsnCheckbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          className='checkboxStatusFilter'
        >
          All
        </AsnCheckbox>
      </Col>
      <Col span={24}>
        <AsnCheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
  return (
    <>
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
        Status
      </Button>
    </Popover>
    <Row style={{ display: 'flex', justifyContent: 'center' }}>
    {checkedList &&
        checkedList?.length > 2
          ? (
            <Col>All <CloseIcon onClick={onCheckAllChange} style={{ height: '10px', cursor: 'pointer' }}/> </Col>
            )
          : ( checkedList && checkedList?.length > 0 )? <Col >{checkedList?.join(', ')} <CloseIcon onClick={onCheckAllChange} style={{ height: '10px', cursor: 'pointer' }}/> </Col> : null}
      </Row>
      </>
  );
};
