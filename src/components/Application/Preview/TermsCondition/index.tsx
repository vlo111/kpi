import React, { Fragment } from 'react';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { AsnCheckbox } from '../../../Forms/Checkbox';

const TermsCondition: React.FC<{ termsConditionData: string }> = ({
  termsConditionData
}) => {
  const conditionsData = JSON.parse(termsConditionData);

  return (
    <DetailsContainer>
      <CardTitle style={{ marginBottom: '1rem' }}>
        Terms & Conditions/ Պայմաններ և դրույթներ
      </CardTitle>
      {conditionsData?.map((condition: string, index: number) => (
        <Fragment key={index}>
          {condition?.length > 0
            ? (
            <>
              <ModalText style={{ margin: '1rem 0 0.5rem' }}>
                {condition}
              </ModalText>
              <AsnCheckbox defaultChecked={true}>
                I agree / Համաձայն եմ
              </AsnCheckbox>
            </>
              )
            : null}
        </Fragment>
      ))}
    </DetailsContainer>
  );
};

export default TermsCondition;
