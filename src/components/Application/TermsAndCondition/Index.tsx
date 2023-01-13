import React from 'react';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomTextArea
} from '../applicationStyle';
import { v4 as uuidv4 } from 'uuid';
import { FormFinish } from '../../../types/global';
import {
  IIsAddTermsConditions,
  ITermsAndCondition
} from '../../../types/project';

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

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-light-amber)'}
      marginBottom={'2rem'}
    >
      <CardTitle>Terms and Conditions / Պայմաններ և դրույթներ</CardTitle>
      {isAddTermsConditions.map(
        (item: IIsAddTermsConditions, index: number) => (
          <CustomTextArea
            key={item.id}
            style={{ borderRadius: '0px' }}
            placeholder={item.placeholder}
            name={`condition${index}`}
            onChange={handleTermsConditions}
            value={termsConditionsValue[`condition${index}`]}
          />
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
