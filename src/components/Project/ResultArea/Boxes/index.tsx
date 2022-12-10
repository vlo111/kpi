import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

import { AsnForm } from '../../../Forms/Form';
import { AsnButton } from '../../../Forms/Button';
import { AsnSelect } from '../../../Forms/Select';
import { AsnInput, AsnTextArea, AsnInputNumber } from '../../../Forms/Input';
import { ProjectInputBoxProps } from '../../../../types/project';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import { RuleObject } from 'antd/lib/form';

const { Option } = AsnSelect;

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : '';

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
  const [max, setMax] = useState<number>(99999999999);

  const targetValidation = [
    {
      required: true,
      message: undefined
    },
    {
      message: ' ',
      validator: async (_: RuleObject, value: number) => {
        if (!(value >= 1 && value <= max)) {
          throw new Error('');
        } else {
          return await Promise.resolve();
        }
      }
    }
  ];

  return (
    <>
      {list.map((item, index: number) => (
        <Row
          key={`${resultId}.${activityId ?? ''}.${index}`}
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
                popupClassName="asn-select-primary"
                suffixIcon={
                  <CaretRightOutlined
                    rotate={90}
                    style={{ color: 'var(--dark-2)' }}
                  />
                }
                style={{ width: '148px', height: '58px' }}
                onChange={(value) => {
                  console.log(value);
                  if (value === 'NUMBER') {
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
              rules={targetValidation}
            >
              {/* <AsnInput placeholder={'100'} /> */}
              <AsnInputNumber className="primary hideArrow" placeholder={'100'} />
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
      <Row>
        <AsnButton
          className="transparent"
          value="Create"
          onClick={() => add({ measurement: 'NUMBER' })}
        >
          +Add {type === 'expected' ? 'expected result' : 'Milestone'}
        </AsnButton>
      </Row>
    </>
  );
};

export default Boxes;
