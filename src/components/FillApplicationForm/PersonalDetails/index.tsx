import React from 'react';
import styled from 'styled-components';
import { Form, Radio, Space } from 'antd';
import { regions } from '../../../helpers/constants';
import { AsnSelect } from '../../Forms/Select';
import { AsnInput } from '../../Forms/Input';
import { AsnDatePicker } from '../../Forms/DatePicker';
import { CustomRadio, FormText, SectionTitle } from '../style';

const { Option } = AsnSelect;

const PersonalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CustomSelect = styled(AsnSelect)`
  .ant-select-selector {
    border-radius: 5px !important;
    height: 44px !important;
    border: 1px solid var(--dark-border-ultramarine) !important;
    display: flex;
    align-items: center;
  }
`;

const PersonalDetails: React.FC = () => {
  return (
    <PersonalDetailsContainer>
      <SectionTitle>Personal details / Անձնական տվյալներ:</SectionTitle>
      <FormText>{'previewData.detailsDescription'}</FormText>
      <FormText style={{ margin: '1rem 0rem 0.5rem' }}>
        Full Name: / ԱԱՀ*
      </FormText>
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <AsnInput />
      </Form.Item>
      <FormText>Birth Date: / Ծննդյան ամսաթիվ (DD/MM/YY)*</FormText>
      <Form.Item
        name="birthDate"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <AsnDatePicker style={{ height: '44px', width: '100%' }} />
      </Form.Item>
      <FormText>Region: / Բնակության վայր*</FormText>
      <Form.Item
        name="region"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <CustomSelect>
          {regions.map((region: string) => (
            <Option key={region} value={region}>
              {region}
            </Option>
          ))}
        </CustomSelect>
      </Form.Item>
      <FormText>Community / Համայնք*</FormText>
      <Form.Item
        name="community"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <AsnInput />
      </Form.Item>
      <FormText>Phone Number: / Հեռախոսահամար*</FormText>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <AsnInput />
      </Form.Item>
      <FormText>Email: / Էլ․հասցե*</FormText>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <AsnInput />
      </Form.Item>
      <FormText style={{ marginBottom: '1rem' }}>Gender/Սեռ:*</FormText>
      <Form.Item name="gender">
        <Radio.Group>
          <Space direction="vertical">
            <CustomRadio value={'Female/Իգական'}>Female/Իգական</CustomRadio>
            <CustomRadio value={'Male/Արական '}>Male/Արական </CustomRadio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </PersonalDetailsContainer>
  );
};

export default PersonalDetails;
