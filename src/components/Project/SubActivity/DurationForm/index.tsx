import React, { useState } from 'react';

import { Checkbox, Col, InputNumber, Row, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ReactComponent as DurationSvg } from '../SubActivityIcons/duration.svg';
import { AsnForm } from '../../../Forms/Form';

const Duration: React.FC<{ sectionIndex: number | string }> = ({ sectionIndex }) => {
  const form = AsnForm.useFormInstance();
  const [checkSkills, setCheckSkills] = useState(true);
  const [checkTechnical, setCheckTechnical] = useState(true);
  const formatter = (value: any): any => {
    return value.toString().replace(/[^\d]/g, '').slice(0, 3);
  };
  const parser = (formattedValue: any): any => {
    return parseInt(formattedValue.replace(/[^\d]/g, ''));
  };

  const selectBefore = (
    <Row
      justify={'center'}
      align="middle"
      gutter={[8, 8]}
      style={{ width: '30%' }}
    >
      <Col style={{ display: 'flex' }} span={12}>
        <DurationSvg />
      </Col>
      <Col span={12}>Duration</Col>
    </Row>
  );

  return (
    <>
      <AsnForm.Item
        className="duration_section"
        name={[sectionIndex, 'duration_ff']}
        label="Duration"
        rules={[{ required: form.getFieldValue(['sectionsData', sectionIndex, 'duration']) === 0 }]}
      >
        <AsnForm.Item name={[sectionIndex, 'duration']} className="duration_header">
          <InputNumber
            addonAfter="hr"
            disabled
            min={1}
            name="test"
            addonBefore={selectBefore}
            className="duration_header"
          />
        </AsnForm.Item>
        <Space
          direction="horizontal"
          align="center"
          className="skills"
          style={{ marginBottom: '8px' }}
        >
          <AsnForm.Item>
            <Checkbox
              checked={checkTechnical}
              disabled={!checkTechnical}
              onChange={(e: CheckboxChangeEvent) => {
                if (checkTechnical) {
                  const technicalNum = form.getFieldValue(
                    ['sectionsData', sectionIndex, 'duration_technical_number']
                  );
                  const durationNum = form.getFieldValue(['sectionsData', sectionIndex, 'duration']);
                  const val = durationNum - technicalNum;
                  form.setFieldValue(['sectionsData', sectionIndex, 'duration'], val);
                  form.setFieldValue(['sectionsData', sectionIndex, 'duration_technical_number'], null);
                }
                setCheckTechnical(e.target.checked);
              }}
            >
              Technical skills
            </Checkbox>
          </AsnForm.Item>
          <AsnForm.Item name={[sectionIndex, 'duration_technical_number']}>
            <InputNumber
              addonAfter="hr"
              min={0}
              formatter={formatter}
              parser={parser}
              onChange={(value: number) => {
                const skillsNumber: number = form.getFieldValue(['sectionsData', sectionIndex, 'duration_soft_number']);
                const dur = skillsNumber + value;
                form.setFieldValue(['sectionsData', sectionIndex, 'duration'], dur);
                if (value !== null && value < 1) {
                  setCheckTechnical(false);
                } else if (value === null) {
                  setCheckTechnical(false);
                } else {
                  setCheckTechnical(true);
                }
              }}
              className="skills_item"
            />
          </AsnForm.Item>
        </Space>
        <Space direction="horizontal" align="center" className="skills">
          <AsnForm.Item>
            <Checkbox
              checked={checkSkills}
              disabled={!checkSkills}
              onChange={(e: CheckboxChangeEvent) => {
                if (checkSkills) {
                  const skillNum = form.getFieldValue(['sectionsData', sectionIndex, 'duration_soft_number']);
                  const durationNum = form.getFieldValue(['sectionsData', sectionIndex, 'duration']);
                  const val = durationNum - skillNum;
                  console.log(val);
                  form.setFieldValue(['sectionsData', sectionIndex, 'duration'], val);
                  form.setFieldValue(['sectionsData', sectionIndex, 'duration_soft_number'], null);
                }
                setCheckSkills(e.target.checked);
              }}
            >
              Soft skills
            </Checkbox>
          </AsnForm.Item>
          <AsnForm.Item name={[sectionIndex, 'duration_soft_number']}>
            <InputNumber
              addonAfter="hr"
              formatter={formatter}
              parser={parser}
              onChange={(value: number) => {
                const technicalNumber: number = form.getFieldValue(
                  ['sectionsData', sectionIndex, 'duration_technical_number']
                );
                const dur = technicalNumber + value;
                form.setFieldValue(['sectionsData', sectionIndex, 'duration'], dur);
                if (value !== null && value < 1) {
                  setCheckSkills(false);
                } else if (value === null) {
                  setCheckSkills(false);
                } else {
                  setCheckSkills(true);
                }
              }}
              min={0}
              className="skills_item"
            />
          </AsnForm.Item>
        </Space>
      </AsnForm.Item>
    </>
  );
};

export default Duration;
