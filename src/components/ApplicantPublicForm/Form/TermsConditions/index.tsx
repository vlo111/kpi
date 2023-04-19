import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import {
  DividerLine,
  FormText,
  SectionTitle
} from '../style';
import { ITermsConditionsProps } from '../../../../types/application';
import Signature from '../../../Signature';

const TermsConditionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TermsConditions: React.FC<ITermsConditionsProps> = ({
  text,
  onlineSignature,
  onlineSignaturePath,
  preview
}) => {
  return (
    <TermsConditionsContainer>
      <SectionTitle>Terms & Conditions/ Պայմաններ և դրույթներ</SectionTitle>
      {text !== undefined &&
        JSON.parse(text)?.map((p: any, i: number) => (
          <div key={i}>
            <FormText>{p}</FormText>
            <Form.Item
              name={`community${i}`}
              valuePropName="checked"
              rules={[{
                validator: async (_, value: boolean) =>
                  value
                    ? await Promise.resolve()
                    : await Promise.reject(
                      new Error('The field is required')
                    )
              }]}
            >
              <AsnCheckbox>I agree / Համաձայն եմ</AsnCheckbox>
            </Form.Item>
          </div>
        ))}
      {onlineSignature !== undefined && onlineSignature && (
        <Form.Item
        name="onlineSignaturePath"
        rules={[{ required: true, message: 'Please enter online signature' }]}
        validateTrigger={['onChange', 'onBlur']}
         >
          <DividerLine>
             <Signature view={preview} url={onlineSignaturePath}/>
          </DividerLine>
        </Form.Item>
      )}
    </TermsConditionsContainer>
  );
};

export default TermsConditions;
