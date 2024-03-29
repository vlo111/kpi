import React from 'react';
import styled from 'styled-components';

import { AsnForm } from '../../../../Forms/Form';
import { AsnSelect } from '../../../../Forms/Select';

import { IFormItemProps } from '../../../../../types/application';
import { IAnswer } from '../../../../../types/api/application/applicationForm1';

const { Option } = AsnSelect;

const AntSelect = styled(AsnSelect)`
  .ant-select-selector {
    border-radius: 5px !important;
    height: 44px !important;
    border: 1px solid var(--dark-border-ultramarine) !important;
    display: flex;
    align-items: center;
  }
`;

const SectionSelect: React.FC<IFormItemProps> = ({
  title,
  answers,
  index,
  rules,
  placeholder
}) => {
  return (<AsnForm.Item
    key={index}
    label={title}
    labelCol={ { span: 24 }}
    name={[index, 'answers', 0, 'id']}
    rules={rules}
  >
    <AntSelect placeholder={placeholder}>
      {answers.map((item: IAnswer) => (
        <Option key={item.id} value={item.id}>
          {item.title}
        </Option>
      ))}
    </AntSelect>
  </AsnForm.Item>);
};

export default SectionSelect;
