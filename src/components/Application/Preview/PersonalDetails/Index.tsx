import React from 'react';
import { Radio, Space } from 'antd';
import styled from 'styled-components';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';

const RegionSelect = styled(AsnSelect)`
  border-radius: 5px;
  border: 1px solid var(--dark-border-ultramarine) !important;
  .ant-select-selector {
    height: 44px !important;
  }
`;

const PersonalDetails: React.FC = () => {
  return (
    <DetailsContainer>
      <CardTitle>Personal details / Անձնական տվյալներ:</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {'previewData.detailsDescription'}
      </ModalText>
      <ModalText style={{ marginTop: '1rem' }}>Full Name: / ԱԱՀ*</ModalText>
      <AsnInput value="" />
      <ModalText style={{ marginTop: '1rem' }}>
        Birth Date: / Ծննդյան ամսաթիվ (DD/MM/YY)*
      </ModalText>
      <AsnInput value="" />
      <ModalText style={{ marginTop: '1rem' }}>
        Region: / Բնակության վայր*
      </ModalText>
      <RegionSelect />
      <ModalText style={{ marginTop: '1rem' }}>Community / Համայնք*</ModalText>
      <AsnInput value="" />
      <ModalText style={{ marginTop: '1rem' }}>
        Phone Number: / Հեռախոսահամար*
      </ModalText>
      <AsnInput value="" />
      <ModalText style={{ marginTop: '1rem' }}>Email: / Էլ․հասցե*</ModalText>
      <AsnInput value="" />
      <ModalText style={{ marginTop: '1rem' }}>Gender/Սեռ:*</ModalText>
      <Radio.Group value="Female/Իգական">
        <Space direction="vertical">
          <Radio value="Female/Իգական">Female/Իգական</Radio>
          <Radio value="Male/Արական">Male/Արական</Radio>
        </Space>
      </Radio.Group>
    </DetailsContainer>
  );
};

export default PersonalDetails;
