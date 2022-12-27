import React, { useState } from 'react';
import { Button, Popover, Row, Col } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { AsnCheckbox, AsnCheckboxGroup } from '../../../../../components/Forms/Checkbox';

const plainOptions = ['Done', 'Active', 'Inactive'];

export const StatusFilter: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

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

  const handleOpenChange = (newOpen: any): any => {
    setOpen(newOpen);
  };
  const content = (
    <Row gutter={[4, 3]} style={{ width: '92px', padding: '9px 5px' }}>
      <Col span={22}>
        <AsnCheckbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
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
  );
};
