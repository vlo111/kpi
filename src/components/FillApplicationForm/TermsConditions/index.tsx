import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AsnCheckbox } from '../../Forms/Checkbox';
import {
  BorderBottomInput,
  DividerLine,
  FormText,
  SectionTitle
} from '../style';

const TermsConditionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ITermsConditionsProps {
  text: string | undefined
  onlineSignature: boolean | undefined
}

const TermsConditions: React.FC<ITermsConditionsProps> = ({
  text,
  onlineSignature
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
              rules={[
                {
                  validator: async (_, value: boolean) =>
                    value
                      ? await Promise.resolve()
                      : await Promise.reject(
                        new Error('The field is required')
                      )
                }
              ]}
            >
              <AsnCheckbox>I agree / Համաձայն եմ</AsnCheckbox>
            </Form.Item>
          </div>
        ))}
      {onlineSignature !== undefined && (
        <Form.Item name="onlineSignature">
          <DividerLine>
            <FormText style={{ fontWeight: '700' }}>
              Online signature / Առցանց ստորագրություն
            </FormText>
            <BorderBottomInput />
          </DividerLine>
        </Form.Item>
      )}
    </TermsConditionsContainer>
  );
};

export default TermsConditions;
