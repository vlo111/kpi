import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AsnCheckbox } from '../../Forms/Checkbox';
import { BorderBottomInput, DividerLine, FormText, SectionTitle } from '../style';

const TermsConditionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TermsConditions: React.FC = () => {
  return (
    <TermsConditionsContainer>
      <SectionTitle>Personal details / Անձնական տվյալներ:</SectionTitle>
      <FormText> {'previewData.termsCondition'}</FormText>
      <Form.Item name="community">
        <AsnCheckbox>I agree / Համաձայն եմ</AsnCheckbox>
      </Form.Item>
      <FormText>
        Համաձայն եմ, որ իմ կողմից ներկայացված տեղեկություններն օգտագործվեն՝
        ծրագրի նպատակներից ելնելով։
      </FormText>
      <Form.Item name="community">
        <AsnCheckbox>I agree / Համաձայն եմ</AsnCheckbox>
      </Form.Item>
      <Form.Item name="onlineSignature">
        <DividerLine>
          <FormText style={{ fontWeight: '700' }}>Online signature / Առցանց ստորագրություն</FormText>
          <BorderBottomInput />
        </DividerLine>
      </Form.Item>
    </TermsConditionsContainer>
  );
};

export default TermsConditions;
