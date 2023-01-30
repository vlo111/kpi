import React from 'react';
import { Space, Radio } from 'antd';
import styled from 'styled-components';

import { AsnForm } from '../../components/Forms/Form';

const AsnRadio = styled(Radio)`
  .ant-radio-inner{
   border: 1px solid var(--dark-border-ultramarine)
  }
  .ant-radio:hover .ant-radio-inner{
    border: 1px solid var(--dark-border-ultramarine) !important
  }
  .ant-radio-inner:after{
    background-color:var(--dark-border-ultramarine)
  }
  .ant-radio-input:focus+.ant-radio-inner{
    box-shadow: none
  }
`;

const OptionType: React.FC<any> = ({ question, i }) => {
  return (
        <AsnForm.Item
            name="radio"
            rules={[{ required: true }]}
            label="sjfhdsj"
        >
            <AsnRadio.Group>
                <Space direction="vertical">
                    <AsnRadio value={1}>A</AsnRadio>
                </Space>
            </AsnRadio.Group>
        </AsnForm.Item>
  );
};

export default OptionType;
