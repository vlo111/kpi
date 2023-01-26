import React from 'react';
import styled from 'styled-components';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomTextArea
} from '../applicationStyle';
import { v4 as uuidv4 } from 'uuid';
import { FormFinish } from '../../../types/global';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import {
  IIsAddTermsConditions,
  ITermsAndCondition
} from '../../../types/project';

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const TermsAndCondition: React.FC<ITermsAndCondition> = ({
  setTermsConditionsValue,
  termsConditionsValue,
  setIsAddTermsConditions,
  isAddTermsConditions
}) => {
  const handleTermsConditions: FormFinish = (event) => {
    setTermsConditionsValue({
      ...termsConditionsValue,
      [event.target.name]: event.target.value
    });
  };
  console.log(isAddTermsConditions, 'isAddTermsConditions', termsConditionsValue);

  const onDeleteCondition = (id: string | undefined): void => {
    setIsAddTermsConditions(
      isAddTermsConditions.filter((condition) => condition.id !== id)
    );
  };

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-light-amber)'}
      marginBottom={'2rem'}
    >
      <CardTitle>Terms and Conditions / Պայմաններ և դրույթներ</CardTitle>
      {isAddTermsConditions.map(
        (item: IIsAddTermsConditions, index: number) => (
          <TextAreaContainer key={item.id}>
            <CustomTextArea
              style={{ borderRadius: '0px' }}
              placeholder={item.placeholder}
              name={`condition${index}`}
              onChange={handleTermsConditions}
              value={termsConditionsValue[`condition${index}`]}
            />
            <DeleteIcon onClick={() => onDeleteCondition(item.id)} />
          </TextAreaContainer>
        )
      )}
      {isAddTermsConditions.length === 5
        ? null
        : (
        <CustomButton
          className="default"
          onClick={() => {
            if (isAddTermsConditions.length <= 5) {
              setIsAddTermsConditions([
                ...isAddTermsConditions,
                { id: uuidv4(), placeholder: 'Type the agreement text' }
              ]);
            }
          }}
        >
          +Add field
        </CustomButton>
          )}
    </CardContainer>
  );
};

export default TermsAndCondition;
