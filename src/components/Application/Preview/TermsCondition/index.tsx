import React, { Fragment } from 'react';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { AsnCheckbox } from '../../../Forms/Checkbox';

const TermsCondition: React.FC<any> = ({ termsConditionData }) => {
  const conditionsData = JSON.parse(termsConditionData);

  return (
    <DetailsContainer>
      <CardTitle style={{ marginBottom: '1rem' }}>
        Terms & Conditions/ Պայմաններ և դրույթներ
      </CardTitle>
      {conditionsData?.map((condition: string) => (
        <Fragment key={condition}>
          <ModalText style={{ margin: '1rem 0 0.5rem' }}>{condition}</ModalText>
          <AsnCheckbox defaultChecked={true}>I agree / Համաձայն եմ</AsnCheckbox>
        </Fragment>
      ))}
    </DetailsContainer>
  );
};

export default TermsCondition;
