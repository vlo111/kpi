import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

import { AsnForm } from '../../components/Forms/Form';

const AsnInput = styled(Input)`
  border: none;
  border-bottom: 1px solid var(--dark-border-ultramarine);
  &.ant-input:hover {
    border: none;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
   }
   &.ant-input:focus{
    border: none;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
    box-shadow: none;
   }
   &.ant-input-status-error:focus{
    box-shadow: none !important;
   }
   &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus{
    border-bottom: 1px solid var(--error) !important;
   }
   &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, 
   .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover{
    border-bottom: 1px solid var(--error) !important;
   }
`;

const ShortTextType: React.FC<any> = ({ question, i }) => {
  console.log(i, 'index');
  const { title } = question;
  return (
        <AsnForm.Item
            name={[0, i, 'answers', 0, 'text']}
            label={ title }
            rules={[{ required: true }]}
        >
            <AsnInput />
        </AsnForm.Item>
  );
};

export default ShortTextType;
