import React from 'react';
import { IAnswer } from '../../../../types/api/application/applicationForm';
import { AsnForm } from '../../../Forms/Form';
import { Radio, Space } from 'antd';
import { BorderBottomInput, CustomRadio } from '../../style';
import { ISectionCheckProps } from '../../../../types/application';

const SectionRadio: React.FC<ISectionCheckProps> = ({ title, answers, index, otherOption }) => {
  return (<AsnForm.Item
    key={index}
    label={title}
    name={[index, 'answers', 0, 'id']}
    rules={[{ required: true, message: 'The field is required' }]}
  >
    <Radio.Group>
      <Space direction="vertical">
        {answers.map((item: IAnswer) => (
          <CustomRadio value={item.id} key={item.id}>
            {item.title}
          </CustomRadio>
        ))}
        {otherOption && (
          <>
            <span>Other (specify)/ Այլ (նշել)</span>
            <BorderBottomInput />
          </>
        )}
      </Space>
    </Radio.Group>
  </AsnForm.Item>);
};

export default SectionRadio;
