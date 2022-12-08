import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { StoreValue } from 'antd/lib/form/interface';
import { CaretRightOutlined } from '@ant-design/icons';

import { AsnForm } from '../../../Forms/Form';
import { AsnButton } from '../../../Forms/Button';
import { AsnSelect } from '../../../Forms/Select';
import { AsnInput, AsnTextArea } from '../../../Forms/Input';
import { ProjectInputBoxProps, ProjectTargetRule } from '../../../../types/project';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';

const { Option } = AsnSelect;

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : '';

const TargetRule: ProjectTargetRule = (max) => [
  {
    required: true,
    message: '',
    pattern: /^[0-9]+$/
  },
  () => ({
    async validator (_, value: StoreValue) {
      if (value === null) {
        throw new Error('');
      }
      if (isNaN(value)) {
        throw new Error('');
      }
      if (!(value >= 1 && value <= max)) {
        throw new Error('');
      }
      return await Promise.resolve();
    }
  })
];

const PlaceHolderExpectedResult =
  'individuals with improved technical and soft skills following participation in USG-assisted workforce development programs';

export const PlaceHolderActivityMilestone =
  'skill mapping study completed and study report, summarizing findings and recommendations developed.';

const Boxes: React.FC<ProjectInputBoxProps> = ({
  resultId,
  list,
  add,
  remove,
  onDelete,
  activityId,
  type
}) => {
  const [max, setMax] = useState<number>(100);

  return (
    <>
      {list.map((item, index: number) => (
        <Row
          key={`expected_${resultId}${activityId ?? ''}${item.key}`}
          gutter={16}
          justify="start"
          align="top"
          style={{ minWidth: '20vw' }}
        >
          <Col>
            <AsnForm.Item
              name={[item.name, 'code']}
              label={firstLabel('Code', index)}
              rules={[{ min: 1, max: 12 }]}
            >
              <AsnInput
                placeholder={
                  type === 'expected'
                    ? `OP${resultId + 1}.${index + 1}`
                    : `XY${resultId + 1}.${activityId ?? ''}.${index + 1}`
                }
              />
            </AsnForm.Item>
          </Col>
          <Col>
            <AsnForm.Item
              name={[item.name, 'statement']}
              label={firstLabel('Input expected result statement', index)}
              rules={[{ required: true, min: 2, max: 256 }]}
            >
              <AsnTextArea
                placeholder={
                  type === 'expected'
                    ? PlaceHolderExpectedResult
                    : PlaceHolderActivityMilestone
                }
              />
            </AsnForm.Item>
          </Col>
          <Col>
            <AsnForm.Item
              name={[item.name, 'measurement']}
              label={firstLabel('Measurement', index)}
              rules={[{ required: true, min: 2, max: 256 }]}
            >
              <AsnSelect
                dropdownAlign={{ offset: [0, -1] }}
                getPopupContainer={(trigger) => trigger.parentNode}
                defaultValue="Select"
                popupClassName="asn-select-primary"
                suffixIcon={
                  <CaretRightOutlined
                    rotate={90}
                    style={{ color: 'var(--dark-2)' }}
                  />
                }
                style={{ width: '148px', height: '58px' }}
                onChange={(value) => {
                  if (value === 'number') {
                    setMax(99999999999);
                  } else {
                    setMax(100);
                  }
                }}
              >
                <Option value="NUMBER">Number</Option>
                <Option value="ATTACHMENT">Attachment</Option>
                <Option value="PERCENTAGE">Percentage</Option>
              </AsnSelect>
            </AsnForm.Item>
          </Col>
          <Col>
            <AsnForm.Item
              name={[item.name, 'target']}
              label={firstLabel('Target', index)}
              rules={TargetRule(max)}
            >
              <AsnInput placeholder={'100'} />
            </AsnForm.Item>
          </Col>
          {list.length > 1 && (
            <div
              className="delete-result-box"
              onClick={() => {
                onDelete(remove, item.name);
              }}
            >
              <DeleteSvg />
            </div>
          )}
        </Row>
      ))}
      <Row style={{ width: 'calc(100% - 10px)' }}>
        <AsnButton
          style={{
            background: 'white',
            width: '14rem',
            margin: '0 auto',
            height: '44px'
          }}
          value="Create"
          onClick={() => add()}
        >
          +Add {type === 'expected' ? 'expected result' : 'Milestone'}
        </AsnButton>
      </Row>
    </>
  );
};

export default Boxes;
