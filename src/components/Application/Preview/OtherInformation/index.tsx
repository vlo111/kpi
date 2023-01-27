import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CardTitle, DetailsContainer, ModalText } from '../../applicationStyle';
import { answerTypes } from '../../../../helpers/utils';
import { IOtherInformation } from '../../../../types/api/application/applicationForm';

const OtherInformation: React.FC<IOtherInformation> = ({
  otherInformationData
}) => {
  return (
    <DetailsContainer>
      <CardTitle>{otherInformationData.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {otherInformationData?.description}
      </ModalText>
      {otherInformationData?.questions?.map((question) => (
        <Fragment key={question?.id !== undefined ? question.id : uuidv4()}>
          <ModalText style={{ margin: '1rem 0 0.3rem' }}>
            {question?.title}
          </ModalText>
          <>{answerTypes(question?.answerType, question)}</>
        </Fragment>
      ))}
    </DetailsContainer>
  );
};

export default OtherInformation;
