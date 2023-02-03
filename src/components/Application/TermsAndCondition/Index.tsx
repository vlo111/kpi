import React from 'react';
import styled from 'styled-components';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomTextArea
} from '../applicationStyle';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { AsnForm } from '../../Forms/Form';

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-left: 8px;
    cursor: pointer;
  }
`;
export const FormSpace = styled.div`
  display: flex;
  align-items: flex-start;
  .ant-form-item {
    margin: 0px 8px 0px 0px;
    width: 100%;
  }
  svg {
    cursor: pointer;
  }
`;

const TermsAndCondition: React.FC = () => {
  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-light-amber)'}
      marginBottom={'2rem'}
    >
      <CardTitle>Terms and Conditions / Պայմաններ և դրույթներ</CardTitle>
      <AsnForm.List name="conditions">
        {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <FormSpace key={key}>
                  <AsnForm.Item {...restField} name={name}>
                    <CustomTextArea
                      placeholder="Type the agreement text"
                      style={{ borderRadius: '0px' }}
                    />
                  </AsnForm.Item>
                  <DeleteIcon onClick={() => remove(name)} />
                </FormSpace>
              ))}
              {fields.length === 5
                ? null
                : (
                <AsnForm.Item>
                  <CustomButton
                    className="default"
                    onClick={() => add()}
                    block
                    icon={<PlusIcon />}
                  >
                    Add field
                  </CustomButton>
                </AsnForm.Item>
                  )}
            </>
        )
        }
      </AsnForm.List>
    </CardContainer>
  );
};

export default React.memo(TermsAndCondition);
